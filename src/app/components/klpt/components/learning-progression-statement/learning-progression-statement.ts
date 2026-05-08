import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NavigationNodesComponent } from '../../../shared';
import { KlptBehaviour } from '../../models/klpt-behaviour';
import { KlptDomain } from '../../models/klpt-domain';
import { KlptElement } from '../../models/klpt-element';
import { NameValuePair } from '../../models/name-value-pair';
import { SessionModel } from '../../models/session-model';
import { klptDomainStyle } from '../shared/klpt-domain-colours';
import { KlptDomainDataService } from '../shared/klpt-domain-data.service';
import { SessionManagementService } from '../shared/session-management.service';

interface ProgressionItem {
  element: KlptElement;
  behaviour: KlptBehaviour;
  nextBehaviour: KlptBehaviour | undefined;
}

@Component({
  selector: 'app-learning-progression-statement',
  imports: [NgStyle, RouterLink, NavigationNodesComponent],
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

        return {
          element,
          behaviour,
          nextBehaviour: element.behaviours.find(
            (candidate) => candidate.index === behaviour.index + 1,
          ),
        };
      })
      .filter((item): item is ProgressionItem => Boolean(item));
  }

  protected formValue(name: string): string {
    return this.currentSession.formFields.find((field) => field.name === name)?.value ?? '';
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

  protected itemStyle(element: KlptElement): Record<string, string> {
    return klptDomainStyle(this.domainForElement(element)?.index, 2);
  }

  protected practiceSupportSectionId(): string {
    const domain = this.selectedDomain();
    return domain?.name ? this.sectionIdFromDomainName(domain.name) : 'professional-reflection';
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
    return this.progressionItems().length > 0;
  }

  private mergeFormFields(fields: NameValuePair[]): NameValuePair[] {
    const requiredFields = [
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
