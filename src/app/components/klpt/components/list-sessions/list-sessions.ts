import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SessionModel } from '../../models/session-model';
import { SessionManagementService } from '../shared/session-management.service';

@Component({
  selector: 'app-list-sessions',
  imports: [RouterLink, DatePipe],
  templateUrl: './list-sessions.html',
  styleUrl: './list-sessions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListSessions implements OnInit {
  private readonly sessionManagement = inject(SessionManagementService);
  private readonly router = inject(Router);

  public sessions: SessionModel[] = [];
  protected learnerCode = '';
  protected educatorName = '';
  protected learnerCodeError = '';
  protected educatorNameError = '';
  protected isFormVisible = false;
  protected isStorageModalOpen = false;
  protected storageSnapshot = '(empty)';
  protected pendingDelete:
    | { type: 'session'; sessionId: string; learnerCode: string }
    | { type: 'all' }
    | undefined;

  protected get sessionCountLabel(): string {
    return `Saved sessions (${this.sessions.length})`;
  }

  protected get deleteConfirmationTitle(): string {
    return this.pendingDelete?.type === 'all' ? 'Delete all sessions?' : 'Delete this session?';
  }

  protected get deleteConfirmationMessage(): string {
    if (this.pendingDelete?.type === 'session') {
      return `This will permanently delete learner ${this.pendingDelete.learnerCode || 'this session'}.`;
    }

    return `This will permanently delete all ${this.sessions.length} saved sessions.`;
  }

  public get groupedSessions(): [string, SessionModel[]][] {
    const groups: Record<string, SessionModel[]> = {};

    for (const session of this.sessions) {
      const key = session.educatorName || 'Unknown observer';
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(session);
    }

    return Object.entries(groups);
  }
  

  ngOnInit(): void {
    this.sessionManagement.deleteAllExpiredSessions();
    const all = this.sessionManagement.getAllSessions();
    this.sessions = [...all].sort((a, b) => {
      const aDate = a.updated ?? a.created;
      const bDate = b.updated ?? b.created;
      return bDate.getTime() - aDate.getTime();
    });
  }

  protected onToggleFormVisibility(): void {
    this.isFormVisible = !this.isFormVisible;
    if (!this.isFormVisible) {
      this.learnerCode = '';
      this.educatorName = '';
      this.learnerCodeError = '';
      this.educatorNameError = '';
    }
  }

  public onLearnerCodeInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.learnerCode = value.replace(/\D/g, '').slice(0, 3);
    this.learnerCodeError = this.learnerCode.length > 0 && this.learnerCode.length < 3
      ? 'Learner code must be 3 digits'
      : '';
  }

  public onEducatorNameInput(event: Event): void {
    this.educatorName = (event.target as HTMLInputElement).value;
    this.educatorNameError = '';
  }

  public onCreateSession(): void {
    this.learnerCodeError = this.learnerCode.length !== 3 ? 'Learner code must be 3 digits' : '';
    this.educatorNameError = !this.educatorName.trim() ? "Observer's name is required" : '';

    if (this.learnerCodeError || this.educatorNameError) {
      return;
    }

    const newSession = this.sessionManagement.createSession();
    newSession.learnerCode = this.learnerCode;
    newSession.educatorName = this.educatorName.trim();
    newSession.pageIndex = 1;
    this.sessionManagement.persistSession(newSession);
    void this.router.navigateByUrl(`/klpt/select-domains/${newSession.id}`);
  }

  protected sessionRoute(session: SessionModel): string[] {
    const routeByPageIndex: Record<number, string> = {
      1: 'select-domains',
      2: 'select-behaviours',
      3: 'learning-progression-statement',
      4: 'review-session',
    };
    const stepRoute = routeByPageIndex[session.pageIndex] ?? routeByPageIndex[1];

    return ['/klpt', stepRoute, session.id];
  }

  public openDeleteSessionModal(session: SessionModel): void {
    this.pendingDelete = {
      type: 'session',
      sessionId: session.id,
      learnerCode: session.learnerCode,
    };
  }

  public openDeleteAllModal(): void {
    if (!this.sessions.length) {
      return;
    }

    this.pendingDelete = { type: 'all' };
  }

  protected closeDeleteModal(): void {
    this.pendingDelete = undefined;
  }

  protected confirmDelete(): void {
    if (!this.pendingDelete) {
      return;
    }

    if (this.pendingDelete.type === 'all') {
      for (const session of this.sessions) {
        this.sessionManagement.deleteSession(session.id);
      }
      this.sessions = [];
      this.pendingDelete = undefined;
      return;
    }

    const sessionId = this.pendingDelete.sessionId;
    this.sessionManagement.deleteSession(sessionId);
    this.sessions = this.sessions.filter((session) => session.id !== sessionId);
    this.pendingDelete = undefined;
  }

  protected openStorageModal(): void {
    this.storageSnapshot = this.sessionManagement.getStorageSnapshot();
    this.isStorageModalOpen = true;
  }

  protected closeStorageModal(): void {
    this.isStorageModalOpen = false;
  }
}
