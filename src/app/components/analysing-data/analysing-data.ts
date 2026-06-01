import { CommonModule, ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { YoutubePlayerModule } from '../shared/youtube-player/youtube-player.module';
import { DomainAssetModeService } from '../../services/domain-asset-mode.service';

type MockVideo = {
  title: string;
  description: string;
  youtubeUrl: string;
};

type MockColumn = {
  heading: string;
  intro: string;
  videos: MockVideo[];
};

@Component({
  selector: 'app-analysing-data',
  imports: [CommonModule, YoutubePlayerModule],
  templateUrl: './analysing-data.html',
  styleUrl: './analysing-data.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalysingData implements OnInit {
  protected readonly domainAssets = inject(DomainAssetModeService);

  constructor(private scroll: ViewportScroller) {}

  ngOnInit(): void {
    this.scroll.scrollToPosition([0, 0]);
  }

  protected readonly videoColumns: MockColumn[] = [
    {
      heading: 'Observation snapshots',
      intro:
        '',
      videos: [
        {
          title: 'Observational data and the planning cycle ',
          description:
            '',
          youtubeUrl: 'https://www.youtube.com/watch?v=RCmiHUNHa8c',
        },
        {
          title: 'A collaborative approach to observation and assessment',
          description:
            '',
          youtubeUrl: 'https://www.youtube.com/watch?v=t_TQXaHyjZM',
        },
        {
          title: 'A strengths-based approach to observation and assessment',
          description:
            '',
          youtubeUrl: 'https://www.youtube.com/watch?v=Rg_Bk8mhsQI',
        },
      ],
    }   
  ];

  protected get videos(): MockVideo[] {
    return this.videoColumns.flatMap((column) => column.videos);
  }
}
