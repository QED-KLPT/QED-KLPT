import { CommonModule, ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { YoutubePlayerModule } from '../shared/youtube-player/youtube-player.module';
import { DomainAssetModeService } from '../../services/domain-asset-mode.service';

type MockVideo = {
  title: string;
  description: string;
  youtubeUrl: string;
  transcript: string;
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

  constructor(
    private scroll: ViewportScroller,
    private http: HttpClient,
  ) {
    this.loadTranscripts();
  }

  private loadTranscripts() {
    const videoData = [
      { title: 'Observational data and the planning cycle ', url: 'https://www.youtube.com/watch?v=RCmiHUNHa8c', transcriptFile: 'assets/content/transcripts/analysing-data/observation-snapshots-patterns.txt' },
      { title: 'A collaborative approach to observation and assessment', url: 'https://www.youtube.com/watch?v=t_TQXaHyjZM', transcriptFile: 'assets/content/transcripts/analysing-data/observation-snapshots-notes.txt' },
      { title: 'A strengths-based approach to observation and assessment', url: 'https://www.youtube.com/watch?v=Rg_Bk8mhsQI', transcriptFile: 'assets/content/transcripts/analysing-data/observation-snapshots-trends.txt' },
    ];

    videoData.forEach((video) => {
      this.http.get(video.transcriptFile, { responseType: 'text' }).subscribe(t => {
        const col = this.videoColumns[0];
        const v = col.videos.find(v => v.title === video.title);
        if (v) v.transcript = t;
      });
    });
  }

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
          transcript: '',
        },
        {
          title: 'A collaborative approach to observation and assessment',
          description:
            '',
          youtubeUrl: 'https://www.youtube.com/watch?v=t_TQXaHyjZM',
          transcript: '',
        },
        {
          title: 'A strengths-based approach to observation and assessment',
          description:
            '',
          youtubeUrl: 'https://www.youtube.com/watch?v=Rg_Bk8mhsQI',
          transcript: '',
        },
      ],
    }   
  ];

  protected get videos(): MockVideo[] {
    return this.videoColumns.flatMap((column) => column.videos);
  }
}
