import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { DomainCard } from '../shared/domain-card/domain-card';
import { YoutubePlayerModule } from '../shared/youtube-player/youtube-player.module';

type DomainSummary = {
  title: string;
  description: string;
  url: string;
  imageAlt?: string;
  imageSrc?: string;
  background?: string;
  hoverBorderColor?: string;
};

@Component({
  selector: 'app-home',
  imports: [RouterLink, YoutubePlayerModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  acknowledgementTranscript: string = '';
  introductionTranscript: string = '';
  protected isAckModalOpen = false;

  @ViewChild('ackDialog') private ackDialog?: ElementRef<HTMLElement>;

  constructor(
    private scroll: ViewportScroller,
    private http: HttpClient,
  ) {
    this.http.get('assets/content/transcripts/home/acknowledgement-of-country.txt', { responseType: 'text' }).subscribe(t => this.acknowledgementTranscript = t);
    this.http.get('assets/content/transcripts/home/introduction-to-the-klpt.txt', { responseType: 'text' }).subscribe(t => this.introductionTranscript = t);
  }

  ngOnInit(): void {
    this.scroll.scrollToPosition([0, 0]);
    if (!sessionStorage.getItem('klpt-ack-seen')) {
      this.isAckModalOpen = true;
      setTimeout(() => this.ackDialog?.nativeElement?.focus(), 0);
    }
  }

  protected closeAckModal(): void {
    this.isAckModalOpen = false;
    sessionStorage.setItem('klpt-ack-seen', '1');
    window.scrollTo({ top: 0, behavior: 'instant' });
    window.setTimeout(() => {
      document.getElementById('home-title')?.focus();
    });
  }

  protected trapAckModalFocus(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeAckModal();
      return;
    }
    if (event.key !== 'Tab') return;

    const dialog = this.ackDialog?.nativeElement;
    if (!dialog) return;

    const focusable = Array.from(
      dialog.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
    ).filter(el => !el.hasAttribute('disabled') && el.offsetParent !== null);

    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey) {
      if (document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  scrollToContent(): void {
    const content = document.getElementById('home-content');

    if (!content) {
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    content.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
  }

  protected readonly domains: DomainSummary[] = [
    {
      title: 'Language and literacy',
      description: 'Support vocabulary, phonological awareness, and early reading and writing skills.',
      url: '/learning-domains/language-and-literacy',
      background: 'linear-gradient(135deg, #679ed4 0%, #5089c0 100%)',
      hoverBorderColor: '#679ed4',
    },
    {
      title: 'Executive function',
      description: 'Develop working memory, attention, cognitive flexibility, and problem-solving skills.',
      url: '/learning-domains/executive-function',
      background: 'linear-gradient(135deg, #cddff0 0%, #b8d0e0 100%)',
      hoverBorderColor: '#cddff0',
    },
    {
      title: 'Social-emotional learning',
      description: 'Foster self-awareness, emotion regulation, empathy, and positive relationships.',
      url: '/learning-domains/social-and-emotional-learning',
      background: 'linear-gradient(135deg, #0063af 0%, #004a88 100%)',
      hoverBorderColor: '#0063af',
    },
    {
      title: 'Physicality',
      description: 'Enhance gross and fine motor skills, coordination, and physical confidence.',
      url: '/learning-domains/physicality',
      imageSrc: 'assets/img/domain/colour/domain-physicality-colour.png',
      imageAlt: 'Physicality illustration',
      background: 'linear-gradient(135deg, #1c447e 0%, #132e5a 100%)',
      hoverBorderColor: '#1c447e'
    },
    {
      title: 'Mathematics and numeracy',
      description: 'Build number sense, pattern recognition, spatial reasoning, and mathematical thinking.',
      url: '/learning-domains/mathematics-and-numeracy',
      imageSrc: 'assets/img/domain/colour/domain-math-num-col.png',
      imageAlt: 'Mathematics and numeracy illustration',
      background: 'linear-gradient(135deg, #102548 0%, #0b1a34 100%)',
      hoverBorderColor: '#102548'
}
  ];}
