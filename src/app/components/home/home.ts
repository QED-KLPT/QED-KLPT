import { ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DomainCard } from '../shared/domain-card/domain-card';
import { YoutubePlayerModule } from '../shared/youtube-player/youtube-player.module';

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
  imports: [RouterLink, YoutubePlayerModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home implements OnInit {
  constructor(private scroll: ViewportScroller) {}

  ngOnInit(): void {
    this.scroll.scrollToPosition([0, 0]);
  }

  protected readonly domains: DomainSummary[] = [
    {
      title: 'Language and literacy',
      description: 'Support vocabulary, phonological awareness, and early reading and writing skills.',
      url: '/learning-domains/language-and-literacy',
      imageSrc: 'assets/img/domain-language-literacy-colour.png',
      imageAlt: 'Language and Literacy illustration',
      background: 'linear-gradient(135deg, #F6861F 0%, #AC5E16 100%)',
      hoverBorderColor: '#AC5E16',
    },
    {
      title: 'Executive function',
      description: 'Develop working memory, attention, cognitive flexibility, and problem-solving skills.',
      url: '/learning-domains/executive-function',
      imageSrc: 'assets/img/domain-executive-function-colour.png',
      imageAlt: 'Executive Function illustration',
      background: 'linear-gradient(135deg, #0077C1 0%, #005387 100%)',
      hoverBorderColor: '#005387',
    },
    {
      title: 'Social-emotional learning',
      description: 'Foster self-awareness, emotion regulation, empathy, and positive relationships.',
      url: '/learning-domains/social-and-emotional-learning',
      imageSrc: 'assets/img/domain-social-emotional-learning-colour.png',
      imageAlt: 'Social-Emotional Learning illustration',
      background: 'linear-gradient(135deg, #EA0B8C 0%, #A40862 100%)',
      hoverBorderColor: '#A40862',
    },
    {
      title: 'Physicality',
      description: 'Enhance gross and fine motor skills, coordination, and physical confidence.',
      url: '/learning-domains/physicality',
      imageSrc: 'assets/img/domain-physicality-colour.png',
      imageAlt: 'Physicality illustration',
      background: 'linear-gradient(135deg, #2A953C 0%, #1D682A 100%)',
      hoverBorderColor: '#1D682A',
    },
    {
      title: 'Mathematics and numeracy',
      description: 'Build number sense, pattern recognition, spatial reasoning, and mathematical thinking.',
      url: '/learning-domains/mathematics-and-numeracy',
      imageSrc: 'assets/img/domain-mathematics-numeracy-colour.png',
      imageAlt: 'Mathematics and Numeracy illustration',
      background: 'linear-gradient(135deg, #CF2027 0%, #91161B 100%)',
      hoverBorderColor: '#91161B',
    },
  ];
}
