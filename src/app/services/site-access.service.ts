import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

const STORAGE_KEY = 'klpt-site-access.v1';

@Injectable({ providedIn: 'root' })
export class SiteAccessService {
  private readonly http = inject(HttpClient);

  requestAccess(passkey: string): Observable<void> {
    return this.http.post<void>(environment.siteAccessUrl, { passkey });
  }

  hasAccess(): boolean {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored !== null && (JSON.parse(stored) as { validated?: boolean })?.validated === true;
    } catch {
      return false;
    }
  }

  grantAccess(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ validated: true }));
  }

  clearAccess(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
}
