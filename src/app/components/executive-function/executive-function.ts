import { ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AccordionItemComponent } from '../shared/accordion-item/accordion-item.component';
import { DomainCard } from '../shared/domain-card/domain-card';
import { YoutubePlayerModule } from '../shared/youtube-player/youtube-player.module';

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
  selector: 'app-executive-function',
  imports: [DomainCard, RouterLink, AccordionItemComponent, YoutubePlayerModule],
  templateUrl: './executive-function.html',
  styleUrl: './executive-function.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExecutiveFunction implements OnInit {
  constructor(private scroll: ViewportScroller) {}

  ngOnInit(): void {
    this.scroll.scrollToPosition([0, 0]);
  }

  protected readonly practiceSupports: { title: string; summary: string; reflection: string[]; accordionItems: { title: string; body: string[] }[]; pdfLabel: string; pdfPath: string } = {
    title: 'Executive function',
    summary: 'These supports focus on helping children build attention, working memory, self-regulation, and flexible thinking through predictable routines and intentional scaffolding.',
    reflection: [
      'Think about when the child is most regulated and ready to learn, and what environmental cues or adult supports help that happen.',
    ],
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
    pdfLabel: 'Download executive function practice supports (PDF)',
    pdfPath: 'assets/content/pdfs/qklg_principle_sustain_poster.pdf',
  };

  protected readonly cards: DesignCard[] = [
    {
      title: 'Persistence',
      description:
        'Staying on task, trying again after challenges and completing activities',
      url: '',
      background: 'linear-gradient(135deg, #0077C1 0%, #005387 100%)',
      hoverBorderColor: '#005387',
      imageAlt: 'Persistence',
      imageSrc: 'assets/img/executive-function-inhibitory-control.svg',
    },
    {
      title: 'Adaptability',
      description:
        'Adjusting when routies change, responding to new information and staying calm under uncertainty',
      url: '',
      background: 'linear-gradient(135deg, #0077C1 0%, #005387 100%)',
      hoverBorderColor: '#005387',
      imageAlt: 'Adaptability',
      imageSrc: 'assets/img/executive-function-working-memory.svg',
    },
    {
      title: 'Problem solving',
      description:
        'Exploring ideas, testing strategies and reflecting on what works',
      url: '',
      background: 'linear-gradient(135deg, #0077C1 0%, #005387 100%)',
      hoverBorderColor: '#005387',
      imageAlt: 'Problem solving',
      imageSrc: 'assets/img/executive-function-cognitive-flexibility.svg',
    },
  ];
}
