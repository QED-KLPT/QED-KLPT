import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { VideoAccessService } from '../../services/video-access.service';
import { VidPlayerModule } from '../shared/vid-player/vid-player.module';

@Component({
  selector: 'app-testing',
  imports: [RouterLink, VidPlayerModule],
  templateUrl: './testing.html',
  styleUrl: './testing.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Testing {
  protected readonly showTestVideo = signal(true);
  protected readonly videoAccessCleared = signal(false);

  private readonly videoAccess = inject(VideoAccessService);

  protected clearVideoAccess(): void {
    this.videoAccess.clearAccessToken();
    this.showTestVideo.set(false);
    this.videoAccessCleared.set(true);

    setTimeout(() => this.showTestVideo.set(true));
  }
}
