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

  it('provides an accessible passkey visibility toggle', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const firstForm = compiled.querySelector('form') as HTMLFormElement;
    const input = firstForm.querySelector('input') as HTMLInputElement;
    const toggle = firstForm.querySelector('.vid-player__visibility') as HTMLButtonElement;

    expect(input.type).toBe('password');
    expect(toggle.getAttribute('aria-label')).toBe('Show passkey');
    expect(toggle.getAttribute('aria-pressed')).toBe('false');

    toggle.click();
    fixture.detectChanges();

    expect(input.type).toBe('text');
    expect(toggle.getAttribute('aria-label')).toBe('Hide passkey');
    expect(toggle.getAttribute('aria-pressed')).toBe('true');
  });

  it('marks the passkey field invalid when submission is empty', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const firstForm = compiled.querySelector('form') as HTMLFormElement;
    const input = firstForm.querySelector('input') as HTMLInputElement;

    firstForm.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    const errorId = input.getAttribute('aria-describedby');
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(errorId).toBeTruthy();
    expect(compiled.querySelector(`#${errorId}`)?.getAttribute('role')).toBe('alert');
  });

  it('clears the invalid state when the passkey is edited', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const firstForm = compiled.querySelector('form') as HTMLFormElement;
    const input = firstForm.querySelector('input') as HTMLInputElement;

    firstForm.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    expect(input.getAttribute('aria-invalid')).toBe('true');

    input.value = 'new-passkey';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(input.getAttribute('aria-invalid')).toBeNull();
    expect(input.getAttribute('aria-describedby')).toBeNull();
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
