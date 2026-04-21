import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApplicationRef, Component, DestroyRef, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter, first } from 'rxjs';
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

    this.appRef.isStable
      .pipe(first((isStable) => isStable), takeUntilDestroyed(this.destroyRef))
      .subscribe(async () => {
        try {
          await this.swUpdate.checkForUpdate();
        } catch (error) {
          console.error('Unable to check for site updates.', error);
        }
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
}
