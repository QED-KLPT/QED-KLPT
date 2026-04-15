import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-youtube-player',
  templateUrl: './youtube-player.component.html',
  styleUrls: ['./youtube-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YoutubePlayerComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() youtubeUrl: string = '';
  
  sanitizedUrl: SafeResourceUrl | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    if (this.youtubeUrl) {
      const videoId = this.extractVideoId(this.youtubeUrl);
      if (videoId) {
        this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://www.youtube.com/embed/${videoId}`
        );
      }
    }
  }

  private extractVideoId(url: string): string | null {
    const regExp = /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  }
}
