import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SessionModel } from '../../models/session-model';
import { SessionManagementService } from '../shared/session-management.service';

@Component({
  selector: 'app-create-session',
  imports: [FormsModule, RouterLink],
  templateUrl: './create-session.html',
  styleUrl: './create-session.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateSession implements OnInit, OnDestroy {
  private readonly sessionManagement = inject(SessionManagementService);

  public currentSession!: SessionModel;
  protected learnerCode = '';
  protected educatorName = '';
  protected learnerCodeError = '';
  protected educatorNameError = '';

  ngOnInit(): void {
    this.currentSession = this.sessionManagement.createSession();
    this.currentSession.pageIndex = 1;
  }

  ngOnDestroy(): void {
    this.sessionManagement.persistSession(this.currentSession);
  }

  protected onLearnerCodeInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.learnerCode = value.replace(/\D/g, '').slice(0, 3);
    this.learnerCodeError = this.learnerCode.length > 0 && this.learnerCode.length < 3
      ? 'Learner code must be 3 digits'
      : '';
  }

  protected onEducatorNameInput(event: Event): void {
    this.educatorName = (event.target as HTMLInputElement).value;
    this.educatorNameError = '';
  }

  protected onNext(): void {
    this.learnerCodeError = this.learnerCode.length !== 3 ? 'Learner code must be 3 digits' : '';
    this.educatorNameError = !this.educatorName.trim() ? "Please enter the observer's name" : '';

    if (this.learnerCodeError || this.educatorNameError) {
      return;
    }

    this.currentSession.learnerCode = this.learnerCode;
    this.currentSession.educatorName = this.educatorName.trim();
    this.sessionManagement.persistSession(this.currentSession);
  }
}
