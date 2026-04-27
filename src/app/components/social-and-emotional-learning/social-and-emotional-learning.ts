import { ChangeDetectionStrategy, Component } from '@angular/core';
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
  selector: 'app-social-and-emotional-learning',
  imports: [DomainCard, YoutubePlayerModule],
  templateUrl: './social-and-emotional-learning.html',
  styleUrl: './social-and-emotional-learning.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialAndEmotionalLearning {
  protected readonly cards: DesignCard[] = [
    {
      title: 'Lorem Ipsum Dolor',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      url: '/learning-domains/social-and-emotional-learning/self-regulation',
      background: 'linear-gradient(180deg, #fff8fb 0%, #ffe5ee 100%)',
      hoverBorderColor: '#f9a8c4',
      imageAlt: 'Self-Regulation icon - child managing emotions',
      imageSrc: 'assets/img/domain-social-emotional-learning.svg',
    },
    {
      title: 'Sed Do Eiusmod Tempor',
      description:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam.',
      url: '/learning-domains/social-and-emotional-learning/social-skills',
      background: 'linear-gradient(180deg, #fff5f9 0%, #ffd6e8 100%)',
      hoverBorderColor: '#f5a0b8',
      imageAlt: 'Social Skills icon - children playing together',
      imageSrc: 'assets/img/domain-social-emotional-learning.svg',
    },
    {
      title: 'Ut Labore Et Dolore',
      description:
        'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores eos.',
      url: '/learning-domains/social-and-emotional-learning/emotional-awareness',
      background: 'linear-gradient(180deg, #fff9fc 0%, #ffcce0 100%)',
      hoverBorderColor: '#f794b0',
      imageAlt: 'Emotional Awareness icon - child expressing feelings',
      imageSrc: 'assets/img/domain-social-emotional-learning.svg',
    },
    {
      title: 'Consectetur Adipiscing',
      description:
        'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum delenit atque corrupti.',
      url: '/learning-domains/social-and-emotional-learning/relationship-building',
      background: 'linear-gradient(180deg, #fff7f9 0%, #ffb8d6 100%)',
      hoverBorderColor: '#f38aa5',
      imageAlt: 'Relationship Building icon - child hugging peer',
      imageSrc: 'assets/img/domain-social-emotional-learning.svg',
    },
    {
      title: 'Duis aute Irure',
      description:
        'Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere.',
      url: '/learning-domains/social-and-emotional-learning/social-understanding',
      background: 'linear-gradient(180deg, #fff5f7 0%, #ffa3c9 100%)',
      hoverBorderColor: '#ef7b96',
      imageAlt: 'Social Understanding icon - child in group setting',
      imageSrc: 'assets/img/domain-social-emotional-learning.svg',
    },
    {
      title: 'Voluptate Velit Esse',
      description:
        'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur vel illum.',
      url: '/learning-domains/social-and-emotional-learning/ut-labore-et-dolore',
      background: 'linear-gradient(180deg, #fff3f5 0%, #ff90bc 100%)',
      hoverBorderColor: '#eb6d87',
      imageAlt: 'Confidence and Independence icon - child trying new activity',
      imageSrc: 'assets/img/domain-social-emotional-learning.svg',
    },
  ];
}
