import { CommonModule, ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { YoutubePlayerModule } from '../shared/youtube-player/youtube-player.module';
import { AccordionItemComponent } from '../shared/accordion-item/accordion-item.component';
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
  imports: [DomainCard, CommonModule, RouterLink, AccordionItemComponent, YoutubePlayerModule],
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

    protected readonly practiceSupports: { title: string; summary: string; reflection: string[]; accordionItems: { title: string; body: string[] }[]; pdfLabel: string; pdfPath: string } = {
    title: 'Language and literacy',
    summary: 'Practice supports for language and literacy can help teams strengthen communication-rich environments, shared reading routines, and responsive interactions that invite children to experiment with speaking, listening, reading, and mark making.',
    reflection: [
      'Consider what the child is communicating already and how those strengths can be extended through everyday interactions.',
    ],
    accordionItems: [
      {
        title: 'Intentional teaching strategies',
        body: [
          'Model rich oral language, extend children\'s ideas during conversations, and use repeated story experiences to build comprehension and vocabulary.',
          'Offer visual supports, songs, predictable routines, and opportunities for children to revisit new words in meaningful contexts.',
        ],
      },
      {
        title: 'Learning experiences',
        body: [
          'Create inviting spaces for storytelling, role play, book browsing, drawing, and shared writing so children can explore language in different ways.',
          'Plan playful experiences that connect language to movement, music, dramatic play, and children\'s interests.',
        ],
      },
    ],
    pdfLabel: 'Download language and literacy practice supports (PDF)',
    pdfPath: 'assets/content/pdfs/qklg_principle_effect_ped_poster.pdf',
  };

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
