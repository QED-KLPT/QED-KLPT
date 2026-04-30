import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SessionModel } from '../models/session-model';
import { SessionManagementService } from '../shared/session-management.service';

@Component({
  selector: 'app-create-session',
  imports: [RouterLink],
  templateUrl: './create-session.html',
  styleUrl: './create-session.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateSession implements OnInit, OnDestroy {
  private readonly sessionManagement = inject(SessionManagementService);

  public currentSession!: SessionModel;

  ngOnInit(): void {
    this.currentSession = this.sessionManagement.createSession();
    this.currentSession.pageIndex = 1;
  }

  ngOnDestroy(): void {
    this.sessionManagement.persistSession(this.currentSession);
  }
}
