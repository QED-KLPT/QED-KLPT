import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-youtube-player',  
  templateUrl: './youtube-player.component.html',
  styleUrls: ['./youtube-player.component.scss'],
  standalone: false,
})
export class YoutubePlayerComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() youtubeUrl: string = '';
  @Input() transcript: string = '';

  sanitizedUrl: SafeResourceUrl | null = null;

  constructor(
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    if (this.youtubeUrl) {
      const videoId = this.extractVideoId(this.youtubeUrl);
      if (videoId) {
        this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://www.youtube.com/embed/${videoId}?cc_load_policy=1&hl=en`,
        );
      }
    }
  }

  ngOnChanges() {
    this.cdr.markForCheck();
  }

  get transcriptLines(): string[] {
    if (!this.transcript) return [];
    return this.transcript.split('\n').filter(line => line.trim());
  }

  private extractVideoId(url: string): string | null {
    const regExp =
      /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  }
}

