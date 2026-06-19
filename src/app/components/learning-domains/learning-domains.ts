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
  textColor?: string;
  linkColor?: string;
};

type ThemedDomainNavCard = Omit<DomainNavCard, 'imageName'> & {
  imageSrc: string;
  textColor: string;
  linkColor: string;
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
      textColor: domain.textColor || (isDarkBlue ? '#ffffff' : ''),
      linkColor: domain.linkColor || '',
    }));
  });

  private readonly domains: DomainNavCard[] = [
    {
      title: 'Language and literacy',
      description: 'Supports children to communicate, make meaning and connect with others through language, literacy and diverse forms of communication.',
      url: '/learning-domains/language-and-literacy',
      imageAlt: 'Language and literacy icon',
      imageName: 'language-literacy',
      background: 'linear-gradient(135deg, #679ed4 0%, #5089c0 100%)',
      hoverBorderColor: '#679ed4',
      blueBackground: '#679ed4',
      blueHoverBorderColor: '#679ed4',
      textColor: '#102548',
      linkColor: '#102548',
    },
    {
      title: 'Executive function',
      description: 'Supports children to manage attention, adapt to change and work towards goals in learning and everyday experiences.',
      url: '/learning-domains/executive-function',
      imageAlt: 'Executive function icon',
      imageName: 'executive-function',
      background: 'linear-gradient(135deg, #cddff0 0%, #b8d0e0 100%)',
      hoverBorderColor: '#cddff0',
      blueBackground: '#cddff0',
      blueHoverBorderColor: '#cddff0',
      textColor: '#102548',
      linkColor: '#102548',
    },
    {
      title: 'Social and emotional learning',
      description: 'Supports children to understand themselves and others, build relationships, and manage emotions.',
      url: '/learning-domains/social-and-emotional-learning',
      imageAlt: 'Social and emotional learning icon',
      imageName: 'social-emotional-learning',
      background: 'linear-gradient(135deg, #0063af 0%, #004a88 100%)',
      hoverBorderColor: '#0063af',
      blueBackground: '#0063af',
      blueHoverBorderColor: '#0063af',
    },
    {
      title: 'Physicality',
      description: 'Supports children to develop movement, coordination, body awareness and confidence.',
      url: '/learning-domains/physicality',
      imageAlt: 'Physicality icon',
      imageName: 'physicality',
      background: 'linear-gradient(135deg, #1c447e 0%, #132e5a 100%)',
      hoverBorderColor: '#1c447e',
      blueBackground: '#1c447e',
      blueHoverBorderColor: '#1c447e',
    },
    {
      title: 'Mathematics and numeracy',
      description: 'Supports children to understand and use numbers, patterns, measurement and spatial concepts.',
      url: '/learning-domains/mathematics-and-numeracy',
      imageAlt: 'Mathematics and numeracy icon',
      imageName: 'mathematics-numeracy',
      background: 'linear-gradient(135deg, #102548 0%, #0b1a34 100%)',
      hoverBorderColor: '#102548',
      blueBackground: '#102548',
      blueHoverBorderColor: '#102548',
    },
  ];
}
