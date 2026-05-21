import { Component, Input, ChangeDetectionStrategy, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-transcript',
  templateUrl: './transcript.component.html',
  styleUrls: ['./transcript.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class TranscriptComponent {
  @Input() transcript: string | string[] = '';

  showTranscript = false;
  needsScrollbar = false;

  @ViewChild('transcriptEl', { static: false }) transcriptEl!: ElementRef<HTMLDivElement>;

  constructor(private cdr: ChangeDetectorRef) {}

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
    return Array.isArray(this.transcript)
      ? this.transcript
      : [this.transcript];
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
}