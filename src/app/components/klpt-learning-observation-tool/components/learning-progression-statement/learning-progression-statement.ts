import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NavigationNodesComponent } from '../../../shared';
import { DomainAssetModeService } from '../../../../services/domain-asset-mode.service';
import { KlptBehaviour } from '../../models/klpt-behaviour';
import { KlptDomain, KlptReflectiveQuestion } from '../../models/klpt-domain';
import { KlptElement } from '../../models/klpt-element';
import { NameValuePair } from '../../models/name-value-pair';
import { SessionModel } from '../../models/session-model';
import { klptDomainStyle } from '../shared/klpt-domain-colours';
import { KlptDomainDataService } from '../shared/klpt-domain-data.service';
import { SessionManagementService } from '../shared/session-management.service';
import { AccordionItemComponent } from '../../../shared/accordion-item/accordion-item.component';
import { HIGHEST_BEHAVIOUR_HTML } from '../shared/klpt-constants';
import { hasSelectedBehaviours } from '../shared/session-readiness';

interface ProgressionItem {
  element: KlptElement;
  behaviour: KlptBehaviour;
  nextBehaviour: KlptBehaviour | undefined;
}

@Component({
  selector: 'app-learning-progression-statement',
  imports: [NgStyle, RouterLink, NavigationNodesComponent, AccordionItemComponent],
  templateUrl: './learning-progression-statement.html',
  styleUrl: './learning-progression-statement.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LearningProgressionStatement implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  protected readonly domainData = inject(KlptDomainDataService);
  private readonly domainAssetMode = inject(DomainAssetModeService);
  private readonly sessionManagement = inject(SessionManagementService);

  public currentSession!: SessionModel;

  protected readonly highestBehaviourText = HIGHEST_BEHAVIOUR_HTML;

  ngOnInit(): void {
    this.currentSession = this.getRouteSession();
    this.currentSession.pageIndex = 3;
    this.currentSession.formFields = this.mergeFormFields(this.currentSession.formFields);
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

  protected selectedDomain(): KlptDomain | undefined {
    return this.domainData
      .getAllDomains()
      .find((domain) => domain.id === this.currentSession.domain);
  }

  protected progressionItems(): ProgressionItem[] {
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

        const behaviourIndex = element.behaviours.findIndex(
          (candidate) => candidate.id === behaviour.id,
        );

        return {
          element,
          behaviour,
          nextBehaviour: behaviourIndex >= 0
            ? element.behaviours[behaviourIndex + 1]
            : undefined,
        };
      })
      .filter((item): item is ProgressionItem => Boolean(item));
  }

  protected formValue(name: string): string {
    return this.currentSession.formFields.find((field) => field.name === name)?.value ?? '';
  }

  protected reflectiveQuestions(): KlptReflectiveQuestion[] {
    return [...(this.selectedDomain()?.reflectiveQuestions ?? [])].sort(
      (left, right) => left.index - right.index,
    );
  }

  protected updateFormField(name: string, value: string): void {
    this.currentSession.formFields = this.mergeFormFields(this.currentSession.formFields).map(
      (field) => (field.name === name ? { ...field, value } : field),
    );
  }

  protected updateEducatorName(value: string): void {
    this.currentSession.educatorName = value;
  }

  protected updateLearnerCode(value: string): void {
    this.currentSession.learnerCode = value;
  }

  protected onSessionCleared(session: SessionModel): void {
    this.currentSession = session;
  }

  protected itemStyle(element: KlptElement): Record<string, string> {
    return klptDomainStyle(this.domainForElement(element)?.index, 2, this.domainAssetMode.mode());
  }

  protected practiceSupportsLink(): string[] {
    const domainSlug = this.selectedDomainSlug();
    return domainSlug ? ['/learning-domains', domainSlug] : ['/learning-domains'];
  }

  private selectedDomainSlug(): string {
    const domain = this.selectedDomain();
    return domain?.name ? this.sectionIdFromDomainName(domain.name) : '';
  }

  private sectionIdFromDomainName(name: string): string {
    return name
      .trim()
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  protected canContinue(): boolean {
    return hasSelectedBehaviours(this.currentSession, this.domainData);
  }

  protected openQklgPdf(): void {
    const url = 'https://www.qcaa.qld.edu.au/downloads/kindergarten/qklg_align_eylf.pdf';

    // Build a clean return URL (origin + pathname + search, no hash)
    const returnUrl = `${window.location.origin}${window.location.pathname}${window.location.search}`;

    // Push a distinct history entry via a hash fragment so the browser creates a new stack slot.
    // When the user clicks Back from the PDF, popstate fires on this entry and app.ts
    // replaces it with the clean URL — keeping them on Step 3.
    window.history.pushState(
      { _klptReturn: returnUrl },
      '',
      window.location.pathname + '#_klpt_return',
    );

    window.location.href = url;
  }

  private mergeFormFields(fields: NameValuePair[]): NameValuePair[] {
    const requiredFields = [
      'date',
      'observational-context',
      'professional-reflection',
      'support-learning',
      'qklg-eylf-links',
    ];

    const mergedFields = requiredFields.map((name) => {
      const existingField = fields.find((field) => field.name === name);

      if (existingField) {
        return existingField;
      }

      return {
        name,
        value: name === 'date' ? this.currentDateValue() : '',
      };
    });
    const existingFields = fields.filter(
      (field) => !requiredFields.some((requiredField) => requiredField === field.name),
    );

    return [...mergedFields, ...existingFields];
  }

  private currentDateValue(): string {
    const now = new Date();
    const timezoneOffset = now.getTimezoneOffset() * 60000;

    return new Date(now.getTime() - timezoneOffset).toISOString().slice(0, 10);
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
