import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SessionModel } from '../models/session-model';
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

  public get groupedSessions(): [string, SessionModel[]][] {
    const groups: Record<string, SessionModel[]> = {};

    for (const session of this.sessions) {
      const key = session.educatorName || 'Unknown educator';
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
    this.educatorNameError = !this.educatorName.trim() ? 'Educator name is required' : '';

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

  public onDeleteSession(sessionId: string): void {
    this.sessionManagement.deleteSession(sessionId);
    this.sessions = this.sessions.filter((session) => session.id !== sessionId);
  }

  protected openStorageModal(): void {
    this.storageSnapshot = this.sessionManagement.getStorageSnapshot();
    this.isStorageModalOpen = true;
  }

  protected closeStorageModal(): void {
    this.isStorageModalOpen = false;
  }
}
