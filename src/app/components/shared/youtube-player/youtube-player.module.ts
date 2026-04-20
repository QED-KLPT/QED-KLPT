import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YoutubePlayerComponent } from './youtube-player.component';
import { TranscriptComponent } from '../transcript/transcript.component';

@NgModule({
  declarations: [    
    YoutubePlayerComponent,
    TranscriptComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    YoutubePlayerComponent
  ]
})
export class YoutubePlayerModule { }
