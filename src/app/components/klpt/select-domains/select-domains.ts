import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NavigationNodesComponent } from '../../shared';
import { SessionModel } from '../models/session-model';
import { KlptDomainDataService } from '../shared/klpt-domain-data.service';
import { SessionManagementService } from '../shared/session-management.service';

@Component({
  selector: 'app-select-domains',
  imports: [RouterLink, NavigationNodesComponent],
  templateUrl: './select-domains.html',
  styleUrl: './select-domains.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectDomains implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  protected readonly domainData = inject(KlptDomainDataService);
  private readonly sessionManagement = inject(SessionManagementService);

  public currentSession!: SessionModel;

  ngOnInit(): void {
    this.currentSession = this.getRouteSession();
    this.currentSession.pageIndex = 2;
  }

  ngOnDestroy(): void {
    this.sessionManagement.persistSession(this.currentSession);
  }

  private getRouteSession(): SessionModel {
    const sessionId = this.route.snapshot.paramMap.get('sessionId');

    if (!sessionId) {
      throw new Error('KLPT session id is required for select domains.');
    }

    const session = this.sessionManagement.getSession(sessionId);

    if (!session) {
      throw new Error(`KLPT session not found: ${sessionId}`);
    }

    return session;
  }
}
