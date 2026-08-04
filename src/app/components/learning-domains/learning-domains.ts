import { ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, computed, inject } from '@angular/core';
import { DomainAssetModeService } from '../../services/domain-asset-mode.service';
import { BreadcrumbComponent, BreadcrumbItem } from '../shared/breadcrumb';
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
  imports: [BreadcrumbComponent, DomainCard],
  templateUrl: './learning-domains.html',
  styleUrl: './learning-domains.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LearningDomains implements OnInit {
  private readonly domainAssetMode = inject(DomainAssetModeService);
  protected readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Learning domains', current: true },
  ];

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
      description: 'Supports children to communicate, make meaning and connect with others through language, literacy and diverse forms of communication.',
      url: '/learning-domains/language-and-literacy',
      imageAlt: 'Language and literacy icon',
      imageName: 'language-literacy',
      background: 'linear-gradient(135deg, #7D3FD1 0%, #5B219F 100%)',
      hoverBorderColor: '#6F2DBD',
      blueBackground: '#003E96',
      blueHoverBorderColor: '#003E96',
    },
    {
      title: 'Executive function',
      description: 'Supports children to manage attention, adapt to change and work towards goals in learning and everyday experiences.',
      url: '/learning-domains/executive-function',
      imageAlt: 'Executive function icon',
      imageName: 'executive-function',
      background: 'linear-gradient(135deg, #2F7DE1 0%, #174EA6 100%)',
      hoverBorderColor: '#1D5FD1',
      blueBackground: '#005EB8',
      blueHoverBorderColor: '#005EB8',
    },
    {
      title: 'Social and emotional learning',
      description: 'Supports children to understand themselves and others, build relationships, and manage emotions.',
      url: '/learning-domains/social-and-emotional-learning',
      imageAlt: 'Social and emotional learning icon',
      imageName: 'social-emotional-learning',
      background: 'linear-gradient(135deg, #D72D6F 0%, #9F124B 100%)',
      hoverBorderColor: '#C2185B',
      blueBackground: '#0077C8',
      blueHoverBorderColor: '#0077C8',
    },
    {
      title: 'Physicality',
      description: 'Supports children to develop movement, coordination, body awareness and confidence.',
      url: '/learning-domains/physicality',
      imageAlt: 'Physicality icon',
      imageName: 'physicality',
      background: 'linear-gradient(135deg, #D96313 0%, #9E4100 100%)',
      hoverBorderColor: '#C45100',
      blueBackground: '#147EB2',
      blueHoverBorderColor: '#147EB2',
    },
    {
      title: 'Mathematics and numeracy',
      description: 'Supports children to understand and use numbers, patterns, measurement and spatial concepts.',
      url: '/learning-domains/mathematics-and-numeracy',
      imageAlt: 'Mathematics and numeracy icon',
      imageName: 'mathematics-numeracy',
      background: 'linear-gradient(135deg, #388E3C 0%, #246B27 100%)',
      hoverBorderColor: '#2E7D32',
      blueBackground: '#227FA5',
      blueHoverBorderColor: '#227FA5',
    },
  ];
}
