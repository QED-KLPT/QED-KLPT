import { ViewportScroller } from '@angular/common';
import { Component, OnInit, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { AccordionItemComponent } from '../shared/accordion-item/accordion-item.component';
import { DomainCard } from '../shared/domain-card/domain-card';
import { YoutubePlayerModule } from '../shared/youtube-player/youtube-player.module';
import { DomainAssetModeService } from '../../services/domain-asset-mode.service';

type DesignCard = {
  title: string;
  description: string;
  url: string;
  imageAlt: string;
  background: string;
  hoverBorderColor: string;
  imageSrc: string;
};

type ThemedDesignCard = DesignCard & {
  textColor: string;
};

const DARK_BLUE_CARD_BACKGROUND = '#003e96';

@Component({
  selector: 'app-executive-function',
  imports: [DomainCard, RouterLink, AccordionItemComponent, YoutubePlayerModule],
  templateUrl: './executive-function.html',
  styleUrl: './executive-function.scss',
})
export class ExecutiveFunction implements OnInit {
  protected readonly domainAssets = inject(DomainAssetModeService);
  
  executiveFunctionTranscript: string = '';

  protected readonly themedCards = computed<ThemedDesignCard[]>(() => {
    const isDarkBlue = this.domainAssets.mode() === 'dark-blue';

    return this.cards.map((card) => ({
      ...card,
      background: isDarkBlue ? DARK_BLUE_CARD_BACKGROUND : card.background,
      hoverBorderColor: isDarkBlue ? DARK_BLUE_CARD_BACKGROUND : card.hoverBorderColor,
      textColor: isDarkBlue ? '#ffffff' : '',
    }));
  });

  constructor(
    private scroll: ViewportScroller,
    private http: HttpClient,
  ) {
    this.http.get('assets/content/transcripts/executive-function/executive-function.txt', { responseType: 'text' }).subscribe(t => this.executiveFunctionTranscript = t);
  }

  ngOnInit(): void {
    this.scroll.scrollToPosition([0, 0]);
  }

  protected readonly practiceSupports: { title: string; summary: string; accordionItems: { title: string; body: string[] }[]; pdfLabel: string; pdfPath: string } = {
    title: 'Executive function',
    summary: 'These supports focus on helping children build attention, working memory, self-regulation, and flexible thinking through predictable routines and intentional scaffolding.',   
    accordionItems: [
      {
        title: 'Intentional teaching strategies',
        body: [
          'Break tasks into manageable steps, use visual schedules, and narrate strategies that help children remember, pause, and persist.',
          'Provide co-regulation through warm, consistent responses and clear expectations during transitions and group experiences.',
        ],
      },
      {
        title: 'Learning experiences',
        body: [
          'Plan games that involve turn taking, remembering instructions, sorting, patterning, and adapting to small rule changes.',
          'Use routines such as pack-up time, shared projects, and collaborative problem solving as opportunities to practise planning and flexibility.',
        ],
      },
    ],
    pdfLabel: 'Download executive function practice supports (PDF, 1.7MB)',
    pdfPath: 'assets/content/pdfs/KLPT-Exec-PracSupp-V4.pdf',
  };

  private readonly cards: DesignCard[] = [
    {
      title: 'Persistence',
      description:
        'Staying on task, trying again after challenges and completing activities',
      url: '',
      background: 'linear-gradient(135deg, #0069AB 0%, #004A78 100%)',
      hoverBorderColor: '#005387',
      imageAlt: 'Persistence',
      imageSrc: 'assets/img/exec-func-inhibitctrl.svg',
    },
    {
      title: 'Adaptability',
      description:
        'Adjusting when routies change, responding to new information and staying calm under uncertainty',
      url: '',
      background: 'linear-gradient(135deg, #0069AB 0%, #004A78 100%)',
      hoverBorderColor: '#005387',
      imageAlt: 'Adaptability',
      imageSrc: 'assets/img/exec-func-workmem.svg',
    },
    {
      title: 'Problem solving',
      description:
        'Exploring ideas, testing strategies and reflecting on what works',
      url: '',
      background: 'linear-gradient(135deg, #0069AB 0%, #004A78 100%)',
      hoverBorderColor: '#005387',
      imageAlt: 'Problem solving',
      imageSrc: 'assets/img/exec-func-cogflex.svg',
    },
  ];
}
