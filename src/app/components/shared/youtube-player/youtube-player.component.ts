import { Component, Input, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
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
  showTranscript = false;

  @ViewChild('transcriptEl', { static: false }) transcriptEl!: ElementRef<HTMLDivElement>;

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

  toggleTranscript() {
    this.showTranscript = !this.showTranscript;
    if (this.showTranscript) {
      setTimeout(() => this.checkOverflow(), 300);
    } else {
      this.needsScrollbar = false;
    }
  }

  get transcriptLines(): string[] {
    if (!this.transcript) return [];
    return this.transcript.split('\n').filter(line => line.trim());
  }

  checkOverflow(): void {
    if (this.transcriptEl) {
      const el = this.transcriptEl.nativeElement;
      if (el.scrollHeight > el.clientHeight) {
        this.needsScrollbar = true;
        this.cdr.markForCheck();
      }
    }
  }

  private extractVideoId(url: string): string | null {
    const regExp =
      /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  }

  needsScrollbar = false;
}

