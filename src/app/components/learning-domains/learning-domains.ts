import { ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
export class LearningDomains implements OnInit {
  constructor(private scroll: ViewportScroller) {}

  ngOnInit(): void {
    this.scroll.scrollToPosition([0, 0]);
  }

  protected readonly domains: DomainNavCard[] = [
    {
      title: 'Language and Literacy',
      description: 'Support vocabulary, phonological awareness, and early reading and writing skills.',
      url: '/learning-domains/language-and-literacy',
      imageAlt: 'Language and Literacy icon',
      imageSrc: 'assets/img/domain-language-literacy-colour.png',
      background: 'linear-gradient(135deg, #F6861F 0%, #AC5E16 100%)',
      hoverBorderColor: '#AC5E16',
    },
    {
      title: 'Executive Function',
      description: 'Develop working memory, attention, cognitive flexibility, and problem-solving skills.',
      url: '/learning-domains/executive-function',
      imageAlt: 'Executive Function icon',
      imageSrc: 'assets/img/domain-executive-function-colour.png',
      background: 'linear-gradient(135deg, #0077C1 0%, #005387 100%)',
      hoverBorderColor: '#005387',
    },
    {
      title: 'Social-Emotional Learning',
      description: 'Foster self-awareness, emotion regulation, empathy, and positive relationships.',
      url: '/learning-domains/social-and-emotional-learning',
      imageAlt: 'Social-Emotional Learning icon',
      imageSrc: 'assets/img/domain-social-emotional-learning-colour.png',
      background: 'linear-gradient(135deg, #EA0B8C 0%, #A40862 100%)',
      hoverBorderColor: '#A40862',
    },
    {
      title: 'Physicality',
      description: 'Enhance gross and fine motor skills, coordination, and physical confidence.',
      url: '/learning-domains/physicality',
      imageAlt: 'Physicality icon',
      imageSrc: 'assets/img/domain-physicality-colour.png',
      background: 'linear-gradient(135deg, #2A953C 0%, #1D682A 100%)',
      hoverBorderColor: '#1D682A',
    },
    {
      title: 'Mathematics and Numeracy',
      description: 'Build number sense, pattern recognition, spatial reasoning, and mathematical thinking.',
      url: '/learning-domains/mathematics-and-numeracy',
      imageAlt: 'Mathematics and Numeracy icon',
      imageSrc: 'assets/img/domain-mathematics-numeracy-colour.png',
      background: 'linear-gradient(135deg, #CF2027 0%, #91161B 100%)',
      hoverBorderColor: '#91161B',
    },
  ];
}
