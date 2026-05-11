import { CommonModule, ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
export class LanguageAndLiteracy implements OnInit {
  protected readonly videoColumns$: Observable<PageVideoColumn[]>;

  constructor(private scroll: ViewportScroller, private readonly videoContentService: KlptVideoContentService) {
    this.videoColumns$ = this.videoContentService.getPageColumns('language-and-literacy');
  }

  ngOnInit(): void {
    this.scroll.scrollToPosition([0, 0]);
  }

    protected readonly cards: DesignCard[] = [
    {
      title: 'Sounds and speech',
      description:
        'how children build and organise language and how they show awareness of sounds in words',
      url: '',
      background: 'linear-gradient(180deg, #fbfff6 0%, #d9f7be 100%)',
      hoverBorderColor: '#94d2bd',
      imageAlt: 'Sounds and speech',
      imageSrc: 'assets/img/language-and-literacy-sounds-speech.svg',
    },  
    {
      title: 'Comprehension',
      description:
        'how children show they understand and create meaning',
      url: '',
      background: 'linear-gradient(180deg, #f7fff9 0%, #ccfbf1 100%)',
      hoverBorderColor: '#6ee7b7',
      imageAlt: 'Comprehension',
      imageSrc: 'assets/img/language-and-literacy-comprehension.svg',
    }
  ];
}
