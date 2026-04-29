import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { YoutubePlayerModule } from '../shared/youtube-player/youtube-player.module';

@Component({
  selector: 'app-klpt',
  imports: [RouterLink, YoutubePlayerModule],
  templateUrl: './klpt.html',
  styleUrl: './klpt.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Klpt {}
