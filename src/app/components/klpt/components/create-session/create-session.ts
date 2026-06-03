import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SessionModel } from '../../models/session-model';
import { SessionTag } from '../../models/session-tag';
import { SessionManagementService } from '../shared/session-management.service';
import { SessionTagService } from '../shared/session-tag.service';

@Component({
  selector: 'app-create-session',
  imports: [RouterLink],
  templateUrl: './create-session.html',
  styleUrl: './create-session.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateSession implements OnInit, OnDestroy {
  private readonly sessionManagement = inject(SessionManagementService);
  private readonly sessionTags = inject(SessionTagService);

  public currentSession!: SessionModel;
  protected currentSessionTag!: SessionTag;
  protected educatorName = '';
  protected educatorNameError = '';

  ngOnInit(): void {
    this.currentSession = this.sessionManagement.createSession();
    this.currentSession.pageIndex = 1;
    this.currentSessionTag = this.sessionTags.generateTag(
      this.sessionManagement.getAllSessions().map((session) => session.learnerCode),
    );
  }

  ngOnDestroy(): void {
    this.sessionManagement.persistSession(this.currentSession);
  }

  protected onEducatorNameInput(event: Event): void {
    this.educatorName = (event.target as HTMLInputElement).value;
    this.educatorNameError = '';
  }

  protected onRegenerateSessionTag(): void {
    this.currentSessionTag = this.sessionTags.generateTag(
      this.sessionManagement.getAllSessions().map((session) => session.learnerCode),
    );
  }

  protected onNext(): void {
    this.educatorNameError = !this.educatorName.trim() ? "Please enter the observer's name" : '';

    if (this.educatorNameError) {
      return;
    }

    this.currentSession.sessionTag = this.currentSessionTag;
    this.currentSession.learnerCode = this.currentSessionTag.label;
    this.currentSession.educatorName = this.educatorName.trim();
    this.sessionManagement.persistSession(this.currentSession);
  }
}
