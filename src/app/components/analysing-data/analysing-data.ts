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
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vehicula, nibh vel sagittis hendrerit, lectus turpis volutpat nisl, et volutpat est erat non purus.',
      videos: [
        {
          title: 'Pattern spotting in everyday routines',
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
          title: 'Connecting notes to next steps',
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
          title: 'Interpreting trends across the week',
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
    },
    {
      heading: 'Planning responses',
      intro:
        '',
      videos: [
        {
          title: 'Analysing group participation',
          description:
            '',
          youtubeUrl: 'https://www.youtube.com/watch?v=1BbO3pI1GVk',
          transcript: [
            'Narrator: Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            'Educator: Morbi leo risus, porta ac consectetur ac, vestibulum at eros.',
            'Narrator: Vestibulum id ligula porta felis euismod semper.',
          ],
        }
      ],
    },
  ];

  protected get videos(): MockVideo[] {
    return this.videoColumns.flatMap((column) => column.videos);
  }
}
