import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SessionModel } from '../models/session-model';
import { SessionManagementService } from '../shared/session-management.service';

@Component({
  selector: 'app-list-sessions',
  imports: [RouterLink],
  templateUrl: './list-sessions.html',
  styleUrl: './list-sessions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListSessions implements OnInit, OnDestroy {
  private readonly sessionManagement = inject(SessionManagementService);

  public currentSession!: SessionModel;
  protected isStorageModalOpen = false;
  protected storageSnapshot = '(empty)';

  ngOnInit(): void {
    this.sessionManagement.deleteAllExpiredSessions();
  }

  ngOnDestroy(): void {
    if (this.currentSession) {
      this.sessionManagement.persistSession(this.currentSession);
    }
  }

  protected openStorageModal(): void {
    this.storageSnapshot = this.sessionManagement.getStorageSnapshot();
    this.isStorageModalOpen = true;
  }

  protected closeStorageModal(): void {
    this.isStorageModalOpen = false;
  }
}
