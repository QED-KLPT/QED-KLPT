import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
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

  public sessions: SessionModel[] = [];
  protected isStorageModalOpen = false;
  protected storageSnapshot = '(empty)';

  ngOnInit(): void {
    this.sessionManagement.deleteAllExpiredSessions();
    this.sessions = this.sessionManagement.getAllSessions();
  }

  protected openStorageModal(): void {
    this.storageSnapshot = this.sessionManagement.getStorageSnapshot();
    this.isStorageModalOpen = true;
  }

  protected closeStorageModal(): void {
    this.isStorageModalOpen = false;
  }
}
