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
      title: 'Self-Regulation',
      description:
        'Children develop the ability to manage their emotions, behaviors, and actions in different situations. They learn to pause, think before acting, and adapt to new environments.',
      url: '/learning-domains/social-and-emotional-learning/self-regulation',
      background: 'linear-gradient(180deg, #fff8fb 0%, #ffe5ee 100%)',
      hoverBorderColor: '#f9a8c4',
      imageAlt: 'Self-Regulation icon - child managing emotions',
      imageSrc: 'assets/img/domain-social-emotional-learning.svg',
    },
    {
      title: 'Social Skills',
      description:
        'Children learn to interact positively with peers and adults. They develop skills in sharing, taking turns, cooperating, and resolving conflicts in age-appropriate ways.',
      url: '/learning-domains/social-and-emotional-learning/social-skills',
      background: 'linear-gradient(180deg, #fff5f9 0%, #ffd6e8 100%)',
      hoverBorderColor: '#f5a0b8',
      imageAlt: 'Social Skills icon - children playing together',
      imageSrc: 'assets/img/domain-social-emotional-learning.svg',
    },
    {
      title: 'Emotional Awareness',
      description:
        'Children begin to identify and express their own emotions. They develop empathy for others, recognizing feelings in peers and responding with compassion and support.',
      url: '/learning-domains/social-and-emotional-learning/emotional-awareness',
      background: 'linear-gradient(180deg, #fff9fc 0%, #ffcce0 100%)',
      hoverBorderColor: '#f794b0',
      imageAlt: 'Emotional Awareness icon - child expressing feelings',
      imageSrc: 'assets/img/domain-social-emotional-learning.svg',
    },
    {
      title: 'Relationship Building',
      description:
        'Children form positive attachments and friendships. They learn to trust adults, seek comfort when needed, and build meaningful connections with other children.',
      url: '/learning-domains/social-and-emotional-learning/relationship-building',
      background: 'linear-gradient(180deg, #fff7f9 0%, #ffb8d6 100%)',
      hoverBorderColor: '#f38aa5',
      imageAlt: 'Relationship Building icon - child hugging peer',
      imageSrc: 'assets/img/domain-social-emotional-learning.svg',
    },
    {
      title: 'Social Understanding',
      description:
        'Children develop an understanding of social rules, expectations, and cultural norms. They learn to navigate group settings and understand different perspectives.',
      url: '/learning-domains/social-and-emotional-learning/social-understanding',
      background: 'linear-gradient(180deg, #fff5f7 0%, #ffa3c9 100%)',
      hoverBorderColor: '#ef7b96',
      imageAlt: 'Social Understanding icon - child in group setting',
      imageSrc: 'assets/img/domain-social-emotional-learning.svg',
    },
    {
      title: 'Confidence and Independence',
      description:
        'Children develop a sense of self-efficacy and autonomy. They show willingness to try new activities, persist through challenges, and express confidence in their abilities.',
      url: '/learning-domains/social-and-emotional-learning/confidence-independence',
      background: 'linear-gradient(180deg, #fff3f5 0%, #ff90bc 100%)',
      hoverBorderColor: '#eb6d87',
      imageAlt: 'Confidence and Independence icon - child trying new activity',
      imageSrc: 'assets/img/domain-social-emotional-learning.svg',
    },
  ];
}
