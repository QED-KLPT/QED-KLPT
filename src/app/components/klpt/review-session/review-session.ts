import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NavigationNodesComponent } from '../../shared';
import { SessionModel } from '../models/session-model';
import { SessionManagementService } from '../shared/session-management.service';
import { KlptPdfGeneratorService } from '../../../services/klpt-pdf-generator.service';

@Component({
  selector: 'app-review-session',
  imports: [RouterLink, NavigationNodesComponent],
  templateUrl: './review-session.html',
  styleUrl: './review-session.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewSession implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly sessionManagement = inject(SessionManagementService);
  private readonly pdfGenerator = inject(KlptPdfGeneratorService);

  public currentSession!: SessionModel;

  ngOnInit(): void {
    this.currentSession = this.getRouteSession();
    this.currentSession.pageIndex = 5;
  }

  ngOnDestroy(): void {
    this.sessionManagement.persistSession(this.currentSession);
  }

  async generatePdf(): Promise<void> {
    await this.pdfGenerator.generateSessionPdf(this.currentSession);
  }

  private getRouteSession(): SessionModel {
    const sessionId = this.route.snapshot.paramMap.get('sessionId');

    if (!sessionId) {
      throw new Error('KLPT session id is required for review session.');
    }

    const session = this.sessionManagement.getSession(sessionId);

    if (!session) {
      throw new Error(`KLPT session not found: ${sessionId}`);
    }

    return session;
  }
}
