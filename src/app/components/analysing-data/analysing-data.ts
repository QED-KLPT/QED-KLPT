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
            '(EXCITED CHATTER) The Queensland Government is making kindy free.',
            'REPORTER: Lucy, Lucy, Lucy, Lucy, Lucy! Lucy, when will this start?',
            'From 2024. Which kindies? There\'s heaps of Queensland Government approved kindies.',
            'Why go to kindy? Kindy is fun, you make new friends and it helps you learn.',
            '-(ALL SHOUTING AND JOSTLING)',
            "-That's it's, folks. Time to clean-up now. (ALL CHATTER AND SHOUT)",
          ],
        },
        {
          title: 'A collaborative approach to observation and assessment',
          description:
            '',
          youtubeUrl: 'https://www.youtube.com/watch?v=t_TQXaHyjZM',
          transcript: [
            'For our little ones, kindy packs a lifetime of opportunities into every day.',
            'The things they learn at kindy, they take home and get them set for school and for life in the future.',
            'Important skills that last a lifetime.',
            'Talk to your local kindy or visit the website to find out more about enrolling for 2022.',
          ],
        },
        {
          title: 'A strengths-based approach to observation and assessment',
          description:
            '',
          youtubeUrl: 'https://www.youtube.com/watch?v=Rg_Bk8mhsQI',
          transcript: [
            '[Music] The activity that we did at group time this morning was around um we we\'re doing some work around reflection.',
            'We\'ve just set up a light studio and so I thought spoons would be an interesting activity for these children to do and a couple of children had bought spoons earlier this week.',
            'So by introducing objects that have similar characteristics, it\'s a really nice way to start doing some of that sorting into sets and noticing the attributes and then doing some counting to go with it.',
            'One of the things I deliberately do when we\'re doing those sorts of counting activities is I do it the wrong way because what that does is it really pushes the children to think, hang on, that\'s not how it works.',
            'So for them to start really thinking much more consciously about what are the rules about counting and it adds a sense of fun to it too.',
            'They really enjoy those activities.',
            'One of the strategies that we try to use is modeling appropriate ways of counting because it\'s actually a skill.',
            'So that by getting a child to actually touch and count the objects, it helps reinforce that kinesthetic tactile experience as they\'re actually saying the words.',
            'So that we use that as that is the way that we count.',
            'We touch and count.',
            'And by doing it together, we\'re just helping our friend to quantify the objects that we\'re trying to count.',
            'Spoons.',
            'But I\'ve got a spoon as well.',
            'No. Yeah. And not a shiny one. Not a shiny one.',
            'You\'re right. There are 13 shiny spoons. Wow.',
            'I wonder how many spoons are not shiny.',
            'How could we find out?',
            'Count. Count. Okay, let\'s count them.',
            'Leave them in the rest position.',
            'One 9 7 Put up your hand if you can tell me the problem.',
            'Have a think. There\'s a problem. What is the problem with how I\'m counting those spoons?',
            'Cross your legs, Justice.',
            'Have a think. Casey, what was the problem?',
            'You need to count like this.',
            'One, two, and then three, four, five, 6, 7, 8, 9.',
            'But I was touching each one. I was touching each one. No, hang on.',
            'Have a listen to Py. She\'s right. Go like this. One like.',
            'So, if I start over here with one, then what do I do next?',
            'Two. Two. What\'s next? Three. What\'s next? Help, Casey. Four. Five.',
            'So, what happens with children when we form these sets and we quantify how many objects are in each set.',
            'It\'s interesting for children to start comparing sets to see which are the larger sets and which are the smaller sets.',
            'And it\'s actually giving the children a way into doing that, the skills that they need, the strategies that they need to make those judgments about which set has more and which has less.',
            'Which is the biggest set?',
            'Um, those winner. Which one, Zoe? This one. Yeah. What are those ones? Shiny.',
            'The shiny ones are the ones that win at the moment. Isn\'t that clever?',
          ],
        },
      ],
    }   
  ];

  protected get videos(): MockVideo[] {
    return this.videoColumns.flatMap((column) => column.videos);
  }
}
