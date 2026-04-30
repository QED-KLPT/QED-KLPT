import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import {
  SwUpdate,
  VersionInstallationFailedEvent,
  VersionReadyEvent,
} from '@angular/service-worker';
import { filter, fromEvent, timer } from 'rxjs';
import { Footer } from './_layout/footer/footer';
import { Header } from './_layout/header/header';

const UPDATE_RECHECK_DELAY_MS = 2 * 60 * 1000;

@Component({
  selector: 'app-root',
  imports: [Footer, Header, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private readonly swUpdate = inject(SwUpdate);
  private readonly destroyRef = inject(DestroyRef);

  protected showUpdateNotice = false;
  protected showUpdateFailureNotice = false;
  protected isRefreshing = false;
  protected updateFailureMessage =
    'An update was detected but could not be installed yet. Please try again in a few minutes.';

  private updateCheckInFlight = false;
  private updateRetryTimer: ReturnType<typeof window.setTimeout> | null = null;

  ngOnInit(): void {
    if (!this.swUpdate.isEnabled) {
      console.info('[SW] Service worker updates are disabled in this build.');
      void this.unregisterExistingServiceWorkers();
      return;
    }

    console.info('[SW] Service worker updates are enabled.');

    this.swUpdate.versionUpdates
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => console.info('[SW] Version event received:', event));

    this.swUpdate.versionUpdates
      .pipe(
        filter((event): event is VersionReadyEvent => event.type === 'VERSION_READY'),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.showUpdateFailureNotice = false;
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
        console.warn('[SW] Version installation failed. Will retry shortly.', event.error);
        this.showUpdateNotice = false;
        this.scheduleUpdateRecheck();
      });

    this.swUpdate.unrecoverable.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
      console.error('[SW] Unrecoverable state reached.', event.reason);
      this.showUpdateNotice = false;
      this.updateFailureMessage =
        'This cached version can no longer be safely loaded. Please refresh to restore the latest site.';
      this.showUpdateFailureNotice = true;
    });

    timer(5_000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => void this.checkForSiteUpdate());

    fromEvent(document, 'visibilitychange')
      .pipe(
        filter(() => document.visibilityState === 'visible'),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => void this.checkForSiteUpdate());
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
      this.showUpdateFailureNotice = false;
      const hasUpdate = await this.swUpdate.checkForUpdate();
      console.info('[SW] checkForUpdate() completed.', { hasUpdate });
    } catch (error) {
      console.warn('[SW] Unable to check for updates. Will retry shortly.', error);
      this.scheduleUpdateRecheck();
    } finally {
      this.updateCheckInFlight = false;
    }
  }

  private scheduleUpdateRecheck(): void {
    if (this.updateRetryTimer) {
      return;
    }

    this.updateRetryTimer = window.setTimeout(() => {
      this.updateRetryTimer = null;
      void this.checkForSiteUpdate();
    }, UPDATE_RECHECK_DELAY_MS);
  }

  private async unregisterExistingServiceWorkers(): Promise<void> {
    if (!('serviceWorker' in navigator)) {
      return;
    }

    const registrations = await navigator.serviceWorker.getRegistrations();
    const baseUrl = new URL(document.baseURI);

    await Promise.all(
      registrations
        .filter((registration) => {
          const scopeUrl = new URL(registration.scope);

          return (
            scopeUrl.origin === baseUrl.origin &&
            (baseUrl.href.startsWith(scopeUrl.href) || scopeUrl.href.startsWith(baseUrl.href))
          );
        })
        .map((registration) => registration.unregister()),
    );

    if ('caches' in window) {
      const cacheNames = await window.caches.keys();
      await Promise.all(
        cacheNames
          .filter((cacheName) => cacheName.startsWith('ngsw:'))
          .map((cacheName) => window.caches.delete(cacheName)),
      );
    }
  }
}
