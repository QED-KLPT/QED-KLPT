import { ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AccordionItemComponent } from '../shared/accordion-item/accordion-item.component';
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
  selector: 'app-physicality',
  imports: [RouterLink, AccordionItemComponent, YoutubePlayerModule],
  templateUrl: './physicality.html',
  styleUrl: './physicality.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Physicality implements OnInit {
  constructor(private scroll: ViewportScroller) {}

  ngOnInit(): void {
    this.scroll.scrollToPosition([0, 0]);
  }

  protected readonly practiceSupports: { title: string; summary: string; reflection: string[]; accordionItems: { title: string; body: string[] }[]; pdfLabel: string; pdfPath: string } = {
    title: 'Physicality',
    summary: 'Practice supports in physicality can help educators strengthen coordination, confidence, sensory regulation, and participation across indoor and outdoor experiences.',
    reflection: [
      'Think about how the environment, materials, and routines either support or limit the child\'s movement and participation.',
    ],
    accordionItems: [
      {
        title: 'Intentional teaching strategies',
        body: [
          'Model safe movement, provide graduated levels of challenge, and give children time to practise skills repeatedly in playful contexts.',
          'Use verbal cues, demonstrations, and physical set-ups that help children understand how to organise their bodies and actions.',
        ],
      },
      {
        title: 'Learning experiences',
        body: [
          'Plan obstacle courses, fine-motor stations, sensory exploration, and outdoor play experiences that support strength, coordination, and body awareness.',
          'Offer tools and materials that can be adapted to suit different confidence levels and developmental needs.',
        ],
      },
    ],
    pdfLabel: 'Download physicality practice supports (PDF)',
    pdfPath: 'assets/content/pdfs/qklg_principle_res_diverse_poster.pdf',
  };

  protected readonly cards: DesignCard[] = [
    {
      title: 'Aenean Imperdiet',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      url: '/learning-domains/physicality/stable-movement',
      background: 'linear-gradient(180deg, #effdea 0%, #afe57f 100%)',
      hoverBorderColor: '#94d2bd',
      imageAlt: 'Child standing on one foot for balance',
      imageSrc: 'assets/img/physicality-stable-movement.svg',
    },
    {
      title: 'Praesent Elementum',
      description:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam.',
      url: '/learning-domains/physicality/environment-awareness',
      background: 'linear-gradient(180deg, #e9fdf8 0%, #8ee7d4 100%)',
      hoverBorderColor: '#6ee7b7',
      imageAlt: 'Child looking around curiously',
      imageSrc: 'assets/img/physicality-environment-awareness.svg',
    },
    {
      title: 'Egestas Dui',
      description:
        'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores eos.',
      url: '/learning-domains/physicality/object-control',
      background: 'linear-gradient(180deg, #fff1df 0%, #ffc57f 100%)',
      hoverBorderColor: '#fca5a5',
      imageAlt: 'Child hitting a ball with a bat',
      imageSrc: 'assets/img/physicality-object-control.svg',
    },
    {
      title: 'Fusce Vestibulum',
      description:
        'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum delenit atque corrupti.',
      url: '/learning-domains/physicality/gross-motor',
      background: 'linear-gradient(180deg, #f2fde9 0%, #bfe68f 100%)',
      hoverBorderColor: '#b7d894',
      imageAlt: 'Child jumping with arms raised',
      imageSrc: 'assets/img/physicality-gross-motor.svg',
    },
    {
      title: 'Curabitur Pulletin',
      description:
        'Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere.',
      url: '/learning-domains/physicality/fine-motor',
      background: 'linear-gradient(180deg, #f2ecff 0%, #cdbcff 100%)',
      hoverBorderColor: '#c4b5fd',
      imageAlt: 'Child holding crayons to draw',
      imageSrc: 'assets/img/physicality-fine-motor.svg',
    },
    {
      title: 'Tempor Identique',
      description:
        'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur vel illum.',
      url: '/learning-domains/physicality/sensory-learning',
      background: 'linear-gradient(180deg, #fff0f0 0%, #ffb8b8 100%)',
      hoverBorderColor: '#fbbf94',
      imageAlt: 'Child touching different textured shapes',
      imageSrc: 'assets/img/physicality-sensory-learning.svg',
    },
  ];
}
