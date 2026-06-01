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
      imageSrc: 'assets/img/domain/colour/domain-lang-lit-col.png',
      imageAlt: 'Language and Literacy illustration',
      background: 'linear-gradient(135deg, #B85A12 0%, #8F4D12 100%)',
      hoverBorderColor: '#AC5E16',
    },
    {
      title: 'Executive function',
      description: 'Develop working memory, attention, cognitive flexibility, and problem-solving skills.',
      url: '/learning-domains/executive-function',
      imageSrc: 'assets/img/domain/colour/domain-exec-func-col.png',
      imageAlt: 'Executive Function illustration',
      background: 'linear-gradient(135deg, #0069AB 0%, #004A78 100%)',
      hoverBorderColor: '#005387',
    },
    {
      title: 'Social-emotional learning',
      description: 'Foster self-awareness, emotion regulation, empathy, and positive relationships.',
      url: '/learning-domains/social-and-emotional-learning',
      imageSrc: 'assets/img/domain/colour/domain-soc-emot-lrn-col.png',
      imageAlt: 'Social-Emotional Learning illustration',
      background: 'linear-gradient(135deg, #D10A7D 0%, #930758 100%)',
      hoverBorderColor: '#A40862',
    },
    {
      title: 'Physicality',
      description: 'Enhance gross and fine motor skills, coordination, and physical confidence.',
      url: '/learning-domains/physicality',
      imageSrc: 'assets/img/domain/colour/domain-physicality-colour.png',
      imageAlt: 'Physicality illustration',
      background: 'linear-gradient(135deg, #247F33 0%, #185922 100%)',
      hoverBorderColor: '#1D682A',
    },
    {
      title: 'Mathematics and numeracy',
      description: 'Build number sense, pattern recognition, spatial reasoning, and mathematical thinking.',
      url: '/learning-domains/mathematics-and-numeracy',
      imageSrc: 'assets/img/domain/colour/domain-math-num-col.png',
      imageAlt: 'Mathematics and Numeracy illustration',
      background: 'linear-gradient(135deg, #BA1C23 0%, #801318 100%)',
      hoverBorderColor: '#91161B',
    },
  ];
}
