import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DomainCard } from '../../shared/domain-card/domain-card';

type DomainSummary = {
  title: string;
  description: string;
  url: string;
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
      url: '/about',
    },
    {
      title: 'Executive Function',
      description: 'Develop working memory, attention, cognitive flexibility, and problem-solving skills.',
      url: '/about',
    },
    {
      title: 'Social-Emotional Learning',
      description: 'Foster self-awareness, emotion regulation, empathy, and positive relationships.',
      url: '/about',
    },
    {
      title: 'Physicality',
      description: 'Enhance gross and fine motor skills, coordination, and physical confidence.',
      url: '/about',
    },
    {
      title: 'Mathematics and Numeracy',
      description: 'Build number sense, pattern recognition, spatial reasoning, and mathematical thinking.',
      url: '/about',
    },
    {
      title: 'Child-Centred Assessment',
      description: 'Focus on meaningful observation and assessment without narrowing learning.',
      url: '/about',
    },
  ];
}
