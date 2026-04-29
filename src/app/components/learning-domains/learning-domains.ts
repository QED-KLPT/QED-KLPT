import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DomainCard } from '../shared/domain-card/domain-card';

type DomainNavCard = {
  title: string;
  description: string;
  url: string;
  imageAlt: string;
  imageSrc: string;
  background: string;
  hoverBorderColor: string;
};

@Component({
  selector: 'app-learning-domains',
  imports: [DomainCard],
  templateUrl: './learning-domains.html',
  styleUrl: './learning-domains.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LearningDomains {
  protected readonly domains: DomainNavCard[] = [
    {
      title: 'Language and Literacy',
      description: 'Support vocabulary, phonological awareness, and early reading and writing skills.',
      url: '/learning-domains/language-and-literacy',
      imageAlt: 'Language and Literacy icon',
      imageSrc: 'assets/img/domain-language-literacy.svg',
      background: 'linear-gradient(180deg, #fffaf5 0%, #ffe9d3 100%)',
      hoverBorderColor: '#efb777',
    },
    {
      title: 'Executive Function',
      description: 'Develop working memory, attention, cognitive flexibility, and problem-solving skills.',
      url: '/learning-domains/executive-function',
      imageAlt: 'Executive Function icon',
      imageSrc: 'assets/img/domain-executive-function.svg',
      background: 'linear-gradient(180deg, #f4ffff 0%, #def3f6 100%)',
      hoverBorderColor: '#92ccd5',
    },
    {
      title: 'Social-Emotional Learning',
      description: 'Foster self-awareness, emotion regulation, empathy, and positive relationships.',
      url: '/learning-domains/social-and-emotional-learning',
      imageAlt: 'Social-Emotional Learning icon',
      imageSrc: 'assets/img/domain-social-emotional-learning.svg',
      background: 'linear-gradient(180deg, #faf5ff 0%, #e9d5ff 100%)',
      hoverBorderColor: '#c4b5fd',
    },
    {
      title: 'Physicality',
      description: 'Enhance gross and fine motor skills, coordination, and physical confidence.',
      url: '/learning-domains/physicality',
      imageAlt: 'Physicality icon',
      imageSrc: 'assets/img/domain-physicality.svg',
      background: 'linear-gradient(180deg, #f7fff9 0%, #d9f7be 100%)',
      hoverBorderColor: '#94d2bd',
    },
    {
      title: 'Mathematics and Numeracy',
      description: 'Build number sense, pattern recognition, spatial reasoning, and mathematical thinking.',
      url: '/learning-domains/mathematics-and-numeracy',
      imageAlt: 'Mathematics and Numeracy icon',
      imageSrc: 'assets/img/domain-mathematics-numeracy.svg',
      background: 'linear-gradient(180deg, #f7f9ff 0%, #e2e9ff 100%)',
      hoverBorderColor: '#abbbee',
    },
  ];
}
