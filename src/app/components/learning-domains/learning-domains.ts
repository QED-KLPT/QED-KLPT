import { ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, computed, inject } from '@angular/core';
import { DomainAssetModeService } from '../../services/domain-asset-mode.service';
import { DomainCard } from '../shared/domain-card/domain-card';

type DomainNavCard = {
  title: string;
  description: string;
  url: string;
  imageAlt: string;
  imageName: string;
  background: string;
  hoverBorderColor: string;
};

type ThemedDomainNavCard = Omit<DomainNavCard, 'imageName'> & {
  imageSrc: string;
  textColor: string;
};

const DARK_BLUE_CARD_BACKGROUND = '#003e96';

@Component({
  selector: 'app-learning-domains',
  imports: [DomainCard],
  templateUrl: './learning-domains.html',
  styleUrl: './learning-domains.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LearningDomains implements OnInit {
  private readonly domainAssetMode = inject(DomainAssetModeService);

  constructor(private scroll: ViewportScroller) {}

  ngOnInit(): void {
    this.scroll.scrollToPosition([0, 0]);
  }

  protected readonly themedDomains = computed<ThemedDomainNavCard[]>(() => {
    const isDarkBlue = this.domainAssetMode.mode() === 'dark-blue';

    return this.domains.map((domain) => ({
      ...domain,
      imageSrc: this.domainAssetMode.iconPath(domain.imageName),
      background: isDarkBlue ? DARK_BLUE_CARD_BACKGROUND : domain.background,
      hoverBorderColor: isDarkBlue ? DARK_BLUE_CARD_BACKGROUND : domain.hoverBorderColor,
      textColor: isDarkBlue ? '#ffffff' : '',
    }));
  });

  private readonly domains: DomainNavCard[] = [
    {
      title: 'Language and Literacy',
      description: 'Support vocabulary, phonological awareness, and early reading and writing skills.',
      url: '/learning-domains/language-and-literacy',
      imageAlt: 'Language and Literacy icon',
      imageName: 'language-literacy',
      background: 'linear-gradient(135deg, #B85A12 0%, #8F4D12 100%)',
      hoverBorderColor: '#AC5E16',
    },
    {
      title: 'Executive Function',
      description: 'Develop working memory, attention, cognitive flexibility, and problem-solving skills.',
      url: '/learning-domains/executive-function',
      imageAlt: 'Executive Function icon',
      imageName: 'executive-function',
      background: 'linear-gradient(135deg, #0069AB 0%, #004A78 100%)',
      hoverBorderColor: '#005387',
    },
    {
      title: 'Social-Emotional Learning',
      description: 'Foster self-awareness, emotion regulation, empathy, and positive relationships.',
      url: '/learning-domains/social-and-emotional-learning',
      imageAlt: 'Social-Emotional Learning icon',
      imageName: 'social-emotional-learning',
      background: 'linear-gradient(135deg, #D10A7D 0%, #930758 100%)',
      hoverBorderColor: '#A40862',
    },
    {
      title: 'Physicality',
      description: 'Enhance gross and fine motor skills, coordination, and physical confidence.',
      url: '/learning-domains/physicality',
      imageAlt: 'Physicality icon',
      imageName: 'physicality',
      background: 'linear-gradient(135deg, #247F33 0%, #185922 100%)',
      hoverBorderColor: '#1D682A',
    },
    {
      title: 'Mathematics and Numeracy',
      description: 'Build number sense, pattern recognition, spatial reasoning, and mathematical thinking.',
      url: '/learning-domains/mathematics-and-numeracy',
      imageAlt: 'Mathematics and Numeracy icon',
      imageName: 'mathematics-numeracy',
      background: 'linear-gradient(135deg, #BA1C23 0%, #801318 100%)',
      hoverBorderColor: '#91161B',
    },
  ];
}
