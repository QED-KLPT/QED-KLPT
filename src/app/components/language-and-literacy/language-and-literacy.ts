import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { YoutubePlayerModule } from '../shared/youtube-player/youtube-player.module';
import { KlptVideoContentService, PageVideoColumn } from '../../services/klpt-video-content.service';
import { DomainCard } from '../shared/domain-card/domain-card';

type DesignCard = {
  title: string;
  description: string;
  url: string;
  imageAlt: string;
  background: string;
  hoverBorderColor: string;
  imageSrc: string;
};

@Component({
  selector: 'app-language-and-literacy',
  imports: [DomainCard, CommonModule, RouterLink, YoutubePlayerModule],
  templateUrl: './language-and-literacy.html',
  styleUrl: './language-and-literacy.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageAndLiteracy {
  protected readonly videoColumns$: Observable<PageVideoColumn[]>;

  constructor(private readonly videoContentService: KlptVideoContentService) {
    this.videoColumns$ = this.videoContentService.getPageColumns('language-and-literacy');
  }

    protected readonly cards: DesignCard[] = [
    {
      title: 'Sounds and speech',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      url: '',
      background: 'linear-gradient(180deg, #fbfff6 0%, #d9f7be 100%)',
      hoverBorderColor: '#94d2bd',
      imageAlt: 'Sounds and speech',
      imageSrc: 'assets/img/language-and-literacy-sounds-speech.svg',
    },
    {
      title: 'Comprehension',
      description:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam.',
      url: '',
      background: 'linear-gradient(180deg, #f7fff9 0%, #ccfbf1 100%)',
      hoverBorderColor: '#6ee7b7',
      imageAlt: 'Comprehension',
      imageSrc: 'assets/img/language-and-literacy-comprehension.svg',
    }
  ];
}
