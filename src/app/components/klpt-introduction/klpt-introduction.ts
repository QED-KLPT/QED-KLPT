import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { YoutubePlayerModule } from '../shared/youtube-player/youtube-player.module';

@Component({
  selector: 'app-klpt-introduction',
  imports: [RouterLink, YoutubePlayerModule],
  templateUrl: './klpt-introduction.html',
  styleUrl: './klpt-introduction.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KlptIntroduction {}
