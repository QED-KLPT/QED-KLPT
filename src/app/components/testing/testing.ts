import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge, timer } from 'rxjs';

import { VideoAccessService } from '../../services/video-access.service';
import { PlyrPlayerModule } from '../shared/plyr-player/public-api';
import { VidPlayerModule } from '../shared/vid-player/vid-player.module';

@Component({
  selector: 'app-testing',
  imports: [PlyrPlayerModule, VidPlayerModule],
  templateUrl: './testing.html',
  styleUrl: './testing.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Testing {
  protected readonly showTestVideo = signal(true);
  protected readonly videoAccessCleared = signal(false);
  protected readonly accessTimeRemaining = signal('');

  private readonly videoAccess = inject(VideoAccessService);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    merge(timer(0, 1_000), this.videoAccess.accessGranted$)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.updateAccessCountdown());
  }

  protected clearVideoAccess(): void {
    this.videoAccess.clearAccessToken();
    this.showTestVideo.set(false);
    this.videoAccessCleared.set(true);
    this.accessTimeRemaining.set('');

    setTimeout(() => this.showTestVideo.set(true));
  }

  private updateAccessCountdown(): void {
    const expiresAt = this.videoAccess.getAccessTokenExpiresAt();
    if (expiresAt === null) {
      this.accessTimeRemaining.set('');
      return;
    }

    const remainingSeconds = Math.max(
      0,
      Math.ceil((expiresAt - Date.now()) / 1_000),
    );

    this.videoAccessCleared.set(false);
    this.accessTimeRemaining.set(this.formatTimeRemaining(remainingSeconds));
  }

  private formatTimeRemaining(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 3_600);
    const minutes = Math.floor((totalSeconds % 3_600) / 60);
    const seconds = totalSeconds % 60;
    const paddedMinutes = minutes.toString().padStart(2, '0');
    const paddedSeconds = seconds.toString().padStart(2, '0');

    return hours > 0
      ? `${hours}:${paddedMinutes}:${paddedSeconds}`
      : `${paddedMinutes}:${paddedSeconds}`;
  }
}
