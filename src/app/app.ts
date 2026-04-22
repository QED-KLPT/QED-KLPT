import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApplicationRef, Component, DestroyRef, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SwUpdate, VersionInstallationFailedEvent, VersionReadyEvent } from '@angular/service-worker';
import { filter, first, fromEvent, merge, timer } from 'rxjs';
import { Footer } from './_layout/footer/footer';
import { Header } from './_layout/header/header';

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
  protected isRefreshing = false;

  constructor() {
    if (!this.swUpdate.isEnabled) {
      return;
    }

    this.swUpdate.versionUpdates
      .pipe(
        filter((event): event is VersionReadyEvent => event.type === 'VERSION_READY'),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
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
        console.error('Site update installation failed.', event.error);
      });

    merge(
      this.appRef.isStable.pipe(first((isStable) => isStable)),
      timer(30_000),
    )
      .pipe(first(), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        void this.checkForSiteUpdate();
      });

    fromEvent(document, 'visibilitychange')
      .pipe(
        filter(() => document.visibilityState === 'visible'),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        void this.checkForSiteUpdate();
      });
  }

  protected dismissUpdateNotice(): void {
    this.showUpdateNotice = false;
  }

  protected async refreshForUpdate(): Promise<void> {
    if (this.isRefreshing) {
      return;
    }

    this.isRefreshing = true;

    try {
      await this.swUpdate.activateUpdate();
      document.location.reload();
    } catch (error) {
      console.error('Unable to activate site update.', error);
      this.isRefreshing = false;
    }
  }

  private async checkForSiteUpdate(): Promise<void> {
    try {
      await this.swUpdate.checkForUpdate();
    } catch (error) {
      console.error('Unable to check for site updates.', error);
    }
  }
}
