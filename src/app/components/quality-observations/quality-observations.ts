import { ViewportScroller } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { YoutubePlayerModule } from '../shared/youtube-player/youtube-player.module';
import { BreadcrumbComponent, BreadcrumbItem } from '../shared/breadcrumb';
import { DomainAssetModeService } from '../../services/domain-asset-mode.service';

@Component({
  selector: 'app-quality-observations',
  imports: [BreadcrumbComponent, YoutubePlayerModule],
  templateUrl: './quality-observations.html',
  styleUrl: './quality-observations.scss',
})
export class QualityObservations implements OnInit {
  protected readonly domainAssets = inject(DomainAssetModeService);
  protected readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'KLPT foundations', href: '/klpt-foundations' },
    { label: 'Conducting and documenting quality observations', current: true },
  ];
  
  observationTranscript: string = '';
  purposeOfObservationTranscript: string = '';
  deepDiveTranscript: string = '';

  constructor(
    private scroll: ViewportScroller,
    private http: HttpClient,
  ) {
    this.http.get('assets/content/transcripts/quality-observations/obs-assess-play.txt', { responseType: 'text' }).subscribe(t => this.observationTranscript = t);
    this.http.get('assets/content/transcripts/quality-observations/the-purpose-of-observation.txt', { responseType: 'text' }).subscribe(t => this.purposeOfObservationTranscript = t);
    this.http.get('assets/content/transcripts/quality-observations/the-purpose-of-observation.txt', { responseType: 'text' }).subscribe(t => this.deepDiveTranscript = t);
  }

  ngOnInit(): void {
    this.scroll.scrollToPosition([0, 0]);
  }
}
