import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

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

  toggleTranscript() {
    this.showTranscript = !this.showTranscript;
  }

  get transcriptLines(): string[] {
    if (!this.transcript) return [];
    return Array.isArray(this.transcript)
      ? this.transcript
      : [this.transcript];
  }
}