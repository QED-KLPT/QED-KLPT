import { Component, Input, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

@Component({
  selector: 'app-youtube-player',  
  templateUrl: './youtube-player.component.html',
  styleUrls: ['./youtube-player.component.scss'],
  standalone: false,
})
export class YoutubePlayerComponent implements OnInit, OnDestroy {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() youtubeUrl: string = '';
  @Input() transcript: string = '';
  @Input() subtitles: boolean = true;

  sanitizedUrl: SafeResourceUrl | null = null;
  private player: any = null;
  private pollInterval: ReturnType<typeof setInterval> | null = null;

  constructor(
    private sanitizer: DomSanitizer,
    private elRef: ElementRef,
  ) {}

  ngOnInit() {
    if (!this.youtubeUrl) return;

    const videoId = this.extractVideoId(this.youtubeUrl);
    if (!videoId) return;

    if (this.subtitles === false) {
      // API player will be initialized in ngAfterViewInit (needs DOM ref)
    } else {
      const params = new URLSearchParams({ hl: 'en' });
      if (this.subtitles) {
        params.set('cc_load_policy', '1');
      }
      this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${videoId}?${params.toString()}`,
      );
    }
  }

  ngAfterViewInit() {
    if (this.subtitles === false && this.youtubeUrl) {
      const videoId = this.extractVideoId(this.youtubeUrl);
      if (videoId) {
        this.initApiPlayer(videoId);
      }
    }
  }

  private initApiPlayer(videoId: string) {
    // If API already loaded, create player immediately
    if (window.YT && window.YT.Player) {
      this.createPlayer(videoId);
      return;
    }

    // Load YouTube IFrame API script
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // Queue callback — handle multiple components loading simultaneously
    const queueKey = '__ytQueue';
    (window as any)[queueKey] = (window as any)[queueKey] || [];
    (window as any)[queueKey].push(() => this.createPlayer(videoId));

    const existingReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      existingReady?.();
      while ((window as any)[queueKey].length > 0) {
        (window as any)[queueKey].shift()();
      }
    };
  }

  private createPlayer(videoId: string) {
    const container = this.elRef.nativeElement.querySelector('.yt-api-player');
    if (!container || !window.YT?.Player) return;

    this.player = new window.YT.Player(container, {
      videoId,
      playerVars: {
        cc_load_policy: 0,
        modestbranding: 1,
        rel: 0,
      },
      events: {
        onReady: (event: any) => this.forceCaptionsOff(event.target),
        onStateChange: (event: any) => {
          // User interacted — force captions off again
          if (event.target?.getCaptionsTrack) {
            this.forceCaptionsOff(event.target);
          }
        },
      },
    });

    // Safety net: poll for caption state changes
    this.pollInterval = setInterval(() => {
      if (this.player?.getCaptionsTrack) {
        const track = this.player.getCaptionsTrack();
        if (track) {
          this.forceCaptionsOff(this.player);
        }
      }
    }, 3000);
  }

  private forceCaptionsOff(player: any) {
    try {
      const track = player.getCaptionsTrack();
      if (track) {
        player.setCaptionsTrack(null);
      }
    } catch {
      // Captions may not be available yet — ignore
    }
  }

  ngOnDestroy() {
    if (this.pollInterval) clearInterval(this.pollInterval);
    try { this.player?.destroy(); } catch { /* ignore */ }
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

