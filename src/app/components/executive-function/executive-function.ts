import { ChangeDetectionStrategy, Component } from '@angular/core';
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
export class ExecutiveFunction {
  protected readonly cards: DesignCard[] = [
    {
      title: 'Lorem Ipsum',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      url: '/learning-domains/executive-function/inhibitory-control',
      background: 'linear-gradient(180deg, #fbfff6 0%, #d9f7be 100%)',
      hoverBorderColor: '#94d2bd',
      imageAlt: 'Inhibitory Control icon - child resisting distractions',
      imageSrc: 'assets/img/executive-function-inhibitory-control.svg',
    },
    {
      title: 'Dolor Sit Amet',
      description:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam.',
      url: '/learning-domains/executive-function/working-memory',
      background: 'linear-gradient(180deg, #f7fff9 0%, #ccfbf1 100%)',
      hoverBorderColor: '#6ee7b7',
      imageAlt: 'Working Memory icon - child remembering instructions',
      imageSrc: 'assets/img/executive-function-working-memory.svg',
    },
    {
      title: 'Sed Do Eiusmod',
      description:
        'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores eos.',
      url: '/learning-domains/executive-function/cognitive-flexibility',
      background: 'linear-gradient(180deg, #fffaf5 0%, #ffedd5 100%)',
      hoverBorderColor: '#fca5a5',
      imageAlt: 'Cognitive Flexibility icon - child adapting to change',
      imageSrc: 'assets/img/executive-function-cognitive-flexibility.svg',
    },
    {
      title: 'Tempor Incididunt',
      description:
        'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum delenit atque corrupti.',
      url: '/learning-domains/executive-function/self-regulation',
      background: 'linear-gradient(180deg, #fbfff6 0%, #e7f6d8 100%)',
      hoverBorderColor: '#b7d894',
      imageAlt: 'Self-Regulation icon - child managing emotions',
      imageSrc: 'assets/img/executive-function-self-regulation.svg',
    },
    {
      title: 'Consectetur Adipiscing',
      description:
        'Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere.',
      url: '/learning-domains/executive-function/planning-organization',
      background: 'linear-gradient(180deg, #f9f5ff 0%, #ede9fe 100%)',
      hoverBorderColor: '#c4b5fd',
      imageAlt: 'Planning and Organization icon - child organizing materials',
      imageSrc: 'assets/img/executive-function-planning-organization.svg',
    },
    {
      title: 'Ut Labore Et Dolore',
      description:
        'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur vel illum.',
      url: '/learning-domains/executive-function/attention-focus',
      background: 'linear-gradient(180deg, #fff5f5 0%, #ffe3e3 100%)',
      hoverBorderColor: '#fbbf94',
      imageAlt: 'Attention and Focus icon - child concentrating on task',
      imageSrc: 'assets/img/executive-function-attention-focus.svg',
    },
  ];
}
