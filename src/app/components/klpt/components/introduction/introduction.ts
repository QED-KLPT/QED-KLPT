import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { YoutubePlayerModule } from '../../../shared/youtube-player/youtube-player.module';
import { ViewportScroller } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-introduction',
  imports: [RouterLink, YoutubePlayerModule],
  templateUrl: './introduction.html',
  styleUrl: './introduction.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Introduction implements OnInit {
  usingKlptTranscript: string = '';

  constructor(
    private scroll: ViewportScroller,
    private http: HttpClient,
  ) 
  {    
    this.http.get('assets/content/transcripts/home/introduction-to-the-klpt.txt', { responseType: 'text' }).subscribe(t => this.usingKlptTranscript = t);
  }

   ngOnInit(): void {
    this.scroll.scrollToPosition([0, 0]);
  }
  
}
