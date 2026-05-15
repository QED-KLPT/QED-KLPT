import { ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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

export class Foundations implements OnInit {
  constructor(private scroll: ViewportScroller) {}

  ngOnInit(): void {
    this.scroll.scrollToPosition([0, 0]);
  }

  protected readonly foundations: FoundationNavCard[] = [
    {
      title: 'Conducting and documenting quality observations',
      description: 'Early childhood teachers and educators are keen observers of children’s play and participation in kindergarten programs. The intent and act of observing underpins the recording of meaningful data to provide insights into children’s learning, development and wellbeing through analysis and interpretation. ',
      url: '/foundations/quality-observations',
      imageAlt: 'Quality observations icon',
      imageSrc: 'assets/img/foundations-quality-observations.svg',
      background: 'linear-gradient(180deg, #fff7d8 0%, #dfc051 100%)',
      hoverBorderColor: '#b59a3f',
    },
    {
      title: 'Analysing and interpreting observational data',
      description: 'Observational data becomes meaningful through a process of analysis and interpretation. Analysis of observational data helps teachers and educators understand what children know and can do: their thinking, knowledge, skills, dispositions and preferences. Analysis is a specialised skill drawing on content knowledge, pedagogy knowledge and theoretical perspectives.   ',
      url: '/foundations/analysing-data',
      imageAlt: 'Analysing data icon',
      imageSrc: 'assets/img/foundations-analysing-data.svg',
      background: 'linear-gradient(180deg, #eef2f8 0%, #b9c3d2 100%)',
      hoverBorderColor: '#7d879b',
    } 
  ];
}

