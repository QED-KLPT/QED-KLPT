import { ChangeDetectionStrategy, Component } from '@angular/core';
import { YoutubePlayerModule } from '../shared/youtube-player/youtube-player.module';

@Component({
  selector: 'app-language-and-literacy',
  imports: [YoutubePlayerModule],
  templateUrl: './language-and-literacy.html',
  styleUrl: './language-and-literacy.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageAndLiteracy {}
