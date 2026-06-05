import { NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NavigationNodesComponent } from '../../../shared';
import { DomainAssetModeService } from '../../../../services/domain-asset-mode.service';
import { KlptBehaviour } from '../../models/klpt-behaviour';
import { KlptDomain } from '../../models/klpt-domain';
import { KlptElement } from '../../models/klpt-element';
import { NameValuePair } from '../../models/name-value-pair';
import { SessionModel } from '../../models/session-model';
import { klptDomainStyle } from '../shared/klpt-domain-colours';
import { KlptDomainDataService } from '../shared/klpt-domain-data.service';
import { SessionManagementService } from '../shared/session-management.service';
import { KlptPdfGeneratorService } from '../../../../services/klpt-pdf-generator.service';
import { HIGHEST_BEHAVIOUR_HTML } from '../shared/klpt-constants';

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
  private readonly domainAssetMode = inject(DomainAssetModeService);
  private readonly router = inject(Router);

  public currentSession!: SessionModel;
  @ViewChild('generatePdfDialog') private generatePdfDialog?: ElementRef<HTMLElement>;
  @ViewChild('generatePdfTrigger') private generatePdfTrigger?: ElementRef<HTMLButtonElement>;
  protected childName = '';
  protected isGeneratePdfModalOpen = false;
  private isLeavingAfterPdf = false;

  protected readonly highestBehaviourText = HIGHEST_BEHAVIOUR_HTML;


  ngOnInit(): void {
    this.currentSession = this.getRouteSession();
    this.childName = '';
    this.currentSession.pageIndex = 4;
    this.currentSession.formFields = this.mergeFormFields(this.currentSession.formFields);
  }

  ngOnDestroy(): void {
    if (!this.isLeavingAfterPdf) {
      this.sessionManagement.persistSession(this.currentSession);
    }
  }

  protected openGeneratePdfModal(): void {
    this.isGeneratePdfModalOpen = true;
    window.setTimeout(() => this.focusFirstModalControl());
  }

  protected closeGeneratePdfModal(): void {
    this.isGeneratePdfModalOpen = false;
    window.setTimeout(() => this.generatePdfTrigger?.nativeElement.focus());
  }

  protected async confirmGeneratePdf(): Promise<void> {
    this.isGeneratePdfModalOpen = false;
    const pdfWindow = this.pdfGenerator.openPdfPreviewWindowForIosSafari();
    await this.pdfGenerator.generateSessionPdf(this.currentSession, pdfWindow, {
      learnerName: this.childName,
    });

    this.sessionManagement.deleteSession(this.currentSession.id);
    this.isLeavingAfterPdf = true;
    void this.router.navigateByUrl('/klpt/list-sessions');
  }

  protected trapGeneratePdfModalFocus(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.closeGeneratePdfModal();
      return;
    }

    if (event.key !== 'Tab') {
      return;
    }

    const focusableElements = this.getModalFocusableElements();

    if (!focusableElements.length) {
      event.preventDefault();
      this.generatePdfDialog?.nativeElement.focus();
      return;
    }

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
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

  protected updateChildName(value: string): void {
    this.childName = value;
  }

  protected onSessionCleared(session: SessionModel): void {
    this.currentSession = session;
    this.childName = '';
  }

  protected displayValue(value: string | undefined): string {
    return value?.trim() ? value : 'Not entered';
  }

  protected itemStyle(element: KlptElement): Record<string, string> {
    return klptDomainStyle(this.domainForElement(element)?.index, 2, this.domainAssetMode.mode());
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
      'date',
      'observational-context',
      'professional-reflection',
      'support-learning',
    ];

    const mergedFields = requiredFields.map((name) => {
      return fields.find((field) => field.name === name) ?? { name, value: '' };
    });
    const existingFields = fields.filter(
      (field) =>
        field.name !== 'child-name' &&
        !requiredFields.some((requiredField) => requiredField === field.name),
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

  private focusFirstModalControl(): void {
    const firstButton = this.generatePdfDialog?.nativeElement.querySelector<HTMLElement>('button:not([disabled])');
    const firstFocusable = this.getModalFocusableElements()[0];

    (firstButton ?? firstFocusable ?? this.generatePdfDialog?.nativeElement)?.focus();
  }

  private getModalFocusableElements(): HTMLElement[] {
    const dialog = this.generatePdfDialog?.nativeElement;

    if (!dialog) {
      return [];
    }

    return Array.from(
      dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((element) => !element.hasAttribute('inert'));
  }
}
