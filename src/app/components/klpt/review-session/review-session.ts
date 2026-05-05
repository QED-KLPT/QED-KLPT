import { NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NavigationNodesComponent } from '../../shared';
import { KlptBehaviour } from '../models/klpt-behaviour';
import { KlptDomain } from '../models/klpt-domain';
import { KlptElement } from '../models/klpt-element';
import { NameValuePair } from '../models/name-value-pair';
import { SessionModel } from '../models/session-model';
import { klptDomainStyle } from '../shared/klpt-domain-colours';
import { KlptDomainDataService } from '../shared/klpt-domain-data.service';
import { SessionManagementService } from '../shared/session-management.service';
import { KlptPdfGeneratorService } from '../../../services/klpt-pdf-generator.service';

interface ReviewProgressionItem {
  element: KlptElement;
  behaviour: KlptBehaviour;
  nextBehaviour: KlptBehaviour | undefined;
}

@Component({
  selector: 'app-review-session',
  imports: [NgStyle, RouterLink, NavigationNodesComponent],
  templateUrl: './review-session.html',
  styleUrl: './review-session.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewSession implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  protected readonly domainData = inject(KlptDomainDataService);
  private readonly sessionManagement = inject(SessionManagementService);
  private readonly pdfGenerator = inject(KlptPdfGeneratorService);

  public currentSession!: SessionModel;

  ngOnInit(): void {
    this.currentSession = this.getRouteSession();
    this.currentSession.pageIndex = 5;
    this.currentSession.formFields = this.mergeFormFields(this.currentSession.formFields);
  }

  ngOnDestroy(): void {
    this.sessionManagement.persistSession(this.currentSession);
  }

  async generatePdf(): Promise<void> {
    await this.pdfGenerator.generateSessionPdf(this.currentSession);
  }

  protected selectedDomain(): KlptDomain | undefined {
    return this.domainData
      .getAllDomains()
      .find((domain) => domain.id === this.currentSession.domain);
  }

  protected progressionItems(): ReviewProgressionItem[] {
    const allElements = this.domainData
      .getAllDomains()
      .flatMap((domain) => this.domainData.getAllElementsByDomain(domain));

    return this.currentSession.elements
      .map((selectedElement) => {
        const element = allElements.find((candidate) => candidate.id === selectedElement.id);
        const behaviour = element?.behaviours.find(
          (candidate) => candidate.id === selectedElement.behaviourId,
        );

        if (!element || !behaviour) {
          return undefined;
        }

        return {
          element,
          behaviour,
          nextBehaviour: element.behaviours.find(
            (candidate) => candidate.index === behaviour.index + 1,
          ),
        };
      })
      .filter((item): item is ReviewProgressionItem => Boolean(item));
  }

  protected formValue(name: string): string {
    return this.currentSession.formFields.find((field) => field.name === name)?.value ?? '';
  }

  protected updateFormField(name: string, value: string): void {
    this.currentSession.formFields = this.mergeFormFields(this.currentSession.formFields).map(
      (field) => (field.name === name ? { ...field, value } : field),
    );
  }

  protected displayValue(value: string | undefined): string {
    return value?.trim() ? value : 'Not entered';
  }

  protected itemStyle(element: KlptElement): Record<string, string> {
    return klptDomainStyle(this.domainForElement(element)?.index, 2);
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

  private mergeFormFields(fields: NameValuePair[]): NameValuePair[] {
    const requiredFields = [
      'student-name',
      'date',
      'observational-context',
      'professional-reflection',
      'support-learning',
    ];

    const mergedFields = requiredFields.map((name) => {
      return fields.find((field) => field.name === name) ?? { name, value: '' };
    });
    const existingFields = fields.filter(
      (field) => !requiredFields.some((requiredField) => requiredField === field.name),
    );

    return [...mergedFields, ...existingFields];
  }

  private domainForElement(element: KlptElement): KlptDomain | undefined {
    return this.domainData
      .getAllDomains()
      .find((domain) =>
        this.domainData
          .getAllElementsByDomain(domain)
          .some((candidate) => candidate.id === element.id),
      );
  }
}
