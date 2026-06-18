import { CommonModule, ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { YoutubePlayerModule } from '../shared/youtube-player/youtube-player.module';
import { BreadcrumbComponent, BreadcrumbItem } from '../shared/breadcrumb';
import { DomainAssetModeService } from '../../services/domain-asset-mode.service';
import { KlptVideoContentService, PageVideoColumn } from '../../services/klpt-video-content.service';

@Component({
  selector: 'app-quality-observations',
  imports: [CommonModule, BreadcrumbComponent, YoutubePlayerModule],
  templateUrl: './quality-observations.html',
  styleUrl: './quality-observations.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QualityObservations implements OnInit {
  protected readonly domainAssets = inject(DomainAssetModeService);
  protected readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'KLPT foundations', href: '/klpt-foundations' },
    { label: 'Conducting and documenting quality observations', current: true },
  ];
  protected readonly videoColumns$: Observable<PageVideoColumn[]>;
  private klptTouchStart: { x: number; y: number } | undefined;
  
  constructor(
    private scroll: ViewportScroller,
    private readonly router: Router,
    private readonly videoContentService: KlptVideoContentService,
  ) {
    this.videoColumns$ = this.videoContentService.getPageColumns('quality-observations');
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
}
