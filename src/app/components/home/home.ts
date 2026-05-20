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

  protected readonly acknowledgementOfCountryTranscript: string[] = [
    '- When the children first come into the kindergarten, it\'s about getting to build those relationships.',
    'Then we set up a template that we got off the Queensland Kindergarten Guidelines, and it\'s called a Summative Report.',
    'So we take information that we\'ve observed and we put this into the Summative Report.',
    'We do an education support plan with the families. Every child has a goal.',
    '- I was actually here on the very first day of the year, and all of the educators took time to talk to each individual child and ask them questions about their family, about their favourite foods, just general questions about them, and that was the start of',
    'insights into changes or transformations they might be able to make to the environment, and to their teaching strategies to positively impact on children\'s learning.',
    '- So a lot of our learning or assessment is through play. For instance, with the zoo, we talked about how people pay to go into the zoo.',
    'So they drew signs, so not only did they set up the zoo, they actually went to the drawing table and used their skills of drawing, also, literacy, numeracy, "How much is it going to cost? "What are we going to',
    'we do through that play.',
    '- This team are continually documenting formative assessment in a variety of ways on an online platform, they might write learning stories, they might just add a caption to a photo, or they might use the children\'s own words.',
    'And over time, this builds a really rich and authentic picture of that individual child, what they know, what they understand, and what they can do, and this builds the foundation for assessing their learning and planning for future learning.',
    'All educators are lifelong',
    'skills and their knowledge. So careful critical reflection and assessment, supports them to do that.',
    'And when a program is based on planning cycles and critical reflection, the joy and well-being that comes from seeing children loving learning is really supportive for everyone.',
    'The Kindergarten Learning Progressions is a resource, which along with curriculum documents, and quality improvement plans, supports educators in every aspect of the planning cycle to ensure quality pedagogy.',
    '- The Kindergarten Learning Progressions are a way for educators to gather information and monitor children\'s learning and development, whilst the children stay engaged in their play and their learning.',
    'The Progressions also align with the Early Years Learning Framework Version 2, and the Queensland Kindergarten Learning Guideline.',
    '- It informs planning, assessing, and their critical evaluation.',
    '- As an educator, when you observe children and document what they know, can do, and understand, you can use that information to inform planning and set individual learning goals for children.',
  ];

  protected readonly domains: DomainSummary[] = [
    {
      title: 'Language and literacy',
      description: 'Support vocabulary, phonological awareness, and early reading and writing skills.',
      url: '/learning-domains/language-and-literacy',
      imageSrc: 'assets/img/domain-language-literacy-colour.png',
      imageAlt: 'Language and Literacy illustration',
      background: 'linear-gradient(135deg, #F6861F 0%, #AC5E16 100%)',
      hoverBorderColor: '#AC5E16',
    },
    {
      title: 'Executive function',
      description: 'Develop working memory, attention, cognitive flexibility, and problem-solving skills.',
      url: '/learning-domains/executive-function',
      imageSrc: 'assets/img/domain-executive-function-colour.png',
      imageAlt: 'Executive Function illustration',
      background: 'linear-gradient(135deg, #0077C1 0%, #005387 100%)',
      hoverBorderColor: '#005387',
    },
    {
      title: 'Social-emotional learning',
      description: 'Foster self-awareness, emotion regulation, empathy, and positive relationships.',
      url: '/learning-domains/social-and-emotional-learning',
      imageSrc: 'assets/img/domain-social-emotional-learning-colour.png',
      imageAlt: 'Social-Emotional Learning illustration',
      background: 'linear-gradient(135deg, #EA0B8C 0%, #A40862 100%)',
      hoverBorderColor: '#A40862',
    },
    {
      title: 'Physicality',
      description: 'Enhance gross and fine motor skills, coordination, and physical confidence.',
      url: '/learning-domains/physicality',
      imageSrc: 'assets/img/domain-physicality-colour.png',
      imageAlt: 'Physicality illustration',
      background: 'linear-gradient(135deg, #2A953C 0%, #1D682A 100%)',
      hoverBorderColor: '#1D682A',
    },
    {
      title: 'Mathematics and numeracy',
      description: 'Build number sense, pattern recognition, spatial reasoning, and mathematical thinking.',
      url: '/learning-domains/mathematics-and-numeracy',
      imageSrc: 'assets/img/domain-mathematics-numeracy-colour.png',
      imageAlt: 'Mathematics and Numeracy illustration',
      background: 'linear-gradient(135deg, #CF2027 0%, #91161B 100%)',
      hoverBorderColor: '#91161B',
    },
  ];
}
