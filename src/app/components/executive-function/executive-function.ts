import { ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DomainCard } from '../shared/domain-card/domain-card';
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
  selector: 'app-executive-function',
  imports: [DomainCard, RouterLink, YoutubePlayerModule],
  templateUrl: './executive-function.html',
  styleUrl: './executive-function.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExecutiveFunction implements OnInit {
  constructor(private scroll: ViewportScroller) {}

  ngOnInit(): void {
    this.scroll.scrollToPosition([0, 0]);
  }

  protected readonly cards: DesignCard[] = [
    {
      title: 'Persistence',
      description:
        'Staying on task, trying again after challenges and completing activities',
      url: '',
      background: 'linear-gradient(180deg, #fbfff6 0%, #d9f7be 100%)',
      hoverBorderColor: '#94d2bd',
      imageAlt: 'Persistence',
      imageSrc: 'assets/img/executive-function-inhibitory-control.svg',
    },
    {
      title: 'Adaptability',
      description:
        'Adjusting when routies change, responding to new information and staying calm under uncertainty',
      url: '',
      background: 'linear-gradient(180deg, #f7fff9 0%, #ccfbf1 100%)',
      hoverBorderColor: '#6ee7b7',
      imageAlt: 'Adaptability',
      imageSrc: 'assets/img/executive-function-working-memory.svg',
    },
    {
      title: 'Problem solving',
      description:
        'Exploring ideas, testing strategies and reflecting on what works',
      url: '',
      background: 'linear-gradient(180deg, #fffaf5 0%, #ffedd5 100%)',
      hoverBorderColor: '#fca5a5',
      imageAlt: 'Problem solving',
      imageSrc: 'assets/img/executive-function-cognitive-flexibility.svg',
    },
  ];
}
