import { ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { YoutubePlayerModule } from '../shared/youtube-player/youtube-player.module';

@Component({
  selector: 'app-quality-observations',
  imports: [YoutubePlayerModule],
  templateUrl: './quality-observations.html',
  styleUrl: './quality-observations.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QualityObservations implements OnInit {
  constructor(private scroll: ViewportScroller) {}

  ngOnInit(): void {
    this.scroll.scrollToPosition([0, 0]);
  }
}
