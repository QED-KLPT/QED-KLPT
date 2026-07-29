import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

const STORAGE_KEY = 'klpt-site-access.v1';

export interface SiteAccessResponse {
  accessToken: string;
  accessTokenExpiresAt: string;
}

interface StoredSiteAccess {
  accessToken: string;
  accessTokenExpiresAt: string;
}

@Injectable({ providedIn: 'root' })
export class SiteAccessService {
  private readonly http = inject(HttpClient);

  requestAccess(passkey: string): Observable<SiteAccessResponse> {
    return this.http.post<SiteAccessResponse>(environment.siteAccessUrl, { passkey });
  }

  hasValidAccessToken(): boolean {
    return this.getValidAccessToken() !== null;
  }

  getValidAccessToken(): string | null {
    return this.getValidStoredAccess()?.accessToken ?? null;
  }

  storeAccessToken(response: SiteAccessResponse): void {
    const stored: StoredSiteAccess = {
      accessToken: response.accessToken,
      accessTokenExpiresAt: response.accessTokenExpiresAt,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  }

  clearAccessToken(): void {
    localStorage.removeItem(STORAGE_KEY);
  }

  private getValidStoredAccess(): StoredSiteAccess | null {
    const storedValue = localStorage.getItem(STORAGE_KEY);
    if (!storedValue) return null;

    try {
      const stored = JSON.parse(storedValue) as StoredSiteAccess;
      const expiresAt = Date.parse(stored.accessTokenExpiresAt);

      if (!stored.accessToken || !Number.isFinite(expiresAt) || expiresAt <= Date.now()) {
        this.clearAccessToken();
        return null;
      }

      return stored;
    } catch {
      this.clearAccessToken();
      return null;
    }
  }
}
