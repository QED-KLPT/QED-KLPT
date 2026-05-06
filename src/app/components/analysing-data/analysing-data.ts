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
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at sapien non purus fermentum dignissim.',
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
            'Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui.',
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
            'Etiam porta sem malesuada magna mollis euismod. Maecenas faucibus mollis interdum.',
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
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.',
      videos: [
        {
          title: 'Analysing group participation',
          description:
            'Nullam quis risus eget urna mollis ornare vel eu leo. Vestibulum id ligula porta felis euismod semper.',
          youtubeUrl: 'https://www.youtube.com/watch?v=1BbO3pI1GVk',
          transcript: [
            'Narrator: Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            'Educator: Morbi leo risus, porta ac consectetur ac, vestibulum at eros.',
            'Narrator: Vestibulum id ligula porta felis euismod semper.',
          ],
        },
        {
          title: 'Using evidence in reflective conversations',
          description:
            'Donec ullamcorper nulla non metus auctor fringilla. Morbi leo risus, porta ac consectetur ac.',
          youtubeUrl: 'https://www.youtube.com/watch?v=XneIolMk42s',
          transcript: [
            'Educator: Donec sed odio dui. Cras justo odio, dapibus ac facilisis in.',
            'Narrator: Maecenas sed diam eget risus varius blandit sit amet non magna.',
            'Educator: Integer posuere erat a ante venenatis dapibus.',
          ],
        },
        {
          title: 'Turning insights into intentional teaching',
          description:
            'Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.',
          youtubeUrl: 'https://www.youtube.com/watch?v=oyQmlHPgKPE',
          transcript: [
            'Narrator: Sed posuere consectetur est at lobortis.',
            'Educator: Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            'Narrator: Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.',
          ],
        },
      ],
    },
  ];

  protected get videos(): MockVideo[] {
    return this.videoColumns.flatMap((column) => column.videos);
  }
}
