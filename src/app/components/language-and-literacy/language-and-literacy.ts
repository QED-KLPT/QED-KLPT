import { CommonModule, ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { YoutubePlayerModule } from '../shared/youtube-player/youtube-player.module';
import { BreadcrumbComponent, BreadcrumbItem } from '../shared/breadcrumb';
import { KlptVideoContentService, PageVideoColumn } from '../../services/klpt-video-content.service';
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

type ThemedDesignCard = DesignCard & {
  textColor: string;
};

const DARK_BLUE_CARD_BACKGROUND = '#003e96';

@Component({
  selector: 'app-language-and-literacy',
  imports: [CommonModule, RouterLink, BreadcrumbComponent, YoutubePlayerModule],
  templateUrl: './language-and-literacy.html',
  styleUrl: './language-and-literacy.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageAndLiteracy implements OnInit {
  protected readonly domainAssets = inject(DomainAssetModeService);
  protected readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Learning domains', href: '/learning-domains' },
    { label: 'Language and literacy', current: true },
  ];
  protected readonly videoColumns$: Observable<PageVideoColumn[]>;
  private klptTouchStart: { x: number; y: number } | undefined;

  constructor(
    private scroll: ViewportScroller,
    private readonly router: Router,
    private readonly videoContentService: KlptVideoContentService,
  ) {
    this.videoColumns$ = this.videoContentService.getPageColumns('language-and-literacy');
  }

  ngOnInit(): void {
    this.scroll.scrollToPosition([0, 0]);
  }

  protected captureKlptTouchStart(event: TouchEvent): void {
    const touch = event.changedTouches[0];

    this.klptTouchStart = touch ? { x: touch.clientX, y: touch.clientY } : undefined;
  }

  protected openKlptFromTouch(event: TouchEvent): void {
    const touch = event.changedTouches[0];
    const start = this.klptTouchStart;
    this.klptTouchStart = undefined;

    if (!touch || !start) {
      return;
    }

    const moved = Math.hypot(touch.clientX - start.x, touch.clientY - start.y);

    if (moved > 10) {
      return;
    }

    event.preventDefault();
    void this.router.navigateByUrl('/learning-observation-tool');
  }

  protected readonly practiceSupports = {
    pdfLabel: 'Download language and literacy practice support (PDF, 1.01 MB)',
    pdfPath: 'assets/content/pdfs/language-literacy-practice-support.pdf',
  };

  protected readonly themedCards = computed<ThemedDesignCard[]>(() => {
    const isDarkBlue = this.domainAssets.mode() === 'dark-blue';

    return this.cards.map((card) => ({
      ...card,
      background: isDarkBlue ? DARK_BLUE_CARD_BACKGROUND : card.background,
      hoverBorderColor: isDarkBlue ? DARK_BLUE_CARD_BACKGROUND : card.hoverBorderColor,
      textColor: isDarkBlue ? '#ffffff' : '',
    }));
  });

  private readonly cards: DesignCard[] = [
    {
      title: 'Sounds and speech',
      description:
        'how children build and organise language and how they show awareness of sounds in words',
      url: '',
      background: 'linear-gradient(135deg, #B85A12 0%, #8F4D12 100%)',
      hoverBorderColor: '#AC5E16',
      imageAlt: 'Sounds and speech',
      imageSrc: 'assets/img/lang-lit-sndspeech.svg',
    },  
    {
      title: 'Comprehension',
      description:
        'how children show they understand and create meaning',
      url: '',
      background: 'linear-gradient(135deg, #B85A12 0%, #8F4D12 100%)',
      hoverBorderColor: '#AC5E16',
      imageAlt: 'Comprehension',
      imageSrc: 'assets/img/lang-lit-comp.svg',
    }
  ];
}
