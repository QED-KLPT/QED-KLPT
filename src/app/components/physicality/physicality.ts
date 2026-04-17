import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DomainCard } from '../shared/domain-card/domain-card';

type DesignCard = {
  title: string;
  description: string;
  url: string;
  imageAlt?: string;
  background: string;
  hoverBorderColor: string;
};

@Component({
  selector: 'app-physicality',
  imports: [DomainCard],
  templateUrl: './physicality.html',
  styleUrl: './physicality.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Physicality {
  protected readonly cards: DesignCard[] = [
    {
      title: 'Stable Movement',
      description:
        'Developing balance, coordination, and confident physical control across various activities and environments.',
      url: '/learning-domains/physicality/stable-movement',
      background: 'linear-gradient(180deg, #fbfff6 0%, #d9f7be 100%)',
      hoverBorderColor: '#94d2bd',
    },
    {
      title: 'Environment Awareness',
      description:
        'Understanding spatial relationships, navigating surroundings safely, and responding to environmental cues.',
      url: '/learning-domains/physicality/environment-awareness',
      background: 'linear-gradient(180deg, #f7fff9 0%, #ccfbf1 100%)',
      hoverBorderColor: '#6ee7b7',
    },
    {
      title: 'Object Control',
      description:
        'Manipulating objects with precision, understanding cause and effect, and developing hand-eye coordination.',
      url: '/learning-domains/physicality/object-control',
      background: 'linear-gradient(180deg, #fffaf5 0%, #ffedd5 100%)',
      hoverBorderColor: '#fca5a5',
    },
    {
      title: 'Gross Motor',
      description:
        'Large muscle movement, strength, and coordination for running, jumping, climbing, and playing.',
      url: '/learning-domains/physicality/gross-motor',
      background: 'linear-gradient(180deg, #fbfff6 0%, #e7f6d8 100%)',
      hoverBorderColor: '#b7d894',
    },
    {
      title: 'Fine Motor',
      description:
        'Small muscle control for drawing, writing, building, and detailed manipulation tasks.',
      url: '/learning-domains/physicality/fine-motor',
      background: 'linear-gradient(180deg, #f9f5ff 0%, #ede9fe 100%)',
      hoverBorderColor: '#c4b5fd',
    },
    {
      title: 'Sensory Learning',
      description:
        'Exploring through the senses, developing developmental understanding, and responding to sensory input.',
      url: '/learning-domains/physicality/sensory-learning',
      background: 'linear-gradient(180deg, #fff5f5 0%, #ffe3e3 100%)',
      hoverBorderColor: '#fbbf94',
    },
  ];
}
