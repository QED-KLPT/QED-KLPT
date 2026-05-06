import { ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
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
  selector: 'app-physicality',
  imports: [RouterLink, YoutubePlayerModule],
  templateUrl: './physicality.html',
  styleUrl: './physicality.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Physicality implements OnInit {
  constructor(private scroll: ViewportScroller) {}

  ngOnInit(): void {
    this.scroll.scrollToPosition([0, 0]);
  }

  protected readonly cards: DesignCard[] = [
    {
      title: 'Aenean Imperdiet',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      url: '/learning-domains/physicality/stable-movement',
      background: 'linear-gradient(180deg, #fbfff6 0%, #d9f7be 100%)',
      hoverBorderColor: '#94d2bd',
      imageAlt: 'Child standing on one foot for balance',
      imageSrc: 'assets/img/physicality-stable-movement.svg',
    },
    {
      title: 'Praesent Elementum',
      description:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam.',
      url: '/learning-domains/physicality/environment-awareness',
      background: 'linear-gradient(180deg, #f7fff9 0%, #ccfbf1 100%)',
      hoverBorderColor: '#6ee7b7',
      imageAlt: 'Child looking around curiously',
      imageSrc: 'assets/img/physicality-environment-awareness.svg',
    },
    {
      title: 'Egestas Dui',
      description:
        'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores eos.',
      url: '/learning-domains/physicality/object-control',
      background: 'linear-gradient(180deg, #fffaf5 0%, #ffedd5 100%)',
      hoverBorderColor: '#fca5a5',
      imageAlt: 'Child hitting a ball with a bat',
      imageSrc: 'assets/img/physicality-object-control.svg',
    },
    {
      title: 'Fusce Vestibulum',
      description:
        'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum delenit atque corrupti.',
      url: '/learning-domains/physicality/gross-motor',
      background: 'linear-gradient(180deg, #fbfff6 0%, #e7f6d8 100%)',
      hoverBorderColor: '#b7d894',
      imageAlt: 'Child jumping with arms raised',
      imageSrc: 'assets/img/physicality-gross-motor.svg',
    },
    {
      title: 'Curabitur Pulletin',
      description:
        'Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere.',
      url: '/learning-domains/physicality/fine-motor',
      background: 'linear-gradient(180deg, #f9f5ff 0%, #ede9fe 100%)',
      hoverBorderColor: '#c4b5fd',
      imageAlt: 'Child holding crayons to draw',
      imageSrc: 'assets/img/physicality-fine-motor.svg',
    },
    {
      title: 'Tempor Identique',
      description:
        'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur vel illum.',
      url: '/learning-domains/physicality/sensory-learning',
      background: 'linear-gradient(180deg, #fff5f5 0%, #ffe3e3 100%)',
      hoverBorderColor: '#fbbf94',
      imageAlt: 'Child touching different textured shapes',
      imageSrc: 'assets/img/physicality-sensory-learning.svg',
    },
  ];
}
