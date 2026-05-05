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
    doc.text('Learning Progression Toolkit — Session Report', pageWidth / 2, y, { align: 'center' });
    y += 15;

    doc.setDrawColor(200, 180, 100);
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += 12;

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    y = this.addSection(doc, y, margin, contentWidth, 'Session Details', [
      { label: "Observer's name", value: this.formatEducatorName(session.educatorName) },
      { label: 'Learner Code', value: session.learnerCode || 'Not provided' },
      { label: 'Date Created', value: this.formatDateForPdf(session.created) },
      { label: 'Domain', value: this.resolveDomainName(session.domain) },
      { label: 'Sub-Domain', value: session.subDomain ? this.resolveSubDomainName(session.subDomain) : 'Not specified' },
    ]);

    if (session.formFields.length > 0) {
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
      y += 12 + tableData.length * 8;
    }

    if (session.elements.length > 0) {
      doc.setFontSize(13);
      doc.setTextColor(49, 36, 0);
      doc.text('Selected Elements', margin, y);
      y += 3;
      const elementData = session.elements.map((el) => [
        this.resolveElementName(el.id),
        el.behaviourId ? this.resolveBehaviourName(el.behaviourId) : 'No behaviour selected',
      ]);
      autoTable(doc, {
        startY: y,
        head: [['Element', 'Behaviour']],
        body: elementData,
        margin: { left: margin, right: margin },
        theme: 'grid',
        headStyles: { fillColor: [218, 195, 100] },
        styles: { fontSize: 9 },
      });
    }

    const learnerCode = session.learnerCode || 'unknown';
    const created = session.created;
    const dateStr = `${created.getFullYear()}-${MONTHS[created.getMonth()]}-${String(created.getDate()).padStart(2, '0')}-${String(created.getHours()).padStart(2, '0')}-${String(created.getMinutes()).padStart(2, '0')}`;
    const filename = `klpt-session-${learnerCode}-${dateStr}.pdf`;
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
          y += 10;
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
}
