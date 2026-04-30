import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DomainCard } from '../shared/domain-card/domain-card';

type FoundationNavCard = {
  title: string;
  description: string;
  url: string;
  imageAlt: string;
  imageSrc: string;
  background: string;
  hoverBorderColor: string;
};

@Component({
  selector: 'app-foundations',
  imports: [DomainCard],
  templateUrl: './foundations.html',
  styleUrl: './foundations.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class Foundations {
  protected readonly foundations: FoundationNavCard[] = [
    {
      title: 'Conducting and documenting quality observations',
      description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      url: '/foundations/quality-observations',
      imageAlt: 'Quality observations icon',
      imageSrc: 'assets/img/foundations-quality-observations.svg',
      background: 'linear-gradient(180deg, #fffdf5 0%, #f2e3a7 100%)',
      hoverBorderColor: '#b59a3f',
    },
    {
      title: 'Analysing and interpreting observational data',
      description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      url: '/foundations/analysing-data',
      imageAlt: 'Analysing data icon',
      imageSrc: 'assets/img/foundations-analysing-data.svg',
      background: 'linear-gradient(180deg, #f7f8fb 0%, #d9dee8 100%)',
      hoverBorderColor: '#7d879b',
    } 
  ];
}

