import { DatePipe, SlicePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SessionModel } from '../models/session-model';
import { SessionManagementService } from '../shared/session-management.service';

@Component({
  selector: 'app-list-sessions',
  imports: [RouterLink, DatePipe, SlicePipe],
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
    const all = this.sessionManagement.getAllSessions();
    this.sessions = [...all].sort((a, b) => {
      const aDate = a.updated ?? a.created;
      const bDate = b.updated ?? b.created;
      return bDate.getTime() - aDate.getTime();
    });
  }

  protected openStorageModal(): void {
    this.storageSnapshot = this.sessionManagement.getStorageSnapshot();
    this.isStorageModalOpen = true;
  }

  protected closeStorageModal(): void {
    this.isStorageModalOpen = false;
  }
}
