import { ChangeDetectionStrategy, Component } from '@angular/core';
import { YoutubePlayerModule } from '../shared/youtube-player/youtube-player.module';

@Component({
  selector: 'app-quality-observations',
  imports: [YoutubePlayerModule],
  templateUrl: './quality-observations.html',
  styleUrl: './quality-observations.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QualityObservations {}
