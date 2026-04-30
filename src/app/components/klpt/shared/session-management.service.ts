import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { SessionModel } from '../models/session-model';

const STORAGE_KEY = 'klpt.sessions';

type StoredSessionModel = Omit<SessionModel, 'created' | 'updated' | 'expiry'> & {
  created: string;
  updated: string | undefined;
  expiry: string;
};

@Injectable({
  providedIn: 'root',
})
export class SessionManagementService {
  persistSession(session: SessionModel): void {
    const sessions = this.getStoredSessions();
    const nextSession: SessionModel = {
      ...session,
      updated: new Date(),
    };
    const index = sessions.findIndex((storedSession) => storedSession.id === session.id);

    if (index === -1) {
      sessions.push(nextSession);
    } else {
      sessions[index] = nextSession;
    }

    this.setStoredSessions(sessions);
  }

  createSession(): SessionModel {
    const now = new Date();
    const expiry = new Date(now);
    expiry.setDate(expiry.getDate() + environment.sessionExpiryDays);

    return {
      id: this.createSessionId(),
      created: now,
      updated: undefined,
      expiry,
      pageIndex: 0,
      domain: '',
      subDomain: undefined,
      elements: [],
      formFields: [],
    };
  }

  deleteSession(sessionId: string): void {
    this.setStoredSessions(
      this.getStoredSessions().filter((session) => session.id !== sessionId),
    );
  }

  getSession(sessionId: string): SessionModel | undefined {
    return this.getStoredSessions().find((session) => session.id === sessionId);
  }

  getAllSessions(): SessionModel[] {
    return this.getStoredSessions();
  }

  getStorageSnapshot(): string {
    const storedSessions = localStorage.getItem(STORAGE_KEY);

    if (!storedSessions) {
      return '(empty)';
    }

    try {
      return JSON.stringify(JSON.parse(storedSessions), null, 2);
    } catch {
      return storedSessions;
    }
  }

  deleteAllExpiredSessions(): void {
    const now = new Date();
    this.setStoredSessions(
      this.getStoredSessions().filter((session) => session.expiry > now),
    );
  }

  private getStoredSessions(): SessionModel[] {
    const storedSessions = localStorage.getItem(STORAGE_KEY);

    if (!storedSessions) {
      return [];
    }

    try {
      const parsedSessions = JSON.parse(storedSessions) as StoredSessionModel[];
      return parsedSessions.map((session) => ({
        ...session,
        created: new Date(session.created),
        updated: session.updated ? new Date(session.updated) : undefined,
        expiry: new Date(session.expiry),
      }));
    } catch {
      return [];
    }
  }

  private setStoredSessions(sessions: SessionModel[]): void {
    const storedSessions: StoredSessionModel[] = sessions.map((session) => ({
      ...session,
      created: session.created.toISOString(),
      updated: session.updated?.toISOString(),
      expiry: session.expiry.toISOString(),
    }));

    localStorage.setItem(STORAGE_KEY, JSON.stringify(storedSessions));
  }

  private createSessionId(): string {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      return crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}
