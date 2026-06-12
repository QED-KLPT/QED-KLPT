import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of, Subject } from 'rxjs';

import {
  VideoAccessResponse,
  VideoAccessService,
} from '../../../services/video-access.service';
import { VidPlayerModule } from './vid-player.module';

@Component({
  template: `
    <app-vid-player videoId="video-one" title="First video" />
    <app-vid-player videoId="video-two" title="Second video" />
  `,
  imports: [VidPlayerModule],
})
class VidPlayerHostComponent {}

class MockVideoAccessService {
  private readonly accessGranted = new Subject<void>();

  readonly accessGranted$ = this.accessGranted.asObservable();
  readonly requests: Array<{ videoId: string; passkey?: string }> = [];

  hasValidAccessToken(): boolean {
    return false;
  }

  requestAccess(videoId: string, passkey?: string): Observable<VideoAccessResponse> {
    this.requests.push({ videoId, passkey });

    return of({
      videoId,
      url: `https://example.com/${videoId}.mp4`,
      expiresAt: '2026-06-12T12:00:00Z',
      accessToken: 'access-token',
      accessTokenExpiresAt: '2026-06-12T12:00:00Z',
    });
  }

  storeAccessToken(): void {
    this.accessGranted.next();
  }

  clearAccessToken(): void {}
}

describe('VidPlayerComponent', () => {
  let fixture: ComponentFixture<VidPlayerHostComponent>;
  let videoAccess: MockVideoAccessService;

  beforeEach(async () => {
    videoAccess = new MockVideoAccessService();

    await TestBed.configureTestingModule({
      imports: [VidPlayerHostComponent],
      providers: [
        { provide: VideoAccessService, useValue: videoAccess },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(VidPlayerHostComponent);
    fixture.detectChanges();
  });

  it('shows each protected video title', () => {
    const titles = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('.vid-player__heading'),
    ).map(element => element.textContent?.trim());

    expect(titles).toEqual(['First video', 'Second video']);
  });

  it('unlocks every video on the page after one valid passkey', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const firstForm = compiled.querySelector('form') as HTMLFormElement;
    const firstInput = firstForm.querySelector('input') as HTMLInputElement;

    firstInput.value = 'valid-passkey';
    firstInput.dispatchEvent(new Event('input'));
    firstForm.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    expect(videoAccess.requests).toEqual([
      { videoId: 'video-one', passkey: 'valid-passkey' },
      { videoId: 'video-two', passkey: undefined },
    ]);
    expect(compiled.querySelectorAll('video').length).toBe(2);
  });
});
