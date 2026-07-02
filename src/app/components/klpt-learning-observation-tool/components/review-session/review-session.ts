import { NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NavigationNodesComponent } from '../../../shared';
import { DomainAssetModeService } from '../../../../services/domain-asset-mode.service';
import { KlptBehaviour } from '../../models/klpt-behaviour';
import { KlptDomain } from '../../models/klpt-domain';
import { KlptElement } from '../../models/klpt-element';
import { KlptSubDomain } from '../../models/klpt-sub-domain';
import { NameValuePair } from '../../models/name-value-pair';
import { SessionModel } from '../../models/session-model';
import { klptDomainStyle } from '../shared/klpt-domain-colours';
import { KlptDomainDataService } from '../shared/klpt-domain-data.service';
import { SessionManagementService } from '../shared/session-management.service';
import { KlptPdfGeneratorService } from '../../../../services/klpt-pdf-generator.service';
import { KlptDocxGeneratorService } from '../../../../services/klpt-docx-generator.service';
import { DocumentDownloadService } from '../../../../services/document-download.service';
import { HIGHEST_BEHAVIOUR_HTML } from '../shared/klpt-constants';
import { GuaranteedDelivery, chooseGuaranteedDelivery, getDownloadFallbackHint } from '../shared/klpt-document-delivery';

interface ReviewProgressionItem {
  subDomain: KlptSubDomain | undefined;
  element: KlptElement;
  behaviour: KlptBehaviour;
  nextBehaviour: KlptBehaviour | undefined;
}

type DocGenKind = 'pdf' | 'word';
type DocGenPhase = 'confirm' | 'generating' | 'success' | 'error';

interface DocGenFile {
  blob: Blob;
  url: string;
  filename: string;
}

interface DocGenState {
  kind: DocGenKind;
  phase: DocGenPhase;
  delivery?: GuaranteedDelivery;
  file?: DocGenFile;
  errorMessage?: string;
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
  private readonly docxGenerator = inject(KlptDocxGeneratorService);
  private readonly downloadService = inject(DocumentDownloadService);
  private readonly domainAssetMode = inject(DomainAssetModeService);
  private readonly router = inject(Router);

  public currentSession!: SessionModel;
  @ViewChild('docGenDialog') private docGenDialog?: ElementRef<HTMLElement>;
  @ViewChild('generatePdfTrigger') private generatePdfTrigger?: ElementRef<HTMLButtonElement>;
  @ViewChild('generateWordTrigger') private generateWordTrigger?: ElementRef<HTMLButtonElement>;
  protected childName = '';
  protected readonly docGen = signal<DocGenState | null>(null);
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
    this.docGen.set({ kind: 'pdf', phase: 'confirm' });
    window.setTimeout(() => this.focusFirstDocGenControl());
  }

  protected openGenerateWordModal(): void {
    this.docGen.set({ kind: 'word', phase: 'confirm' });
    window.setTimeout(() => this.focusFirstDocGenControl());
  }

  protected closeDocGenModal(): void {
    const kind = this.docGen()?.kind;
    this.docGen.set(null);
    window.setTimeout(() => this.restoreDocGenTriggerFocus(kind));
  }

  protected async confirmGenerateDocument(): Promise<void> {
    const current = this.docGen();

    if (!current) {
      return;
    }

    const kind = current.kind;
    this.docGen.set({ kind, phase: 'generating' });

    const preOpenedWindow = kind === 'pdf'
      ? this.pdfGenerator.openPdfPreviewWindowForIosSafari()
      : this.docxGenerator.openDocxWindowForIosSafari();

    try {
      const result = kind === 'pdf'
        ? await this.pdfGenerator.generateSessionPdf(this.currentSession, { learnerName: this.childName })
        : await this.docxGenerator.generateSessionDocx(this.currentSession, { learnerName: this.childName });

      const delivery = chooseGuaranteedDelivery(navigator);

      if (delivery === 'ios-new-tab' && preOpenedWindow && !preOpenedWindow.closed) {
        preOpenedWindow.location.href = result.url;
      } else {
        preOpenedWindow?.close();
        this.triggerAnchorDownload(result.url, result.filename);
      }

      this.downloadService.set({ url: result.url, filename: result.filename, type: result.type });

      this.sessionManagement.deleteSession(this.currentSession.id);
      this.isLeavingAfterPdf = true;

      this.docGen.set({
        kind,
        phase: 'success',
        delivery,
        file: { blob: result.blob, url: result.url, filename: result.filename },
      });
    } catch {
      preOpenedWindow?.close();
      this.docGen.set({
        kind,
        phase: 'error',
        errorMessage: 'Something went wrong generating your document. Please try again.',
      });
    }

    window.setTimeout(() => this.focusFirstDocGenControl());
  }

  protected leaveToSessions(): void {
    this.docGen.set(null);
    void this.router.navigateByUrl('/learning-observation-tool/sessions');
  }

  protected downloadFallbackHint(): string {
    return getDownloadFallbackHint();
  }

  protected trapDocGenModalFocus(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      const phase = this.docGen()?.phase;

      if (phase === 'confirm' || phase === 'error') {
        event.preventDefault();
        this.closeDocGenModal();
      }
      return;
    }

    if (event.key !== 'Tab') {
      return;
    }

    const focusableElements = this.getDocGenFocusableElements();

    if (!focusableElements.length) {
      event.preventDefault();
      this.docGenDialog?.nativeElement.focus();
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

  private triggerAnchorDownload(url: string, filename: string): void {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  private restoreDocGenTriggerFocus(kind: DocGenKind | undefined): void {
    if (kind === 'pdf') {
      this.generatePdfTrigger?.nativeElement.focus();
    } else if (kind === 'word') {
      this.generateWordTrigger?.nativeElement.focus();
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
          subDomain: this.selectedSubDomain(),
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

  protected selectedSubDomain(): KlptSubDomain | undefined {
    const subDomainId = this.currentSession.subDomain;

    if (!subDomainId) {
      return undefined;
    }

    return this.domainData
      .getAllDomains()
      .flatMap((domain) => domain.subDomains ?? [])
      .find((subDomain) => subDomain.id === subDomainId);
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
      'qklg-eylf-links',
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

  private focusFirstDocGenControl(): void {
    const firstButton = this.docGenDialog?.nativeElement.querySelector<HTMLElement>('button:not([disabled])');
    const firstFocusable = this.getDocGenFocusableElements()[0];

    (firstButton ?? firstFocusable ?? this.docGenDialog?.nativeElement)?.focus();
  }

  private getDocGenFocusableElements(): HTMLElement[] {
    const dialog = this.docGenDialog?.nativeElement;

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
