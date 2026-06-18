import { ViewportScroller } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { BreadcrumbComponent, BreadcrumbItem } from '../shared/breadcrumb';
import { YoutubePlayerModule } from '../shared/youtube-player/youtube-player.module';
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
  selector: 'app-mathematics-and-numeracy',
  imports: [RouterLink, BreadcrumbComponent, YoutubePlayerModule],
  templateUrl: './mathematics-and-numeracy.html',
  styleUrl: './mathematics-and-numeracy.scss',
})
export class MathematicsAndNumeracy implements OnInit {
  protected readonly domainAssets = inject(DomainAssetModeService);
  protected readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Learning domains', href: '/learning-domains' },
    { label: 'Mathematics and numeracy', current: true },
  ];
  
  mathematicsAndNumeracyTranscript: string = '';

  constructor(
    private scroll: ViewportScroller,
    private http: HttpClient,
  ) {
    this.http.get('assets/content/transcripts/mathematics-and-numeracy/mathematics-and-numeracy.txt', { responseType: 'text' }).subscribe(t => this.mathematicsAndNumeracyTranscript = t);
  }

  ngOnInit(): void {
    this.scroll.scrollToPosition([0, 0]);
  }

  protected readonly practiceSupports = {
    pdfLabel: 'Download mathematics and numeracy practice support (PDF, 1.01 MB)',
    pdfPath: 'assets/content/pdfs/mathematics-numeracy-practice-support.pdf',
  };

  protected readonly cards: DesignCard[] = [
    {
      title: 'Lorem Ipsum Dolor',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      url: '/learning-domains/mathematics-and-numeracy/numbers',
      background: 'linear-gradient(135deg, #BA1C23 0%, #801318 100%)',
      hoverBorderColor: '#91161B',
      imageAlt: 'Numbers icon - counting numerals 1, 2, and 3',
      imageSrc: 'assets/img/mathematics-numeracy-numbers.svg',
    },
    {
      title: 'Ut enim Adipiscing',
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor.',
      url: '/learning-domains/mathematics-and-numeracy/quantity',
      background: 'linear-gradient(135deg, #BA1C23 0%, #801318 100%)',
      hoverBorderColor: '#91161B',
      imageAlt: 'Quantity icon - grouping and comparing collections of objects',
      imageSrc: 'assets/img/mathematics-numeracy-quantity.svg',
    },
    {
      title: 'Dui Sagittis Vestibulum',
      description:
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur Excepteur sint occaecat cupidatat.',
      url: '/learning-domains/mathematics-and-numeracy/concepts-of-time',
      background: 'linear-gradient(135deg, #BA1C23 0%, #801318 100%)',
      hoverBorderColor: '#91161B',
      imageAlt: 'Concepts of Time icon - clock showing time sequence',
      imageSrc: 'assets/img/math-num-conceptstime.svg',
    },
    {
      title: 'Proident Simulant',
      description:
        'Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum Sed ut perspiciatis unde.',
      url: '/learning-domains/mathematics-and-numeracy/length',
      background: 'linear-gradient(135deg, #BA1C23 0%, #801318 100%)',
      hoverBorderColor: '#91161B',
      imageAlt: 'Length icon - measuring objects with standard units',
      imageSrc: 'assets/img/mathematics-numeracy-length.svg',
    },
    {
      title: 'Nemo Enim Ipsam',
      description:
        'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
      url: '/learning-domains/mathematics-and-numeracy/distance',
      background: 'linear-gradient(135deg, #BA1C23 0%, #801318 100%)',
      hoverBorderColor: '#91161B',
      imageAlt: 'Distance icon - measuring how far objects travel',
      imageSrc: 'assets/img/mathematics-numeracy-distance.svg',
    },
    {
      title: 'At vero eos et Accusamus',
      description:
        'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas.' ,
      url: '/learning-domains/mathematics-and-numeracy/capacity',
      background: 'linear-gradient(135deg, #BA1C23 0%, #801318 100%)',
      hoverBorderColor: '#91161B',
      imageAlt: 'Capacity icon - measuring how much containers hold',
      imageSrc: 'assets/img/mathematics-numeracy-capacity.svg',
    },
    {
      title: 'Nam libero Tempore',
      description:
        'Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus omnis voluptas assumenda est.',
      url: '/learning-domains/mathematics-and-numeracy/area',
      background: 'linear-gradient(135deg, #BA1C23 0%, #801318 100%)',
      hoverBorderColor: '#91161B',
      imageAlt: 'Area icon - measuring surface space in square units',
      imageSrc: 'assets/img/mathematics-numeracy-area.svg',
    },
  ];
}
