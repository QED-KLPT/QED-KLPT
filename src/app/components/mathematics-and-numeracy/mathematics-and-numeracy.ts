import { ChangeDetectionStrategy, Component } from '@angular/core';
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
  selector: 'app-mathematics-and-numeracy',
  imports: [DomainCard],
  templateUrl: './mathematics-and-numeracy.html',
  styleUrl: './mathematics-and-numeracy.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MathematicsAndNumeracy {
  protected readonly cards: DesignCard[] = [
    {
      title: 'Numbers',
      description:
        'Developing number recognition, counting skills, and understanding the relationship between numbers and quantities in everyday contexts.',
      url: '/learning-domains/mathematics-and-numeracy/numbers',
      background: 'linear-gradient(180deg, #fbfff6 0%, #d9f7be 100%)',
      hoverBorderColor: '#94d2bd',
      imageAlt: 'Numbers icon - counting numerals 1, 2, and 3',
      imageSrc: 'assets/img/mathematics-numeracy-numbers.svg',
    },
    {
      title: 'Quantity',
      description:
        'Understanding more and less, developing comparative language, and exploring quantity through hands-on exploration and grouping activities.',
      url: '/learning-domains/mathematics-and-numeracy/quantity',
      background: 'linear-gradient(180deg, #f7fff9 0%, #ccfbf1 100%)',
      hoverBorderColor: '#6ee7b7',
      imageAlt: 'Quantity icon - grouping and comparing collections of objects',
      imageSrc: 'assets/img/mathematics-numeracy-quantity.svg',
    },
    {
      title: 'Concepts of Time',
      description:
        'Developing understanding of daily routines, sequencing events, and using time-related language to describe when things happen.',
      url: '/learning-domains/mathematics-and-numeracy/concepts-of-time',
      background: 'linear-gradient(180deg, #fffaf5 0%, #ffedd5 100%)',
      hoverBorderColor: '#fca5a5',
      imageAlt: 'Concepts of Time icon - clock showing time sequence',
      imageSrc: 'assets/img/mathematics-numeracy-concepts-of-time.svg',
    },
    {
      title: 'Length',
      description:
        'Exploring measurement through direct comparison, developing understanding of standard and non-standard units for measuring length and distance.',
      url: '/learning-domains/mathematics-and-numeracy/length',
      background: 'linear-gradient(180deg, #fbfff6 0%, #e7f6d8 100%)',
      hoverBorderColor: '#b7d894',
      imageAlt: 'Length icon - measuring objects with standard units',
      imageSrc: 'assets/img/mathematics-numeracy-length.svg',
    },
    {
      title: 'Distance',
      description:
        'Understanding how far things move, developing spatial reasoning, and using comparative language to describe how distances change.',
      url: '/learning-domains/mathematics-and-numeracy/distance',
      background: 'linear-gradient(180deg, #f9f5ff 0%, #ede9fe 100%)',
      hoverBorderColor: '#c4b5fd',
      imageAlt: 'Distance icon - measuring how far objects travel',
      imageSrc: 'assets/img/mathematics-numeracy-distance.svg',
    },
    {
      title: 'Capacity',
      description:
        'Exploring volume and capacity through filling and emptying containers, developing understanding of how much things hold and comparative measurement language.',
      url: '/learning-domains/mathematics-and-numeracy/capacity',
      background: 'linear-gradient(180deg, #fff5f5 0%, #ffe3e3 100%)',
      hoverBorderColor: '#fbbf94',
      imageAlt: 'Capacity icon - measuring how much containers hold',
      imageSrc: 'assets/img/mathematics-numeracy-capacity.svg',
    },
    {
      title: 'Area',
      description:
        'Understanding surface area, developing spatial measurement skills, and using non-standard units to covering and tiling activities.',
      url: '/learning-domains/mathematics-and-numeracy/area',
      background: 'linear-gradient(180deg, #fbfff6 0%, #d9f7be 100%)',
      hoverBorderColor: '#86efac',
      imageAlt: 'Area icon - measuring surface space in square units',
      imageSrc: 'assets/img/mathematics-numeracy-area.svg',
    },
  ];
}
