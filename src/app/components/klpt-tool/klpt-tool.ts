import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { YoutubePlayerModule } from '../shared/youtube-player/youtube-player.module';

@Component({
  selector: 'app-klpt-tool',
  imports: [RouterLink, YoutubePlayerModule],
  templateUrl: './klpt-tool.html',
  styleUrl: './klpt-tool.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KlptTool {}
