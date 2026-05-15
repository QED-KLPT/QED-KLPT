import { ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AccordionItemComponent } from '../shared/accordion-item/accordion-item.component';
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
  imports: [RouterLink, AccordionItemComponent, YoutubePlayerModule],
  templateUrl: './social-and-emotional-learning.html',
  styleUrl: './social-and-emotional-learning.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialAndEmotionalLearning implements OnInit {
  constructor(private scroll: ViewportScroller) {}

  ngOnInit(): void {
    this.scroll.scrollToPosition([0, 0]);
  }

  protected readonly practiceSupports: { title: string; summary: string; reflection: string[]; accordionItems: { title: string; body: string[] }[]; pdfLabel: string; pdfPath: string } = {
    title: 'Social and emotional learning',
    summary: 'Support children to recognise feelings, build relationships, and participate with growing confidence through responsive interactions and safe, predictable routines.',
    reflection: [
      'Notice how the child communicates emotions, seeks support, and responds to peers in different parts of the day.',
    ],
    accordionItems: [
      {
        title: 'Intentional teaching strategies',
        body: [
          'Name emotions in the moment, model calm problem solving, and coach children through social situations with empathy and clear language.',
          'Use books, visuals, and shared reflections to build a vocabulary for feelings, friendship, and belonging.',
        ],
      },
      {
        title: 'Learning experiences',
        body: [
          'Offer small-group games, collaborative projects, and dramatic play invitations that encourage negotiation, perspective taking, and shared joy.',
          'Build in quiet spaces and sensory supports so children can return to regulation when needed.',
        ],
      },
    ],
    pdfLabel: 'Download social and emotional learning practice supports (PDF)',
    pdfPath: 'assets/content/pdfs/qklg_principle_res_rels_poster.pdf',
  };

  protected readonly cards: DesignCard[] = [
    {
      title: 'Lorem Ipsum Dolor',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      url: '/learning-domains/social-and-emotional-learning/self-regulation',
      background: 'linear-gradient(180deg, #fff0f6 0%, #ffb8d1 100%)',
      hoverBorderColor: '#f9a8c4',
      imageAlt: 'Self-Regulation icon - child managing emotions',
      imageSrc: 'assets/img/domain-social-emotional-learning.svg',
    },
    {
      title: 'Sed Do Eiusmod Tempor',
      description:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam.',
      url: '/learning-domains/social-and-emotional-learning/social-skills',
      background: 'linear-gradient(180deg, #fff0f6 0%, #ffa9cb 100%)',
      hoverBorderColor: '#f5a0b8',
      imageAlt: 'Social Skills icon - children playing together',
      imageSrc: 'assets/img/domain-social-emotional-learning.svg',
    },
    {
      title: 'Ut Labore Et Dolore',
      description:
        'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores eos.',
      url: '/learning-domains/social-and-emotional-learning/emotional-awareness',
      background: 'linear-gradient(180deg, #fff0f7 0%, #ff9fc4 100%)',
      hoverBorderColor: '#f794b0',
      imageAlt: 'Emotional Awareness icon - child expressing feelings',
      imageSrc: 'assets/img/domain-social-emotional-learning.svg',
    },
    {
      title: 'Consectetur Adipiscing',
      description:
        'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum delenit atque corrupti.',
      url: '/learning-domains/social-and-emotional-learning/relationship-building',
      background: 'linear-gradient(180deg, #fff0f5 0%, #ff8fbf 100%)',
      hoverBorderColor: '#f38aa5',
      imageAlt: 'Relationship Building icon - child hugging peer',
      imageSrc: 'assets/img/domain-social-emotional-learning.svg',
    },
    {
      title: 'Duis aute Irure',
      description:
        'Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere.',
      url: '/learning-domains/social-and-emotional-learning/social-understanding',
      background: 'linear-gradient(180deg, #fff0f4 0%, #ff7db3 100%)',
      hoverBorderColor: '#ef7b96',
      imageAlt: 'Social Understanding icon - child in group setting',
      imageSrc: 'assets/img/domain-social-emotional-learning.svg',
    },
    {
      title: 'Voluptate Velit Esse',
      description:
        'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur vel illum.',
      url: '/learning-domains/social-and-emotional-learning/ut-labore-et-dolore',
      background: 'linear-gradient(180deg, #fff0f3 0%, #ff69a5 100%)',
      hoverBorderColor: '#eb6d87',
      imageAlt: 'Confidence and Independence icon - child trying new activity',
      imageSrc: 'assets/img/domain-social-emotional-learning.svg',
    },
  ];
}
