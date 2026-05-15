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
  selector: 'app-mathematics-and-numeracy',
  imports: [RouterLink, AccordionItemComponent, YoutubePlayerModule],
  templateUrl: './mathematics-and-numeracy.html',
  styleUrl: './mathematics-and-numeracy.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MathematicsAndNumeracy implements OnInit {
  constructor(private scroll: ViewportScroller) {}

  ngOnInit(): void {
    this.scroll.scrollToPosition([0, 0]);
  }

  protected readonly practiceSupports: { title: string; summary: string; reflection: string[]; accordionItems: { title: string; body: string[] }[]; pdfLabel: string; pdfPath: string } = {
    title: 'Mathematics and numeracy',
    summary: 'These supports invite children to explore number, pattern, measurement, spatial reasoning, and problem solving through purposeful play and everyday routines.',
    reflection: [
      'Look for the mathematical thinking already present in the child\'s play, language, and decision making.',
    ],
    accordionItems: [
      {
        title: 'Intentional teaching strategies',
        body: [
          'Use mathematical language naturally during play, model curiosity, and pose questions that encourage children to compare, estimate, count, and explain their thinking.',
          'Link mathematics to meaningful contexts such as cooking, construction, collecting, sorting, and movement.',
        ],
      },
      {
        title: 'Learning experiences',
        body: [
          'Create opportunities for building, pattern making, measuring, ordering, mapping, and representing quantities with real materials.',
          'Revisit key concepts across routines and play so children can notice relationships and apply ideas in new settings.',
        ],
      },
    ],
    pdfLabel: 'Download mathematics and numeracy practice supports (PDF)',
    pdfPath: 'assets/content/pdfs/qklg_principle_collab_part_poster.pdf',
  };

  protected readonly cards: DesignCard[] = [
    {
      title: 'Lorem Ipsum Dolor',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      url: '/learning-domains/mathematics-and-numeracy/numbers',
      background: 'linear-gradient(180deg, #effdea 0%, #afe57f 100%)',
      hoverBorderColor: '#94d2bd',
      imageAlt: 'Numbers icon - counting numerals 1, 2, and 3',
      imageSrc: 'assets/img/mathematics-numeracy-numbers.svg',
    },
    {
      title: 'Ut enim Adipiscing',
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor.',
      url: '/learning-domains/mathematics-and-numeracy/quantity',
      background: 'linear-gradient(180deg, #e9fdf8 0%, #8ee7d4 100%)',
      hoverBorderColor: '#6ee7b7',
      imageAlt: 'Quantity icon - grouping and comparing collections of objects',
      imageSrc: 'assets/img/mathematics-numeracy-quantity.svg',
    },
    {
      title: 'Dui Sagittis Vestibulum',
      description:
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur Excepteur sint occaecat cupidatat.',
      url: '/learning-domains/mathematics-and-numeracy/concepts-of-time',
      background: 'linear-gradient(180deg, #fff1df 0%, #ffc57f 100%)',
      hoverBorderColor: '#fca5a5',
      imageAlt: 'Concepts of Time icon - clock showing time sequence',
      imageSrc: 'assets/img/mathematics-numeracy-concepts-of-time.svg',
    },
    {
      title: 'Proident Simulant',
      description:
        'Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum Sed ut perspiciatis unde.',
      url: '/learning-domains/mathematics-and-numeracy/length',
      background: 'linear-gradient(180deg, #f2fde9 0%, #bfe68f 100%)',
      hoverBorderColor: '#b7d894',
      imageAlt: 'Length icon - measuring objects with standard units',
      imageSrc: 'assets/img/mathematics-numeracy-length.svg',
    },
    {
      title: 'Nemo Enim Ipsam',
      description:
        'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
      url: '/learning-domains/mathematics-and-numeracy/distance',
      background: 'linear-gradient(180deg, #f2ecff 0%, #cdbcff 100%)',
      hoverBorderColor: '#c4b5fd',
      imageAlt: 'Distance icon - measuring how far objects travel',
      imageSrc: 'assets/img/mathematics-numeracy-distance.svg',
    },
    {
      title: 'At vero eos et Accusamus',
      description:
        'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas.' ,
      url: '/learning-domains/mathematics-and-numeracy/capacity',
      background: 'linear-gradient(180deg, #fff0f0 0%, #ffb8b8 100%)',
      hoverBorderColor: '#fbbf94',
      imageAlt: 'Capacity icon - measuring how much containers hold',
      imageSrc: 'assets/img/mathematics-numeracy-capacity.svg',
    },
    {
      title: 'Nam libero Tempore',
      description:
        'Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus omnis voluptas assumenda est.',
      url: '/learning-domains/mathematics-and-numeracy/area',
      background: 'linear-gradient(180deg, #effdea 0%, #afe57f 100%)',
      hoverBorderColor: '#86efac',
      imageAlt: 'Area icon - measuring surface space in square units',
      imageSrc: 'assets/img/mathematics-numeracy-area.svg',
    },
  ];
}
