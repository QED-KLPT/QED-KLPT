import { Component, Input, ElementRef, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

declare global {
  interface Window {
    Plyr: any;
    __plyrLoaded__: boolean;
  }
}

@Component({
  selector: 'app-plyr-player',
  templateUrl: './plyr-player.component.html',
  styleUrls: ['./plyr-player.component.scss'],
  standalone: false,
})
export class PlyrPlayerComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() youtubeUrl: string = '';
  @Input() transcript: string = '';

  private player: any = null;

  constructor(private elRef: ElementRef) {}

  ngOnInit() {
    if (!window.__plyrLoaded__) {
      window.__plyrLoaded__ = true;
      const s = document.createElement('script');
      s.src = '/plyr.js';
      document.head.appendChild(s);
    }
  }

  ngAfterViewInit() {
    if (!this.youtubeUrl) return;

    const container = this.elRef.nativeElement.querySelector('.plyr-video');
    if (!container) return;

    const init = () => {
      if (!window.Plyr) return false;
      this.player = new window.Plyr(container, {
        youtube: { noCookie: true, rel: 0 },
        iconUrl: '/plyr.svg',
      });
      return true;
    };

    if (init()) return;

    const check = setInterval(() => { if (init()) clearInterval(check); }, 100);
    setTimeout(() => clearInterval(check), 10000);
  }

  ngOnDestroy() {
    try { this.player?.destroy(); } catch { /* ignore */ }
  }

  get transcriptLines(): string[] {
    if (!this.transcript) return [];
    return this.transcript.split('\n').filter(line => line.trim());
  }

  protected extractVideoId(url: string): string | null {
    const regExp = /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  }
}
