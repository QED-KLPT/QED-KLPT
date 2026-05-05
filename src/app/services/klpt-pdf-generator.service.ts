import { Injectable } from '@angular/core';
import type { SessionModel } from '../components/klpt/models/session-model';
import type { jsPDF as JsPdfDocument } from 'jspdf';
import { KlptDomainDataService } from '../components/klpt/shared/klpt-domain-data.service';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const FORM_FIELD_LABELS: Record<string, string> = {
  'student-name': 'Learner Name',
  'date': 'Date',
  'observational-context': 'Context',
  'professional-reflection': 'Professional Reflection',
  'support-learning': 'Support Learning',
};

@Injectable({ providedIn: 'root' })
export class KlptPdfGeneratorService {
  constructor(private readonly domainData: KlptDomainDataService) {}

  async generateSessionPdf(session: SessionModel): Promise<void> {
    const [{ jsPDF }, { autoTable }] = await Promise.all([
      import('jspdf'),
      import('jspdf-autotable'),
    ]);
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 20;
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;

    doc.setFontSize(18);
    doc.setTextColor(49, 36, 0);
    doc.text('Learning Progression Toolkit — Session Report', margin, y);
    y += 15;

    doc.setDrawColor(200, 180, 100);
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += 12;

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    y = this.addSection(doc, y, margin, contentWidth, 'Session Details', [
      { label: 'Educator Name', value: this.formatEducatorName(session.educatorName) },
      { label: 'Learner Code', value: session.learnerCode || 'Not provided' },
      { label: 'Date Created', value: this.formatDateForPdf(session.created) },
      { label: 'Domain', value: this.resolveDomainName(session.domain) },
      { label: 'Sub-Domain', value: session.subDomain ? this.resolveSubDomainName(session.subDomain) : 'Not specified' },
    ]);

    if (session.formFields.length > 0) {
      y = this.addSection(doc, y, margin, contentWidth, 'Form Fields', []);
      const tableData = session.formFields.map((field) => [this.getFieldLabel(field.name), field.value]);
      autoTable(doc, {
        startY: y + 2,
        head: [['Field', 'Value']],
        body: tableData,
        margin: { left: margin, right: margin },
        theme: 'grid',
        headStyles: { fillColor: [218, 195, 100] },
        styles: { fontSize: 9 },
      });
      y += 10 + tableData.length * 8;
    }

    if (session.elements.length > 0) {
      y = this.addSection(doc, y, margin, contentWidth, 'Selected Elements', []);
      const elementData = session.elements.map((el) => [
        el.id,
        el.behaviourId || 'No behaviour selected',
      ]);
      autoTable(doc, {
        startY: y + 2,
        head: [['Element ID', 'Behaviour']],
        body: elementData,
        margin: { left: margin, right: margin },
        theme: 'grid',
        headStyles: { fillColor: [218, 195, 100] },
        styles: { fontSize: 9 },
      });
    }

    const pages = doc.internal.pages as unknown as string[];
    const totalPages = pages.length;
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      const footerY = doc.internal.pageSize.getHeight() - 10;
      doc.text(
        `Page ${i} of ${totalPages}`,
        pageWidth / 2,
        footerY,
        { align: 'center' }
      );
    }

    const filename = `klpt-session-${session.id}.pdf`;
    doc.save(filename);
  }

  private addSection(
    doc: JsPdfDocument,
    y: number,
    margin: number,
    contentWidth: number,
    title: string,
    fields: { label: string; value: string }[],
  ): number {
    doc.setFontSize(13);
    doc.setTextColor(49, 36, 0);
    doc.text(title, margin, y);
    y += 8;

    if (fields.length > 0) {
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      for (const field of fields) {
        const label = `${field.label}:`;
        doc.setFont('helvetica', 'bold');
        doc.text(label, margin + 5, y);
        doc.setFont('helvetica', 'normal');
        const valueWidth = doc.getTextWidth(field.value);
        const availableWidth = contentWidth - 60;
        if (valueWidth > availableWidth) {
          const lines = doc.splitTextToSize(field.value, availableWidth);
          doc.text(lines, margin + 50, y);
          y += lines.length * 5;
        } else {
          doc.text(field.value, margin + 50, y);
          y += 6;
        }
      }
    }

    return y + 5;
  }

  formatDateForPdf(date: Date): string {
    const day = date.getDate();
    const month = MONTHS[date.getMonth()];
    const year = date.getFullYear();
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

  getFieldLabel(fieldName: string): string {
    return FORM_FIELD_LABELS[fieldName] ?? fieldName;
  }
}
