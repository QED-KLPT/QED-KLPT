import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { finalize } from 'rxjs';

import {
  VideoAccessResponse,
  VideoAccessService,
} from '../../../services/video-access.service';

@Component({
  selector: 'app-vid-player',
  standalone: false,
  templateUrl: './vid-player.component.html',
  styleUrl: './vid-player.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VidPlayerComponent implements OnChanges {
  @Input({ required: true }) videoId = '';
  @Input() title = '';

  protected videoUrl: string | null = null;
  protected passkey = '';
  protected errorMessage = '';
  protected loading = false;
  protected showPasskeyForm = false;

  private readonly videoAccess = inject(VideoAccessService);
  private readonly changeDetector = inject(ChangeDetectorRef);

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['videoId']) {
      return;
    }

    this.videoUrl = null;
    this.passkey = '';
    this.errorMessage = '';

    if (!this.videoId.trim()) {
      this.showPasskeyForm = false;
      this.errorMessage = 'No video has been selected.';
      return;
    }

    if (this.videoAccess.hasValidAccessToken()) {
      this.loadVideo();
    } else {
      this.showPasskeyForm = true;
    }
  }

  protected submitPasskey(): void {
    if (!this.passkey.trim()) {
      this.errorMessage = 'Enter the passkey to access this video.';
      return;
    }

    this.loadVideo(this.passkey);
  }

  protected retry(): void {
    this.errorMessage = '';

    if (this.videoAccess.hasValidAccessToken()) {
      this.loadVideo();
    } else {
      this.showPasskeyForm = true;
    }
  }

  private loadVideo(passkey?: string): void {
    this.loading = true;
    this.errorMessage = '';

    this.videoAccess.requestAccess(this.videoId, passkey)
      .pipe(finalize(() => {
        this.loading = false;
        this.changeDetector.markForCheck();
      }))
      .subscribe({
        next: response => this.handleAccessGranted(response),
        error: error => this.handleAccessError(error),
      });
  }

  private handleAccessGranted(response: VideoAccessResponse): void {
    this.videoAccess.storeAccessToken(response);
    this.videoUrl = response.url;
    this.passkey = '';
    this.showPasskeyForm = false;
  }

  private handleAccessError(error: unknown): void {
    this.videoUrl = null;

    if (error instanceof HttpErrorResponse && error.status === 401) {
      this.videoAccess.clearAccessToken();
      this.passkey = '';
      this.showPasskeyForm = true;
      this.errorMessage = 'The passkey is incorrect or your video access has expired.';
      return;
    }

    this.showPasskeyForm = !this.videoAccess.hasValidAccessToken();

    if (error instanceof HttpErrorResponse && error.status === 404) {
      this.errorMessage = 'This video could not be found.';
    } else {
      this.errorMessage = 'The video could not be loaded. Please try again.';
    }
  }
}
