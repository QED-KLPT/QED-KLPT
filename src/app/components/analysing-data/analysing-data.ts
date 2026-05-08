import { CommonModule, ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { YoutubePlayerModule } from '../shared/youtube-player/youtube-player.module';

type MockVideo = {
  title: string;
  description: string;
  youtubeUrl: string;
  transcript: string[];
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
          transcript: [
            'Educator: Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            'Narrator: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            'Educator: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
          ],
        },
        {
          title: 'A collaborative approach to observation and assessment',
          description:
            '',
          youtubeUrl: 'https://www.youtube.com/watch?v=t_TQXaHyjZM',
          transcript: [
            'Narrator: Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
            'Educator: Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.',
            'Narrator: Curabitur blandit tempus porttitor.',
          ],
        },
        {
          title: 'A strengths-based approach to observation and assessment',
          description:
            '',
          youtubeUrl: 'https://www.youtube.com/watch?v=Rg_Bk8mhsQI',
          transcript: [
            'Educator: Aenean lacinia bibendum nulla sed consectetur.',
            'Narrator: Integer posuere erat a ante venenatis dapibus posuere velit aliquet.',
            'Educator: Cras mattis consectetur purus sit amet fermentum.',
          ],
        },
      ],
    }   
  ];

  protected get videos(): MockVideo[] {
    return this.videoColumns.flatMap((column) => column.videos);
  }
}
