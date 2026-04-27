import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DomainCard } from '../shared/domain-card/domain-card';

type DomainSummary = {
  title: string;
  description: string;
  url: string;
  imageAlt?: string;
  imageSrc?: string;
  background?: string;
  hoverBorderColor?: string;
};

@Component({
  selector: 'app-home',
  imports: [RouterLink, DomainCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected readonly domains: DomainSummary[] = [
    {
      title: 'Language and Literacy',
      description: 'Support vocabulary, phonological awareness, and early reading and writing skills.',
      url: '/learning-domains/language-and-literacy',
      imageSrc: 'assets/img/domain-language-literacy.svg',
      imageAlt: 'Language and Literacy illustration',
      background: 'linear-gradient(180deg, #fff8ee 0%, #ffe9d3 100%)',
      hoverBorderColor: '#efb777',
    },
    {
      title: 'Executive Function',
      description: 'Develop working memory, attention, cognitive flexibility, and problem-solving skills.',
      url: '/learning-domains/executive-function',
      imageSrc: 'assets/img/domain-executive-function.svg',
      imageAlt: 'Executive Function illustration',
      background: 'linear-gradient(180deg, #f4ffff 0%, #def3f6 100%)',
      hoverBorderColor: '#92ccd5',
    },
    {
      title: 'Social-Emotional Learning',
      description: 'Foster self-awareness, emotion regulation, empathy, and positive relationships.',
      url: '/learning-domains/social-and-emotional-learning',
      imageSrc: 'assets/img/domain-social-emotional-learning.svg',
      imageAlt: 'Social-Emotional Learning illustration',
      background: 'linear-gradient(180deg, #fff8fb 0%, #ffe5ee 100%)',
      hoverBorderColor: '#f0aac3',
    },
    {
      title: 'Physicality',
      description: 'Enhance gross and fine motor skills, coordination, and physical confidence.',
      url: '/learning-domains/physicality',
      imageSrc: 'assets/img/domain-physicality.svg',
      imageAlt: 'Physicality illustration',
      background: 'linear-gradient(180deg, #fbfff6 0%, #e7f6d8 100%)',
      hoverBorderColor: '#b7d894',
    },
    {
      title: 'Mathematics and Numeracy',
      description: 'Build number sense, pattern recognition, spatial reasoning, and mathematical thinking.',
      url: '/learning-domains/mathematics-and-numeracy',
      imageSrc: 'assets/img/domain-mathematics-numeracy.svg',
      imageAlt: 'Mathematics and Numeracy illustration',
      background: 'linear-gradient(180deg, #f7f9ff 0%, #e2e9ff 100%)',
      hoverBorderColor: '#abbbee',
    },
  ];
}
