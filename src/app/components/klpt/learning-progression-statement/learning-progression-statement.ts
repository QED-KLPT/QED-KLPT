import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SessionModel } from '../models/session-model';
import { KlptDomainDataService } from '../shared/klpt-domain-data.service';
import { SessionManagementService } from '../shared/session-management.service';

@Component({
  selector: 'app-learning-progression-statement',
  imports: [RouterLink],
  templateUrl: './learning-progression-statement.html',
  styleUrl: './learning-progression-statement.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LearningProgressionStatement implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  protected readonly domainData = inject(KlptDomainDataService);
  private readonly sessionManagement = inject(SessionManagementService);

  public currentSession!: SessionModel;

  ngOnInit(): void {
    this.currentSession = this.getRouteSession();
    this.currentSession.pageIndex = 4;
  }

  ngOnDestroy(): void {
    this.sessionManagement.persistSession(this.currentSession);
  }

  private getRouteSession(): SessionModel {
    const sessionId = this.route.snapshot.paramMap.get('sessionId');

    if (!sessionId) {
      throw new Error('KLPT session id is required for learning progression statement.');
    }

    const session = this.sessionManagement.getSession(sessionId);

    if (!session) {
      throw new Error(`KLPT session not found: ${sessionId}`);
    }

    return session;
  }
}
