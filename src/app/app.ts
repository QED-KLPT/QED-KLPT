import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApplicationRef, Component, DestroyRef, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SwUpdate, VersionInstallationFailedEvent, VersionReadyEvent } from '@angular/service-worker';
import { filter, first, fromEvent, merge, timer } from 'rxjs';
import { Footer } from './_layout/footer/footer';
import { Header } from './_layout/header/header';

const DEPLOYMENT_SIGNATURE_KEY = 'qedKlptDeploymentSignature';
const HASH_MISMATCH_RECHECK_DELAY_MS = 2 * 60 * 1000;

type AngularServiceWorkerManifest = {
  timestamp?: number;
  assetGroups?: Array<{
    name?: string;
    urls?: string[];
  }>;
  hashTable?: Record<string, string>;
};

@Component({
  selector: 'app-root',
  imports: [Footer, Header, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly appRef = inject(ApplicationRef);
  private readonly swUpdate = inject(SwUpdate);
  private readonly destroyRef = inject(DestroyRef);

  protected showUpdateNotice = false;
  protected showUpdateFailureNotice = false;
  protected isRefreshing = false;
  protected updateFailureMessage =
    'An update was detected, but the hosting service returned mixed files. Please wait a few minutes and try again.';

  private lastPromptedVersionHash: string | null = null;
  private pendingDeploymentSignature: string | null = null;
  private updateCheckInFlight = false;
  private updateRetryTimer: ReturnType<typeof window.setTimeout> | null = null;

  constructor() {
    console.info('[SW] App bootstrapped.');

    if (!this.swUpdate.isEnabled) {
      console.info('[SW] Service worker updates are disabled in this build.');
      return;
    }

    console.info('[SW] Service worker updates are enabled.');

    this.swUpdate.versionUpdates
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        console.info('[SW] Version event received:', event);
      });

    this.swUpdate.versionUpdates
      .pipe(
        filter((event): event is VersionReadyEvent => event.type === 'VERSION_READY'),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((event) => {
        if (this.lastPromptedVersionHash === event.latestVersion.hash) {
          return;
        }

        this.lastPromptedVersionHash = event.latestVersion.hash;
        this.rememberPendingDeploymentSignature();
        console.info('[SW] New version is ready. Showing update notice.');
        this.showUpdateNotice = true;
      });

    this.swUpdate.versionUpdates
      .pipe(
        filter(
          (event): event is VersionInstallationFailedEvent =>
            event.type === 'VERSION_INSTALLATION_FAILED',
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((event) => {
        this.showUpdateNotice = false;

        if (this.isLikelyDeploymentPropagationError(event.error)) {
          console.warn('Site update is not fully available yet. Will retry shortly.', event.error);
          this.scheduleUpdateRecheck();
          return;
        }

        console.error('Site update installation failed.', event.error);
        this.showUpdateFailureNotice = true;
      });

    this.swUpdate.unrecoverable.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
      console.error('Site update reached an unrecoverable state.', event.reason);
      this.showUpdateNotice = false;
      this.updateFailureMessage =
        'This cached version can no longer be safely loaded. Please refresh to restore the latest site.';
      this.showUpdateFailureNotice = true;
    });

    merge(
      this.appRef.isStable.pipe(first((isStable) => isStable)),
      timer(30_000),
    )
      .pipe(first(), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        console.info('[SW] Initial update check trigger fired.');
        void this.checkForSiteUpdate();
      });

    fromEvent(document, 'visibilitychange')
      .pipe(
        filter(() => document.visibilityState === 'visible'),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        console.info('[SW] Document became visible. Re-checking for updates.');
        void this.checkForSiteUpdate();
      });
  }

  protected dismissUpdateNotice(): void {
    this.showUpdateNotice = false;
  }

  protected dismissUpdateFailureNotice(): void {
    this.showUpdateFailureNotice = false;
  }

  protected async refreshForUpdate(): Promise<void> {
    if (this.isRefreshing) {
      return;
    }

    this.isRefreshing = true;

    document.location.reload();
  }

  private async checkForSiteUpdate(): Promise<void> {
    if (this.updateCheckInFlight || this.showUpdateNotice || this.isRefreshing) {
      return;
    }

    this.updateCheckInFlight = true;

    try {
      const remoteSignature = await this.readRemoteDeploymentSignature();

      if (!this.hasDeploymentSignatureChanged(remoteSignature)) {
        console.info('[SW] Remote deployment signature is unchanged. Skipping Angular update check.');
        return;
      }

      this.pendingDeploymentSignature = remoteSignature;
      console.info('[SW] Checking for update...');
      this.showUpdateFailureNotice = false;
      const hasUpdate = await this.swUpdate.checkForUpdate();
      console.info('[SW] checkForUpdate() completed.', { hasUpdate });

      if (!hasUpdate) {
        this.rememberDeploymentSignature(remoteSignature);
      }
    } catch (error) {
      if (error instanceof Error && this.isLikelyDeploymentPropagationError(error.message)) {
        console.warn('Site update is still propagating. Will retry shortly.', error.message);
        this.scheduleUpdateRecheck();
      } else {
        console.error('Unable to check for site updates.', error);
      }
    } finally {
      this.updateCheckInFlight = false;
    }
  }

  private async readRemoteDeploymentSignature(): Promise<string> {
    const manifestUrl = new URL('ngsw.json', document.baseURI);
    manifestUrl.searchParams.set('update-check', Date.now().toString());

    const manifestResponse = await fetch(manifestUrl, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache',
      },
    });

    if (!manifestResponse.ok) {
      throw new Error(`Unable to read service worker manifest: ${manifestResponse.status}`);
    }

    const manifest = (await manifestResponse.json()) as AngularServiceWorkerManifest;
    const appGroup = manifest.assetGroups?.find((group) => group.name === 'app');
    const appUrls = appGroup?.urls ?? [];
    const appResourceSignatures = await Promise.all(
      appUrls.map((appUrl) => this.readVerifiedResourceSignature(appUrl, manifest.hashTable?.[appUrl])),
    );

    return [
      manifest.timestamp ?? 'unknown-timestamp',
      ...appResourceSignatures,
    ].join('::');
  }

  private async readVerifiedResourceSignature(appUrl: string, manifestHash = ''): Promise<string> {
    const resourceUrl = new URL(appUrl, window.location.origin);
    resourceUrl.searchParams.set('update-check', Date.now().toString());
    resourceUrl.searchParams.set('ngsw-bypass', 'true');

    const response = await fetch(resourceUrl, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache',
        'ngsw-bypass': 'true',
      },
    });

    if (!response.ok) {
      throw new Error(`Unable to verify ${appUrl}: ${response.status}`);
    }

    const contentHash = await this.sha1Hex(await response.arrayBuffer());

    if (manifestHash && contentHash !== manifestHash) {
      throw new Error(
        `Deployment is still propagating: ${appUrl} has hash ${contentHash}, expected ${manifestHash}`,
      );
    }

    const etag = response.headers.get('etag') ?? '';
    const modified = response.headers.get('last-modified') ?? '';
    const length = response.headers.get('content-length') ?? '';

    return `${appUrl}|${contentHash}|${etag}|${modified}|${length}`;
  }

  private async sha1Hex(content: ArrayBuffer): Promise<string> {
    const digest = await window.crypto.subtle.digest('SHA-1', content);

    return Array.from(new Uint8Array(digest))
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');
  }

  private hasDeploymentSignatureChanged(remoteSignature: string): boolean {
    const previousSignature = window.localStorage.getItem(DEPLOYMENT_SIGNATURE_KEY);

    if (!previousSignature) {
      this.rememberDeploymentSignature(remoteSignature);
      return false;
    }

    return previousSignature !== remoteSignature;
  }

  private rememberDeploymentSignature(remoteSignature: string): void {
    window.localStorage.setItem(DEPLOYMENT_SIGNATURE_KEY, remoteSignature);
  }

  private rememberPendingDeploymentSignature(): void {
    if (!this.pendingDeploymentSignature) {
      return;
    }

    this.rememberDeploymentSignature(this.pendingDeploymentSignature);
    this.pendingDeploymentSignature = null;
  }

  private isLikelyDeploymentPropagationError(error: string): boolean {
    return error.includes('Hash mismatch') || error.includes('Deployment is still propagating');
  }

  private scheduleUpdateRecheck(): void {
    if (this.updateRetryTimer) {
      return;
    }

    this.updateRetryTimer = window.setTimeout(() => {
      this.updateRetryTimer = null;
      void this.checkForSiteUpdate();
    }, HASH_MISMATCH_RECHECK_DELAY_MS);
  }
}
