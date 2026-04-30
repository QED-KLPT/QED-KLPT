import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { YoutubePlayerModule } from '../shared/youtube-player/youtube-player.module';
import { KlptVideoContentService, PageVideoColumn } from '../../services/klpt-video-content.service';

@Component({
  selector: 'app-language-and-literacy',
  imports: [CommonModule, RouterLink, YoutubePlayerModule],
  templateUrl: './language-and-literacy.html',
  styleUrl: './language-and-literacy.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageAndLiteracy {
  protected readonly videoColumns$: Observable<PageVideoColumn[]>;

  constructor(private readonly videoContentService: KlptVideoContentService) {
    this.videoColumns$ = this.videoContentService.getPageColumns('language-and-literacy');
  }
}
