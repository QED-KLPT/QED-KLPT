import { ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AccordionItemComponent } from '../shared/accordion-item/accordion-item.component';
import { DomainCard } from '../shared/domain-card/domain-card';
import { YoutubePlayerModule } from '../shared/youtube-player/youtube-player.module';
import { joinWrappedLines } from '../../shared/helpers/join-wrapped-lines';
import { DomainAssetModeService } from '../../services/domain-asset-mode.service';

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
  imports: [DomainCard, RouterLink, AccordionItemComponent, YoutubePlayerModule],
  templateUrl: './executive-function.html',
  styleUrl: './executive-function.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExecutiveFunction implements OnInit {
  protected readonly domainAssets = inject(DomainAssetModeService);

  constructor(private scroll: ViewportScroller) {}

  ngOnInit(): void {
    this.scroll.scrollToPosition([0, 0]);
  }

  protected readonly executiveFunctionTranscript: string[] = joinWrappedLines([
    '- Executive function is defined in the Early Years Learning',
    'Framework Version 2 as the mental processes in the brain that enable children to plan, focus, attention, remember instructions and manage multiple tasks successfully. These processes develop',
    'during early childhood and include working',
    'memory, inhibitory control, and cognitive flexibility. Working memory helps us hold and process information in our minds. Inhibitory control allows',
    'us to stop impulses and display appropriate responses. Cognitive flexibility allows the brain to switch attention from',
    'one task to another. Executive function skills',
    'develop during early years, strengthening each other and forming the basis for',
    'various abilities and behaviours. They help with advanced',
    'thinking, like planning, problem solving, and setting goals, and encourage a lifelong learning mindset. They are linked to self-regulation, helping children manage',
    'emotions, actions, and wellbeing. Executive function is',
    'not directly observable or readily visible to an external observer because it involves',
    'internal cognitive processes and mental skills. Because these skills',
    'occur at a neural level and are not easily seen',
    'by looking at a child, we can infer the functioning through a child\'s behaviour and actions. Executive function can be categorised into the following observable skills, persistence, adaptability,',
    'and problem solving. Let\'s look first at persistence.',
    'Persistence can be observed to demonstrate inhibitory control. Persistence means a child',
    'keeps trying even when things get challenging. It\'s about completing non-preferred tasks before moving on to more engaging ones.',
    'It also means ignoring distractions and focusing on the task at hand. Adaptability can be observed',
    'when children demonstrate cognitive flexibility. Adaptability means a child',
    'can change their response to unexpected events. It\'s about learning new',
    'information, making a decision, and being able to think and',
    'respond to changes in routines. Finally, problem solving.',
    'This can be observed',
    'when children demonstrate components of working memory. Problem solving is when',
    'a child develops ideas, tests them out and evaluates outcomes to see if they have been successful.',
    'It includes breaking',
    'tasks into smaller parts, thinking in order and drawing from what they already know.',
    'Supporting children to find strategies that yield success helps them to develop their problem solving skills.',
    'Teachers and educators can support the development of executive functioning by helping children persevere,',
    'deal with change and problem solve through intentional teaching strategies, and by gradually increasing',
    'the challenge of tasks while providing support and encouragement.',
  ]);

  protected readonly practiceSupports: { title: string; summary: string; reflection: string[]; accordionItems: { title: string; body: string[] }[]; pdfLabel: string; pdfPath: string } = {
    title: 'Executive function',
    summary: 'These supports focus on helping children build attention, working memory, self-regulation, and flexible thinking through predictable routines and intentional scaffolding.',
    reflection: [
      'Think about when the child is most regulated and ready to learn, and what environmental cues or adult supports help that happen.',
    ],
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
    pdfLabel: 'Download executive function practice supports (PDF)',
    pdfPath: 'assets/content/pdfs/26.04.406 K-2 KLPT Executive Function Practice Support_V4.pdf',
  };

  protected readonly cards: DesignCard[] = [
    {
      title: 'Persistence',
      description:
        'Staying on task, trying again after challenges and completing activities',
      url: '',
      background: 'linear-gradient(135deg, #0069AB 0%, #004A78 100%)',
      hoverBorderColor: '#005387',
      imageAlt: 'Persistence',
      imageSrc: 'assets/img/executive-function-inhibitory-control.svg',
    },
    {
      title: 'Adaptability',
      description:
        'Adjusting when routies change, responding to new information and staying calm under uncertainty',
      url: '',
      background: 'linear-gradient(135deg, #0069AB 0%, #004A78 100%)',
      hoverBorderColor: '#005387',
      imageAlt: 'Adaptability',
      imageSrc: 'assets/img/executive-function-working-memory.svg',
    },
    {
      title: 'Problem solving',
      description:
        'Exploring ideas, testing strategies and reflecting on what works',
      url: '',
      background: 'linear-gradient(135deg, #0069AB 0%, #004A78 100%)',
      hoverBorderColor: '#005387',
      imageAlt: 'Problem solving',
      imageSrc: 'assets/img/executive-function-cognitive-flexibility.svg',
    },
  ];
}
