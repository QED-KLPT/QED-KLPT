import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QldAccordionItemComponent } from '../shared/qld-accordion-item/qld-accordion-item.component';

type PracticeSupportSection = {
  id: string;
  title: string;
  summary: string;
  reflection: string[];
  pdfLabel: string;
  accordionItems: {
    title: string;
    body: string[];
  }[];
};

@Component({
  selector: 'app-practice-supports',
  imports: [RouterLink, QldAccordionItemComponent],
  templateUrl: './practice-supports.html',
  styleUrl: './practice-supports.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PracticeSupports {
  protected readonly sections: PracticeSupportSection[] = [
    {
      id: 'professional-reflection',
      title: 'Professional reflection',
      summary:
        'Use the learning progression statement and reflection prompts to consider what the observation data suggests, what has been noticed over time, and which supports are likely to have the strongest impact next.',
      reflection: [
        'What strengths is the child already showing in this area, and what evidence have you collected across different contexts?',
        'What patterns, barriers, or conditions might be influencing the child’s progress at the moment?',
        'Which adjustments, intentional teaching strategies, or environmental supports could help the child take the next step?',
      ],
      pdfLabel: 'Download professional reflection prompts (PDF)',
      accordionItems: [
        {
          title: 'Using the reflection prompts',
          body: [
            'Use the prompts as a planning conversation starter with colleagues, or as a quick reflective check before adjusting the environment, routines, or teaching approach.',
            'The prompts are designed to support professional judgement rather than prescribe a single response.',
          ],
        },
      ],
    },
    {
      id: 'language-and-literacy',
      title: 'Language and literacy',
      summary:
        'Practice supports for language and literacy can help teams strengthen communication-rich environments, shared reading routines, and responsive interactions that invite children to experiment with speaking, listening, reading, and mark making.',
      reflection: [
        'Consider what the child is communicating already and how those strengths can be extended through everyday interactions.',
      ],
      pdfLabel: 'Download language and literacy practice supports (PDF)',
      accordionItems: [
        {
          title: 'Intentional teaching strategies',
          body: [
            'Model rich oral language, extend children’s ideas during conversations, and use repeated story experiences to build comprehension and vocabulary.',
            'Offer visual supports, songs, predictable routines, and opportunities for children to revisit new words in meaningful contexts.',
          ],
        },
        {
          title: 'Learning experiences',
          body: [
            'Create inviting spaces for storytelling, role play, book browsing, drawing, and shared writing so children can explore language in different ways.',
            'Plan playful experiences that connect language to movement, music, dramatic play, and children’s interests.',
          ],
        },
      ],
    },
    {
      id: 'executive-function',
      title: 'Executive function',
      summary:
        'These supports focus on helping children build attention, working memory, self-regulation, and flexible thinking through predictable routines and intentional scaffolding.',
      reflection: [
        'Think about when the child is most regulated and ready to learn, and what environmental cues or adult supports help that happen.',
      ],
      pdfLabel: 'Download executive function practice supports (PDF)',
      accordionItems: [
        {
          title: 'Intentional teaching strategies',
          body: [
            'Break tasks into manageable steps, use visual schedules, and narrate strategies that help children remember, pause, and persist.',
            'Provide co-regulation through warm, consistent responses and clear expectations during transitions and group experiences.',
          ],
        },
        {
          title: 'Learning experiences',
          body: [
            'Plan games that involve turn taking, remembering instructions, sorting, patterning, and adapting to small rule changes.',
            'Use routines such as pack-up time, shared projects, and collaborative problem solving as opportunities to practise planning and flexibility.',
          ],
        },
      ],
    },
    {
      id: 'social-and-emotional-learning',
      title: 'Social and emotional learning',
      summary:
        'Support children to recognise feelings, build relationships, and participate with growing confidence through responsive interactions and safe, predictable routines.',
      reflection: [
        'Notice how the child communicates emotions, seeks support, and responds to peers in different parts of the day.',
      ],
      pdfLabel: 'Download social and emotional learning practice supports (PDF)',
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
    },
    {
      id: 'physicality',
      title: 'Physicality',
      summary:
        'Practice supports in physicality can help educators strengthen coordination, confidence, sensory regulation, and participation across indoor and outdoor experiences.',
      reflection: [
        'Think about how the environment, materials, and routines either support or limit the child’s movement and participation.',
      ],
      pdfLabel: 'Download physicality practice supports (PDF)',
      accordionItems: [
        {
          title: 'Intentional teaching strategies',
          body: [
            'Model safe movement, provide graduated levels of challenge, and give children time to practise skills repeatedly in playful contexts.',
            'Use verbal cues, demonstrations, and physical set-ups that help children understand how to organise their bodies and actions.',
          ],
        },
        {
          title: 'Learning experiences',
          body: [
            'Plan obstacle courses, fine-motor stations, sensory exploration, and outdoor play experiences that support strength, coordination, and body awareness.',
            'Offer tools and materials that can be adapted to suit different confidence levels and developmental needs.',
          ],
        },
      ],
    },
    {
      id: 'mathematics-and-numeracy',
      title: 'Mathematics and numeracy',
      summary:
        'These supports invite children to explore number, pattern, measurement, spatial reasoning, and problem solving through purposeful play and everyday routines.',
      reflection: [
        'Look for the mathematical thinking already present in the child’s play, language, and decision making.',
      ],
      pdfLabel: 'Download mathematics and numeracy practice supports (PDF)',
      accordionItems: [
        {
          title: 'Intentional teaching strategies',
          body: [
            'Use mathematical language naturally during play, model curiosity, and pose questions that encourage children to compare, estimate, count, and explain their thinking.',
            'Link mathematics to meaningful contexts such as cooking, construction, collecting, sorting, and movement.',
          ],
        },
        {
          title: 'Learning experiences',
          body: [
            'Create opportunities for building, pattern making, measuring, ordering, mapping, and representing quantities with real materials.',
            'Revisit key concepts across routines and play so children can notice relationships and apply ideas in new settings.',
          ],
        },
      ],
    },
  ];
}
