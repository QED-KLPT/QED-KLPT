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
  blueBackground: string;
  blueHoverBorderColor: string;
};

type ThemedDomainNavCard = Omit<DomainNavCard, 'imageName'> & {
  imageSrc: string;
  textColor: string;
};

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
      background: isDarkBlue ? domain.blueBackground : domain.background,
      hoverBorderColor: isDarkBlue ? domain.blueHoverBorderColor : domain.hoverBorderColor,
      textColor: isDarkBlue ? '#ffffff' : '',
    }));
  });

  private readonly domains: DomainNavCard[] = [
    {
      title: 'Language and literacy',
      description: 'Support vocabulary, phonological awareness, and early reading and writing skills.',
      url: '/learning-domains/language-and-literacy',
      imageAlt: 'Language and literacy icon',
      imageName: 'language-literacy',
      background: 'linear-gradient(135deg, #B85A12 0%, #8F4D12 100%)',
      hoverBorderColor: '#AC5E16',
      blueBackground: '#003E96',
      blueHoverBorderColor: '#003E96',
    },
    {
      title: 'Executive function',
      description: 'Develop working memory, attention, cognitive flexibility, and problem-solving skills.',
      url: '/learning-domains/executive-function',
      imageAlt: 'Executive function icon',
      imageName: 'executive-function',
      background: 'linear-gradient(135deg, #0069AB 0%, #004A78 100%)',
      hoverBorderColor: '#005387',
      blueBackground: '#005EB8',
      blueHoverBorderColor: '#005EB8',
    },
    {
      title: 'Social and emotional learning',
      description: 'Foster self-awareness, emotion regulation, empathy, and positive relationships.',
      url: '/learning-domains/social-and-emotional-learning',
      imageAlt: 'Social and emotional learning icon',
      imageName: 'social-emotional-learning',
      background: 'linear-gradient(135deg, #D10A7D 0%, #930758 100%)',
      hoverBorderColor: '#A40862',
      blueBackground: '#0077C8',
      blueHoverBorderColor: '#0077C8',
    },
    {
      title: 'Physicality',
      description: 'Enhance gross and fine motor skills, coordination, and physical confidence.',
      url: '/learning-domains/physicality',
      imageAlt: 'Physicality icon',
      imageName: 'physicality',
      background: 'linear-gradient(135deg, #247F33 0%, #185922 100%)',
      hoverBorderColor: '#1D682A',
      blueBackground: '#168AC4',
      blueHoverBorderColor: '#168AC4',
    },
    {
      title: 'Mathematics and numeracy',
      description: 'Build number sense, pattern recognition, spatial reasoning, and mathematical thinking.',
      url: '/learning-domains/mathematics-and-numeracy',
      imageAlt: 'Mathematics and numeracy icon',
      imageName: 'mathematics-numeracy',
      background: 'linear-gradient(135deg, #BA1C23 0%, #801318 100%)',
      hoverBorderColor: '#91161B',
      blueBackground: '#2A9DCC',
      blueHoverBorderColor: '#2A9DCC',
    },
  ];
}
