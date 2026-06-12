import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Subject } from 'rxjs';
import { vi } from 'vitest';

import { VideoAccessService } from '../../services/video-access.service';
import { Testing } from './testing';

class MockVideoAccessService {
  private readonly accessGranted = new Subject<void>();

  readonly accessGranted$ = this.accessGranted.asObservable();
  expiresAt: number | null = null;

  hasValidAccessToken(): boolean {
    return false;
  }

  getAccessTokenExpiresAt(): number | null {
    return this.expiresAt;
  }

  clearAccessToken(): void {
    this.expiresAt = null;
  }
}

describe('Testing video access countdown', () => {
  let fixture: ComponentFixture<Testing>;
  let videoAccess: MockVideoAccessService;

  beforeEach(async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-12T04:00:00Z'));
    videoAccess = new MockVideoAccessService();

    await TestBed.configureTestingModule({
      imports: [Testing],
      providers: [
        provideRouter([]),
        { provide: VideoAccessService, useValue: videoAccess },
      ],
    }).compileComponents();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('counts down a valid stored access token every second', () => {
    videoAccess.expiresAt = Date.now() + 65_000;
    fixture = TestBed.createComponent(Testing);
    vi.advanceTimersByTime(0);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.testing-video__countdown')?.textContent)
      .toContain('01:05');

    vi.advanceTimersByTime(1_000);
    fixture.detectChanges();

    expect(compiled.querySelector('.testing-video__countdown')?.textContent)
      .toContain('01:04');
  });

  it('removes the countdown when video access is cleared', () => {
    videoAccess.expiresAt = Date.now() + 65_000;
    fixture = TestBed.createComponent(Testing);
    vi.advanceTimersByTime(0);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const clearButton = compiled.querySelector('.testing-video__clear') as HTMLButtonElement;
    clearButton.click();
    fixture.detectChanges();

    expect(compiled.querySelector('.testing-video__countdown')).toBeNull();
    expect(compiled.querySelector('.testing-video__confirmation')).toBeTruthy();
  });
});
