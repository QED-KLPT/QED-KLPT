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
  selector: 'app-physicality',
  imports: [RouterLink, BreadcrumbComponent, YoutubePlayerModule],
  templateUrl: './physicality.html',
  styleUrl: './physicality.scss',
})
export class Physicality implements OnInit {
  protected readonly domainAssets = inject(DomainAssetModeService);
  protected readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Learning domains', href: '/learning-domains' },
    { label: 'Physicality', current: true },
  ];
  
  physicalityTranscript: string = '';

  constructor(
    private scroll: ViewportScroller,
    private http: HttpClient,
  ) {
    this.http.get('assets/content/transcripts/physicality/physicality.txt', { responseType: 'text' }).subscribe(t => this.physicalityTranscript = t);
  }

  ngOnInit(): void {
    this.scroll.scrollToPosition([0, 0]);
  }

  protected readonly practiceSupports = {
    pdfLabel: 'Download physicality practice support (PDF, 1.01 MB)',
    pdfPath: 'assets/content/pdfs/physicality-practice-support.pdf',
  };

  protected readonly cards: DesignCard[] = [
    {
      title: 'Aenean Imperdiet',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      url: '/learning-domains/physicality/stable-movement',
      background: 'linear-gradient(135deg, #1c447e 0%, #132e5a 100%)',
      hoverBorderColor: '#1c447e',
      imageAlt: 'Child standing on one foot for balance',
      imageSrc: 'assets/img/phys-stablemove.svg',
    },
    {
      title: 'Praesent Elementum',
      description:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam.',
      url: '/learning-domains/physicality/environment-awareness',
      background: 'linear-gradient(135deg, #1c447e 0%, #132e5a 100%)',
      hoverBorderColor: '#1c447e',
      imageAlt: 'Child looking around curiously',
      imageSrc: 'assets/img/phys-envawareness.svg',
    },
    {
      title: 'Egestas Dui',
      description:
        'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores eos.',
      url: '/learning-domains/physicality/object-control',
      background: 'linear-gradient(135deg, #1c447e 0%, #132e5a 100%)',
      hoverBorderColor: '#1c447e',
      imageAlt: 'Child hitting a ball with a bat',
      imageSrc: 'assets/img/physicality-object-control.svg',
    },
    {
      title: 'Fusce Vestibulum',
      description:
        'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum delenit atque corrupti.',
      url: '/learning-domains/physicality/gross-motor',
      background: 'linear-gradient(135deg, #1c447e 0%, #132e5a 100%)',
      hoverBorderColor: '#1c447e',
      imageAlt: 'Child jumping with arms raised',
      imageSrc: 'assets/img/physicality-gross-motor.svg',
    },
    {
      title: 'Curabitur Pulletin',
      description:
        'Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere.',
      url: '/learning-domains/physicality/fine-motor',
      background: 'linear-gradient(135deg, #1c447e 0%, #132e5a 100%)',
      hoverBorderColor: '#1c447e',
      imageAlt: 'Child holding crayons to draw',
      imageSrc: 'assets/img/physicality-fine-motor.svg',
    },
    {
      title: 'Tempor Identique',
      description:
        'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur vel illum.',
      url: '/learning-domains/physicality/sensory-learning',
      background: 'linear-gradient(135deg, #1c447e 0%, #132e5a 100%)',
      hoverBorderColor: '#1c447e',
      imageAlt: 'Child touching different textured shapes',
      imageSrc: 'assets/img/phys-senslearn.svg',
    },
  ];
}
