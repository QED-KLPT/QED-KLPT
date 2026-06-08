import { ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, computed, inject } from '@angular/core';
import { DomainAssetModeService } from '../../services/domain-asset-mode.service';
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
  imports: [DomainCard],
  templateUrl: './foundations.html',
  styleUrl: './foundations.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class Foundations implements OnInit {
  private readonly domainAssetMode = inject(DomainAssetModeService);

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
      description: 'Early childhood teachers and educators are keen observers of children’s play and participation in kindergarten programs. The intent and act of observing underpins the recording of meaningful data to provide insights into children’s learning, development and wellbeing through analysis and interpretation. ',
      url: '/klpt-foundations/conducting-and-documenting-quality-observations',
      imageAlt: 'Conducting and documenting quality observations illustration',
      imageName: 'conducting-documenting',
      background: 'linear-gradient(180deg, #fff7d8 0%, #dfc051 100%)',
      hoverBorderColor: '#b59a3f',
    },
    {
      title: 'Analysing and interpreting observational data',
      description: 'Observational data becomes meaningful through a process of analysis and interpretation. Analysis of observational data helps teachers and educators understand what children know and can do: their thinking, knowledge, skills, dispositions and preferences. Analysis is a specialised skill drawing on content knowledge, pedagogy knowledge and theoretical perspectives.   ',
      url: '/klpt-foundations/analysing-and-interpreting-observational-data',
      imageAlt: 'Analysing and interpreting observational data illustration',
      imageName: 'analysing-interpreting',
      background: 'linear-gradient(180deg, #eef2f8 0%, #b9c3d2 100%)',
      hoverBorderColor: '#7d879b',
    } 
  ];
}

