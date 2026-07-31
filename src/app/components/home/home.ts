import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
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
export class Home implements OnInit, OnDestroy {
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
      document.body.style.overflow = 'hidden';
      setTimeout(() => this.ackDialog?.nativeElement?.focus(), 0);
    }
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }

  protected closeAckModal(): void {
    this.isAckModalOpen = false;
    document.body.style.overflow = '';
    sessionStorage.setItem('klpt-ack-seen', '1');
    window.scrollTo({ top: 0, behavior: 'instant' });
    window.setTimeout(() => {
      document.querySelector<HTMLElement>('#home-title')?.focus();
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
      imageSrc: 'assets/img/domain/colour/domain-lang-lit-col.png',
      imageAlt: 'Language and literacy illustration',
      background: 'linear-gradient(135deg, #7D3FD1 0%, #5B219F 100%)',
      hoverBorderColor: '#6F2DBD',
    },
    {
      title: 'Executive function',
      description: 'Develop working memory, attention, cognitive flexibility, and problem-solving skills.',
      url: '/learning-domains/executive-function',
      imageSrc: 'assets/img/domain/colour/domain-exec-func-col.png',
      imageAlt: 'Executive function illustration',
      background: 'linear-gradient(135deg, #008D7A 0%, #006154 100%)',
      hoverBorderColor: '#007A6A',
    },
    {
      title: 'Social-emotional learning',
      description: 'Foster self-awareness, emotion regulation, empathy, and positive relationships.',
      url: '/learning-domains/social-and-emotional-learning',
      imageSrc: 'assets/img/domain/colour/domain-soc-emot-lrn-col.png',
      imageAlt: 'Social-emotional learning illustration',
      background: 'linear-gradient(135deg, #D72D6F 0%, #9F124B 100%)',
      hoverBorderColor: '#C2185B',
    },
    {
      title: 'Physicality',
      description: 'Enhance gross and fine motor skills, coordination, and physical confidence.',
      url: '/learning-domains/physicality',
      imageSrc: 'assets/img/domain/colour/domain-physicality-colour.png',
      imageAlt: 'Physicality illustration',
      background: 'linear-gradient(135deg, #D96313 0%, #9E4100 100%)',
      hoverBorderColor: '#C45100',
    },
    {
      title: 'Mathematics and numeracy',
      description: 'Build number sense, pattern recognition, spatial reasoning, and mathematical thinking.',
      url: '/learning-domains/mathematics-and-numeracy',
      imageSrc: 'assets/img/domain/colour/domain-math-num-col.png',
      imageAlt: 'Mathematics and numeracy illustration',
      background: 'linear-gradient(135deg, #388E3C 0%, #246B27 100%)',
      hoverBorderColor: '#2E7D32',
    },
  ];
}
