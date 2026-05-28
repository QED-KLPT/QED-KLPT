import { ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AccordionItemComponent } from '../shared/accordion-item/accordion-item.component';
import { YoutubePlayerModule } from '../shared/youtube-player/youtube-player.module';
import { joinWrappedLines } from '../../shared/helpers/join-wrapped-lines';
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

@Component({
  selector: 'app-physicality',
  imports: [RouterLink, AccordionItemComponent, YoutubePlayerModule],
  templateUrl: './physicality.html',
  styleUrl: './physicality.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Physicality implements OnInit {
  protected readonly domainAssets = inject(DomainAssetModeService);

  constructor(private scroll: ViewportScroller) {}

  ngOnInit(): void {
    this.scroll.scrollToPosition([0, 0]);
  }

  protected readonly physicalityTranscript: string[] = joinWrappedLines([
    '- Physicality can be categorised into gross motor and fine motor skills. Gross motor skills are',
    'big, whole body movements, like running and jumping, and fine motor skills, which',
    'involve precise finger, hand, wrist, and arm control, such as using scissors,',
    'pencils, or eating utensils. Encouraging risk taking and play that involves climbing,',
    'crawling, jumping and balancing, can support the development',
    'of gross motor skills. Obstacle courses are a great example of how to help children',
    'build coordination, strength, and control. Demonstrating gross motor skills can help children build confidence.',
    'Providing a variety of',
    'experiences and games for children to choose from, recognises and supports children\'s agency.',
    'Engaging in physical learning',
    'experiences helps promote overall physical health and wellbeing.',
    'It allows children to develop and strengthen muscles and bones.',
    'It is essential for cognitive development. Physical activity stimulates the brain and enhances children to build confidence and develop persistence.',
    "Teachers and educators",
    "can support children in their development by providing positive, specific",
    'feedback, and encouragement. Fine motor skills are',
    "essential for everyday tasks, such as drawing, writing,",
    'tying shoe laces, buttoning clothes, and feeding oneself.',
    "These skills contribute to children becoming more",
    'independent and self-sufficient. Fine motor skills contribute',
    "to hand-eye coordination, spatial awareness, and",
    'visual motor integration.',
    "The intricate movements involved",
    "in fine motor skill tasks, such as puzzles, building",
    'blocks, and manipulating objects, help strengthen neural',
    'connections in the brain and contribute to',
    'successful problem solving, critical thinking, and',
    'spatial reasoning abilities. Fine motor skills can also',
    "support artistic expression, providing opportunities that",
    'encourage the refinement and practice of these skills',
    'support overall development.',
  ]);

  protected readonly practiceSupports: { title: string; summary: string; accordionItems: { title: string; body: string[] }[]; pdfLabel: string; pdfPath: string } = {
    title: 'Physicality',
    summary: 'Practice supports in physicality can help educators strengthen coordination, confidence, sensory regulation, and participation across indoor and outdoor experiences.',    
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
    pdfLabel: 'Download physicality practice supports (PDF, 1.3MB)',
    pdfPath: 'assets/content/pdfs/qklg-principle-rdiv-poster.pdf',
  };

  protected readonly cards: DesignCard[] = [
    {
      title: 'Aenean Imperdiet',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      url: '/learning-domains/physicality/stable-movement',
      background: 'linear-gradient(135deg, #247F33 0%, #185922 100%)',
      hoverBorderColor: '#1D682A',
      imageAlt: 'Child standing on one foot for balance',
      imageSrc: 'assets/img/physicality-stable-movement.svg',
    },
    {
      title: 'Praesent Elementum',
      description:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam.',
      url: '/learning-domains/physicality/environment-awareness',
      background: 'linear-gradient(135deg, #247F33 0%, #185922 100%)',
      hoverBorderColor: '#1D682A',
      imageAlt: 'Child looking around curiously',
      imageSrc: 'assets/img/physicality-environment-awareness.svg',
    },
    {
      title: 'Egestas Dui',
      description:
        'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores eos.',
      url: '/learning-domains/physicality/object-control',
      background: 'linear-gradient(135deg, #247F33 0%, #185922 100%)',
      hoverBorderColor: '#1D682A',
      imageAlt: 'Child hitting a ball with a bat',
      imageSrc: 'assets/img/physicality-object-control.svg',
    },
    {
      title: 'Fusce Vestibulum',
      description:
        'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum delenit atque corrupti.',
      url: '/learning-domains/physicality/gross-motor',
      background: 'linear-gradient(135deg, #247F33 0%, #185922 100%)',
      hoverBorderColor: '#1D682A',
      imageAlt: 'Child jumping with arms raised',
      imageSrc: 'assets/img/physicality-gross-motor.svg',
    },
    {
      title: 'Curabitur Pulletin',
      description:
        'Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere.',
      url: '/learning-domains/physicality/fine-motor',
      background: 'linear-gradient(135deg, #247F33 0%, #185922 100%)',
      hoverBorderColor: '#1D682A',
      imageAlt: 'Child holding crayons to draw',
      imageSrc: 'assets/img/physicality-fine-motor.svg',
    },
    {
      title: 'Tempor Identique',
      description:
        'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur vel illum.',
      url: '/learning-domains/physicality/sensory-learning',
      background: 'linear-gradient(135deg, #247F33 0%, #185922 100%)',
      hoverBorderColor: '#1D682A',
      imageAlt: 'Child touching different textured shapes',
      imageSrc: 'assets/img/physicality-sensory-learning.svg',
    },
  ];
}
