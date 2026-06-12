import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { environment } from '../../environments/environment';

const STORAGE_KEY = 'klpt-video-access.v1';

export interface VideoAccessResponse {
  videoId: string;
  url: string;
  expiresAt: string;
  accessToken: string;
  accessTokenExpiresAt: string;
}

interface StoredVideoAccess {
  accessToken: string;
  accessTokenExpiresAt: string;
}

@Injectable({ providedIn: 'root' })
export class VideoAccessService {
  private readonly http = inject(HttpClient);
  private readonly accessGranted = new Subject<void>();

  readonly accessGranted$ = this.accessGranted.asObservable();

  requestAccess(videoId: string, passkey?: string): Observable<VideoAccessResponse> {
    const accessToken = passkey ? null : this.getValidAccessToken();
    const body = passkey
      ? { videoId, passkey }
      : { videoId, accessToken };

    return this.http.post<VideoAccessResponse>(environment.videoAccessUrl, body);
  }

  hasValidAccessToken(): boolean {
    return this.getValidAccessToken() !== null;
  }

  getAccessTokenExpiresAt(): number | null {
    const storedAccess = this.getValidStoredAccess();
    return storedAccess ? Date.parse(storedAccess.accessTokenExpiresAt) : null;
  }

  storeAccessToken(response: VideoAccessResponse): void {
    const storedAccess: StoredVideoAccess = {
      accessToken: response.accessToken,
      accessTokenExpiresAt: response.accessTokenExpiresAt,
    };

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(storedAccess));
    this.accessGranted.next();
  }

  clearAccessToken(): void {
    sessionStorage.removeItem(STORAGE_KEY);
  }

  private getValidAccessToken(): string | null {
    return this.getValidStoredAccess()?.accessToken ?? null;
  }

  private getValidStoredAccess(): StoredVideoAccess | null {
    const storedValue = sessionStorage.getItem(STORAGE_KEY);
    if (!storedValue) {
      return null;
    }

    try {
      const storedAccess = JSON.parse(storedValue) as StoredVideoAccess;
      const expiresAt = Date.parse(storedAccess.accessTokenExpiresAt);

      if (!storedAccess.accessToken || !Number.isFinite(expiresAt) || expiresAt <= Date.now()) {
        this.clearAccessToken();
        return null;
      }

      return storedAccess;
    } catch {
      this.clearAccessToken();
      return null;
    }
  }
}
