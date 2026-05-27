import { ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AccordionItemComponent } from '../shared/accordion-item/accordion-item.component';
import { YoutubePlayerModule } from '../shared/youtube-player/youtube-player.module';
import { joinWrappedLines } from '../../shared/helpers/join-wrapped-lines';

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

  protected readonly socialAndEmotionalLearningTranscript: string[] = joinWrappedLines([
    '- The four key elements of social learning are participation, communication,',
    'social regulation, and perspective taking. Participation prioritises',
    'how children interact and participate within a group rather than on the specific',
    "task they're contributing to. Communication is used in group context to share understandings and information.",
    'Building a shared understanding',
    "through asking questions, responding, and initiating communication, are important skills to practice.",
    'Social regulation refers',
    "to how children cooperate, take turns, and resolve conflicts.",
    'As children grow and develop, they begin by playing on their own or alongside others as',
    'they learn how to engage in play with peers.',
    'Turn taking and sharing',
    'are important skills which enable children',
    "to navigate conflicts during group work and play,",
    'solve problems, and compromise.',
    "Perspective taking refers",
    "to a child's ability to understand and",
    'consider the perspectives and thoughts of others,',
    'and contributes to the',
    'development of empathy, understanding social situations,',
    'effective communication, and problem solving. Social learning involves',
    "children learning together in pairs, small groups,",
    'or as a whole class.',
    "Learning how to work together",
    "helps children develop their communication and social skills,",
    'and their awareness of others.',
    "Research shows that when",
    'children can work with others, it boosts their confidence,',
    'helps them to sustain attention, and enhances motivation,',
    'which has lifelong benefits. Social skills are important',
    'in early childhood learning.',
    "Encouraging children to work together with similar aged peers creates",
    'opportunities to share ideas and thoughts,',
    'and learn from each other. Social learning helps children',
    "build positive relationships and friendships that",
    "contribute to their learning and knowledge, and their wellbeing.",
    "Creating environments where",
    "everyone's ideas are respected and valued is important",
    'for positive friendships and communication, and supports lifelong social skill development. Emotional learning can be',
    'categorised into emotion in self, emotional control, and',
    "recognising emotions in others. Emotional learning begins in infancy and continues into adolescence.",
    "Children learn how to understand and regulate their own emotions, as well as understand",
    'how others might feel.',
    "As children grow, they begin to recognise their own and others'",
    'emotions, expressions, body language, and behaviour.',
    "This helps children to",
    'develop empathy, identity, and self-awareness.',
    "Teachers and educators can",
    "use specific strategies to support children's social",
    'and emotional learning.',
  ]);

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
    pdfPath: 'assets/content/pdfs/qklg-principle-res_rels_poster.pdf',
  };

  protected readonly cards: DesignCard[] = [
    {
      title: 'Lorem Ipsum Dolor',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      url: '/learning-domains/social-and-emotional-learning/self-regulation',
      background: 'linear-gradient(135deg, #EA0B8C 0%, #A40862 100%)',
      hoverBorderColor: '#A40862',
      imageAlt: 'Self-Regulation icon - child managing emotions',
      imageSrc: 'assets/img/domain-social-emotional-learning-colour.png',
    },
    {
      title: 'Sed Do Eiusmod Tempor',
      description:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam.',
      url: '/learning-domains/social-and-emotional-learning/social-skills',
      background: 'linear-gradient(135deg, #EA0B8C 0%, #A40862 100%)',
      hoverBorderColor: '#A40862',
      imageAlt: 'Social Skills icon - children playing together',
      imageSrc: 'assets/img/domain-social-emotional-learning-colour.png',
    },
    {
      title: 'Ut Labore Et Dolore',
      description:
        'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores eos.',
      url: '/learning-domains/social-and-emotional-learning/emotional-awareness',
      background: 'linear-gradient(135deg, #EA0B8C 0%, #A40862 100%)',
      hoverBorderColor: '#A40862',
      imageAlt: 'Emotional Awareness icon - child expressing feelings',
      imageSrc: 'assets/img/domain-social-emotional-learning-colour.png',
    },
    {
      title: 'Consectetur Adipiscing',
      description:
        'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum delenit atque corrupti.',
      url: '/learning-domains/social-and-emotional-learning/relationship-building',
      background: 'linear-gradient(135deg, #EA0B8C 0%, #A40862 100%)',
      hoverBorderColor: '#A40862',
      imageAlt: 'Relationship Building icon - child hugging peer',
      imageSrc: 'assets/img/domain-social-emotional-learning-colour.png',
    },
    {
      title: 'Duis aute Irure',
      description:
        'Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere.',
      url: '/learning-domains/social-and-emotional-learning/social-understanding',
      background: 'linear-gradient(135deg, #EA0B8C 0%, #A40862 100%)',
      hoverBorderColor: '#A40862',
      imageAlt: 'Social Understanding icon - child in group setting',
      imageSrc: 'assets/img/domain-social-emotional-learning-colour.png',
    },
    {
      title: 'Voluptate Velit Esse',
      description:
        'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur vel illum.',
      url: '/learning-domains/social-and-emotional-learning/ut-labore-et-dolore',
      background: 'linear-gradient(135deg, #EA0B8C 0%, #A40862 100%)',
      hoverBorderColor: '#A40862',
      imageAlt: 'Confidence and Independence icon - child trying new activity',
      imageSrc: 'assets/img/domain-social-emotional-learning-colour.png',
    },
  ];
}
