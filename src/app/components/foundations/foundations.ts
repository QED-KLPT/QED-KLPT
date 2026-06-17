import { ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, computed, inject } from '@angular/core';
import { DomainAssetModeService } from '../../services/domain-asset-mode.service';
import { BreadcrumbComponent, BreadcrumbItem } from '../shared/breadcrumb';
import { DomainCard } from '../shared/domain-card/domain-card';

type FoundationNavCard = {
  title: string;
  description: string;
  url: string;
  imageAlt: string;
  imageName: string;
  background: string;
  hoverBorderColor: string;
};

type ThemedFoundationNavCard = Omit<FoundationNavCard, 'imageName'> & {
  imageSrc: string;
  textColor: string;
};

const DARK_BLUE_CARD_BACKGROUND = 'var(--doe-color-primary)';

@Component({
  selector: 'app-foundations',
  imports: [BreadcrumbComponent, DomainCard],
  templateUrl: './foundations.html',
  styleUrl: './foundations.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class Foundations implements OnInit {
  private readonly domainAssetMode = inject(DomainAssetModeService);
  protected readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'KLPT foundations', current: true },
  ];

  constructor(private scroll: ViewportScroller) {}

  ngOnInit(): void {
    this.scroll.scrollToPosition([0, 0]);
  }

  protected readonly themedFoundations = computed<ThemedFoundationNavCard[]>(() => {
    const isDarkBlue = this.domainAssetMode.mode() === 'dark-blue';

    return this.foundations.map((foundation) => ({
      ...foundation,
      imageSrc: this.domainAssetMode.iconPath(foundation.imageName),
      background: isDarkBlue ? DARK_BLUE_CARD_BACKGROUND : foundation.background,
      hoverBorderColor: isDarkBlue ? DARK_BLUE_CARD_BACKGROUND : foundation.hoverBorderColor,
      textColor: isDarkBlue ? '#ffffff' : '',
    }));
  });

  protected readonly foundations: FoundationNavCard[] = [
    {
      title: 'Conducting and documenting quality observations',
      description: 'Engage with information about the diverse types and different purposes of observation in kindergarten contexts. Consider what to notice, how to document meaningful observations, and how quality observations can deepen insights into children’s learning to support responsive teaching practice.',
      url: '/klpt-foundations/conducting-and-documenting-quality-observations',
      imageAlt: 'Conducting and documenting quality observations illustration',
      imageName: 'conducting-documenting',
      background: 'linear-gradient(180deg, #fff7d8 0%, #dfc051 100%)',
      hoverBorderColor: '#b59a3f',
    },
    {
      title: 'Analysing and interpreting observational data',
      description: 'Explore information on how analysis and interpretation of observational data can support assessment and planning. Consider the importance of analysis in understanding children’s learning and informing responsive ‘where to next’ learning opportunities for individual children and groups.',
      url: '/klpt-foundations/analysing-and-interpreting-observational-data',
      imageAlt: 'Analysing and interpreting observational data illustration',
      imageName: 'analysing-interpreting',
      background: 'linear-gradient(180deg, #eef2f8 0%, #b9c3d2 100%)',
      hoverBorderColor: '#7d879b',
    } 
  ];
}

