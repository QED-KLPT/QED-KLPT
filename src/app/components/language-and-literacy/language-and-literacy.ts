import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { YoutubePlayerModule } from '../shared/youtube-player/youtube-player.module';

type Video = {
  title: string;
  description: string;
  youtubeUrl: string;
  transcript: string[];
};

type Column = {
  heading: string;
  intro: string;
  videos: Video[];
};

@Component({
  selector: 'app-language-and-literacy',
  imports: [CommonModule, YoutubePlayerModule],
  templateUrl: './language-and-literacy.html',
  styleUrl: './language-and-literacy.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageAndLiteracy {
    protected readonly videoColumns: Column[] = [
    {
      heading: 'Home Languages',
      intro:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vehicula, nibh vel sagittis hendrerit, lectus turpis volutpat nisl, et volutpat est erat non purus.',
      videos: [
        {
          title: 'KLPT-home languages',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at sapien non purus fermentum dignissim.',
          youtubeUrl: 'https://www.youtube.com/watch?v=XneIolMk42s',
          transcript: [
            'Educator: Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            'Narrator: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            'Educator: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
          ]
        }        
      ]
    },
    {
      heading: 'Language and Literacy',
      intro:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.',
      videos: [
        {
          title: 'KLPT-learning areas',
          description:
            'Nullam quis risus eget urna mollis ornare vel eu leo. Vestibulum id ligula porta felis euismod semper.',
          youtubeUrl: 'https://www.youtube.com/watch?v=oyQmlHPgKPE',
          transcript: [
            'Narrator: Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            'Educator: Morbi leo risus, porta ac consectetur ac, vestibulum at eros.',
            'Narrator: Vestibulum id ligula porta felis euismod semper.',
          ]
        }
      ]
    }
  ];
}
