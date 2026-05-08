import { Injectable } from '@angular/core';
import type { SessionModel } from '../components/klpt/models/session-model';
import type { jsPDF as JsPdfDocument } from 'jspdf';
import { KlptDomainDataService } from '../components/klpt/components/shared/klpt-domain-data.service';
import type { KlptBehaviour } from '../components/klpt/models/klpt-behaviour';
import type { KlptDomain } from '../components/klpt/models/klpt-domain';
import type { KlptElement } from '../components/klpt/models/klpt-element';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const FORM_FIELD_LABELS: Record<string, string> = {
  'student-name': 'Learner Name',
  'date': 'Date',
  'observational-context': 'Context',
  'professional-reflection': 'Professional Reflection',
  'support-learning': 'Support Learning',
};

const PDF_THEME = {
  ink: [16, 35, 60] as [number, number, number],
  muted: [82, 105, 133] as [number, number, number],
  blue: [13, 59, 102] as [number, number, number],
  panel: [237, 244, 250] as [number, number, number],
  panelAlt: [246, 249, 252] as [number, number, number],
  border: [216, 226, 236] as [number, number, number],
  white: [255, 255, 255] as [number, number, number],
};

interface PdfProgressionItem {
  element: KlptElement;
  behaviour: KlptBehaviour;
  nextBehaviour: KlptBehaviour | undefined;
}

@Injectable({ providedIn: 'root' })
export class KlptPdfGeneratorService {
  constructor(private readonly domainData: KlptDomainDataService) {}

  openPdfPreviewWindowForIosSafari(): Window | null {
    if (!this.shouldOpenPdfInNewTab()) {
      return null;
    }

    const pdfWindow = window.open('', '_blank');

    if (pdfWindow) {
      pdfWindow.opener = null;
      pdfWindow.document.title = 'Preparing KLPT PDF';
      pdfWindow.document.body.innerHTML = '<p style="font-family: sans-serif; padding: 1rem;">Preparing PDF...</p>';
    }

    return pdfWindow;
  }

  async generateSessionPdf(session: SessionModel, pdfWindow: Window | null = null): Promise<void> {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 16;
    const contentWidth = pageWidth - margin * 2;
    const domain = this.resolveDomain(session.domain);
    const progressionItems = this.progressionItems(session);
    let y = 18;

    y = this.addReportHeader(doc, y, margin, contentWidth);
    y = this.addMetadataGrid(doc, y, margin, contentWidth, [
      { label: 'Domain', value: domain?.name ?? 'Not selected' },
      { label: 'Elements', value: String(progressionItems.length) },
      { label: 'Date', value: this.displayValue(this.formatFormDate(this.formValue(session, 'date'))) },
      { label: "Observer's name", value: this.displayValue(session.educatorName) },
      { label: 'Learner code', value: this.displayValue(session.learnerCode) },
    ]);

    if (domain) {
      y = this.ensureSpace(doc, y, 30, margin, pageHeight);
      y = this.addTextCard(doc, y, margin, contentWidth, 'Learning domain summary', `${domain.name}: ${domain.summary}`);
    }

    for (const item of progressionItems) {
      y = this.ensureSpace(doc, y, 55, margin, pageHeight);
      y = this.addProgressionItem(doc, y, margin, contentWidth, item, pageHeight);
    }

    y = this.ensureSpace(doc, y, 35, margin, pageHeight);
    y = this.addTextCard(
      doc,
      y,
      margin,
      contentWidth,
      'Description of observation context or evidence collected',
      this.displayValue(this.formValue(session, 'observational-context')),
    );
    y = this.addTextCard(
      doc,
      y,
      margin,
      contentWidth,
      'Professional reflection',
      this.displayValue(this.formValue(session, 'professional-reflection')),
    );
    this.addTextCard(
      doc,
      y,
      margin,
      contentWidth,
      'How can you support this learning',
      this.displayValue(this.formValue(session, 'support-learning')),
    );

    this.addPageFooters(doc);

    const learnerCode = session.learnerCode || 'unknown';
    const now = new Date();
    const day = now.getDate();
    const month = MONTHS[now.getMonth()];
    const year = now.getFullYear();
    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    const displayHours = String(hours % 12 || 12).padStart(2, '0');
    const dateStr = `${year}-${month}-${String(day).padStart(2, '0')}-${displayHours}${minutes}${ampm}`;
    const filename = `klpt-session-${learnerCode}-${dateStr}.pdf`;

    if (pdfWindow && !pdfWindow.closed) {
      const pdfUrl = doc.output('bloburl');
      pdfWindow.location.href = pdfUrl.toString();
      window.setTimeout(() => URL.revokeObjectURL(pdfUrl.toString()), 60000);
      return;
    }

    doc.save(filename);
  }

  private addReportHeader(
    doc: JsPdfDocument,
    y: number,
    margin: number,
    contentWidth: number,
  ): number {
    doc.setFillColor(...PDF_THEME.panelAlt);
    doc.roundedRect(margin, y, contentWidth, 34, 4, 4, 'F');
    doc.setDrawColor(...PDF_THEME.border);
    doc.roundedRect(margin, y, contentWidth, 34, 4, 4, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...PDF_THEME.blue);
    doc.text('FINAL CHECK', margin + 8, y + 10);

    doc.setFontSize(24);
    doc.setTextColor(...PDF_THEME.ink);
    doc.text('Review Statement', margin + 8, y + 23);

    return y + 39;
  }

  private addMetadataGrid(
    doc: JsPdfDocument,
    y: number,
    margin: number,
    contentWidth: number,
    fields: { label: string; value: string }[],
  ): number {
    const gap = 3;
    const columns = fields.length;
    const cellWidth = (contentWidth - gap * (columns - 1)) / columns;
    const cellHeight = 19;

    fields.forEach((field, index) => {
      const x = margin + index * (cellWidth + gap);
      doc.setFillColor(...PDF_THEME.white);
      doc.roundedRect(x, y, cellWidth, cellHeight, 3, 3, 'F');
      doc.setDrawColor(...PDF_THEME.border);
      doc.roundedRect(x, y, cellWidth, cellHeight, 3, 3, 'S');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.8);
      doc.setTextColor(...PDF_THEME.muted);
      doc.text(field.label.toUpperCase(), x + 3, y + 6);

      doc.setFontSize(8.5);
      doc.setTextColor(...PDF_THEME.ink);
      const lines = doc.splitTextToSize(field.value, cellWidth - 6).slice(0, 2);
      doc.text(lines, x + 3, y + 12);
    });

    return y + cellHeight + 5;
  }

  private addProgressionItem(
    doc: JsPdfDocument,
    y: number,
    margin: number,
    contentWidth: number,
    item: PdfProgressionItem,
    pageHeight: number,
  ): number {
    const gap = 3;
    const panelAreaWidth = contentWidth - 10;
    const panelWidth = item.nextBehaviour ? (panelAreaWidth - gap) / 2 : panelAreaWidth;
    const observedText = this.htmlToText(item.behaviour.description);
    const nextText = item.nextBehaviour ? this.htmlToText(item.nextBehaviour.description) : '';
    const observedHeight = this.measurePanelHeight(doc, panelWidth, 'What you observed', observedText);
    const nextHeight = item.nextBehaviour
      ? this.measurePanelHeight(doc, panelWidth, 'What is likely to be the next step in learning progression', nextText)
      : 0;
    const itemHeight = 15 + Math.max(observedHeight, nextHeight);

    y = this.ensureSpace(doc, y, itemHeight + 5, margin, pageHeight);
    doc.setFillColor(...PDF_THEME.panel);
    doc.roundedRect(margin, y, contentWidth, itemHeight, 4, 4, 'F');
    doc.setDrawColor(...PDF_THEME.border);
    doc.roundedRect(margin, y, contentWidth, itemHeight, 4, 4, 'S');
    doc.setFillColor(...PDF_THEME.blue);
    doc.rect(margin, y, 2.2, itemHeight, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...PDF_THEME.blue);
    doc.text(item.element.name, margin + 7, y + 9);

    const panelY = y + 13;
    this.addEvidencePanel(doc, margin + 5, panelY, panelWidth, observedHeight, 'What you observed', observedText);

    if (item.nextBehaviour) {
      this.addEvidencePanel(
        doc,
        margin + 5 + panelWidth + gap,
        panelY,
        panelWidth,
        nextHeight,
        'What is likely to be the next step in learning progression',
        nextText,
      );
    }

    return y + itemHeight + 5;
  }

  private addEvidencePanel(
    doc: JsPdfDocument,
    x: number,
    y: number,
    width: number,
    height: number,
    title: string,
    body: string,
  ): void {
    doc.setFillColor(...PDF_THEME.white);
    doc.roundedRect(x, y, width, height, 3, 3, 'F');
    doc.setDrawColor(...PDF_THEME.border);
    doc.roundedRect(x, y, width, height, 3, 3, 'S');
    this.addPanelText(doc, x + 4, y + 6, width - 8, title, body);
  }

  private addTextCard(
    doc: JsPdfDocument,
    y: number,
    margin: number,
    contentWidth: number,
    title: string,
    body: string,
  ): number {
    const text = this.htmlToText(body);
    const height = this.measurePanelHeight(doc, contentWidth, title, text);
    doc.setFillColor(...PDF_THEME.panel);
    doc.roundedRect(margin, y, contentWidth, height, 4, 4, 'F');
    doc.setDrawColor(...PDF_THEME.border);
    doc.roundedRect(margin, y, contentWidth, height, 4, 4, 'S');
    this.addPanelText(doc, margin + 5, y + 7, contentWidth - 10, title, text);

    return y + height + 5;
  }

  private addPanelText(
    doc: JsPdfDocument,
    x: number,
    y: number,
    width: number,
    title: string,
    body: string,
  ): void {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(...PDF_THEME.blue);
    const titleLines = doc.splitTextToSize(title.toUpperCase(), width);
    doc.text(titleLines, x, y, { lineHeightFactor: 1.15 });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.4);
    doc.setTextColor(...PDF_THEME.ink);
    const lines = doc.splitTextToSize(body || 'Not entered', width);
    doc.text(lines, x, y + titleLines.length * 3.2 + 3, { lineHeightFactor: 1.25 });
  }

  private measurePanelHeight(
    doc: JsPdfDocument,
    width: number,
    title: string,
    body: string,
  ): number {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.4);
    const lines = doc.splitTextToSize(body || 'Not entered', width - 12);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    const titleLines = doc.splitTextToSize(title.toUpperCase(), width - 12);
    return Math.max(21, 8 + titleLines.length * 3.2 + lines.length * 3.8);
  }

  private ensureSpace(
    doc: JsPdfDocument,
    y: number,
    requiredHeight: number,
    margin: number,
    pageHeight: number,
  ): number {
    if (y + requiredHeight <= pageHeight - margin) {
      return y;
    }

    doc.addPage();
    return margin;
  }

  private addPageFooters(doc: JsPdfDocument): void {
    const pageCount = doc.getNumberOfPages();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    for (let page = 1; page <= pageCount; page += 1) {
      doc.setPage(page);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(...PDF_THEME.muted);
      doc.text(`Kindergarten Learning Progression Toolkit | Page ${page} of ${pageCount}`, pageWidth / 2, pageHeight - 8, {
        align: 'center',
      });
    }
  }

  formatDateForPdf(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(d.getTime())) return 'Not specified';
    const day = d.getDate();
    const month = MONTHS[d.getMonth()];
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  }

  formatEducatorName(name: string | undefined): string {
    return name ?? 'Not provided';
  }

  resolveDomainName(domainId: string): string {
    return this.domainData.getAllDomains().find((d) => d.id === domainId)?.name ?? 'Not specified';
  }

  resolveSubDomainName(subDomainId: string): string {
    return this.domainData
      .getAllDomains()
      .flatMap((d) => d.subDomains ?? [])
      .find((s) => s.id === subDomainId)?.name ?? 'Not specified';
  }

  resolveElementName(elementId: string): string {
    return this.domainData
      .getAllDomains()
      .flatMap((d) => {
        const direct = d.elements ?? [];
        const subDomainElements = (d.subDomains ?? []).flatMap((sd) => sd.elements ?? []);
        return [...direct, ...subDomainElements];
      })
      .find((e) => e.id === elementId)?.name ?? 'Not specified';
  }

  resolveBehaviourName(behaviourId: string): string {
    return this.domainData
      .getAllDomains()
      .flatMap((d) => {
        const direct = d.elements ?? [];
        const subDomainElements = (d.subDomains ?? []).flatMap((sd) => sd.elements ?? []);
        return [...direct, ...subDomainElements];
      })
      .flatMap((e) => e.behaviours ?? [])
      .find((b) => b.id === behaviourId)?.name ?? 'Not specified';
  }

  getFieldLabel(fieldName: string): string {
    return FORM_FIELD_LABELS[fieldName] ?? fieldName;
  }

  private shouldOpenPdfInNewTab(): boolean {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return false;
    }

    const userAgent = navigator.userAgent;
    const isIosDevice =
      /iPad|iPhone|iPod/.test(userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const isSafari = /Safari/.test(userAgent) && !/CriOS|FxiOS|EdgiOS|OPiOS/.test(userAgent);

    return isIosDevice && isSafari;
  }

  private resolveDomain(domainId: string): KlptDomain | undefined {
    return this.domainData.getAllDomains().find((domain) => domain.id === domainId);
  }

  private progressionItems(session: SessionModel): PdfProgressionItem[] {
    const allElements = this.allElements();

    return session.elements
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
      .filter((item): item is PdfProgressionItem => Boolean(item));
  }

  private allElements(): KlptElement[] {
    return this.domainData
      .getAllDomains()
      .flatMap((domain) => [
        ...(domain.elements ?? []),
        ...(domain.subDomains ?? []).flatMap((subDomain) => subDomain.elements ?? []),
      ]);
  }

  private formValue(session: SessionModel, name: string): string {
    return session.formFields.find((field) => field.name === name)?.value ?? '';
  }

  private displayValue(value: string | undefined): string {
    return value?.trim() ? value : 'Not entered';
  }

  private formatFormDate(value: string): string {
    return value ? this.formatDateForPdf(value) : '';
  }

  private htmlToText(value: string): string {
    return value
      .replace(/<\/li>\s*<li>/gi, '\n')
      .replace(/<li>/gi, '- ')
      .replace(/<\/?(ul|ol)>/gi, '\n')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/p>\s*<p>/gi, '\n\n')
      .replace(/<[^>]+>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&#39;/g, "'")
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }
}
