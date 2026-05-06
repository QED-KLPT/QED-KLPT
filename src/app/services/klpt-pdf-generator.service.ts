import { Injectable } from '@angular/core';
import type { SessionModel } from '../components/klpt/models/session-model';
import type { jsPDF as JsPdfDocument } from 'jspdf';
import { KlptDomainDataService } from '../components/klpt/components/shared/klpt-domain-data.service';

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
    doc.setTextColor(0, 0, 0);
    doc.text('Learning Progression Toolkit — Session Report', pageWidth / 2, y, { align: 'center' });
    y += 15;

    doc.setDrawColor(70, 130, 180);
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += 12;

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    y = this.addSection(doc, y, margin, contentWidth, 'Session Details', [
      { label: "Observer's name", value: this.formatEducatorName(session.educatorName) },
      { label: 'Learner Code', value: session.learnerCode || 'Not provided' },
      { label: 'Date Created', value: this.formatDateForPdf(new Date()) },
      { label: 'Domain', value: this.resolveDomainName(session.domain) },
      { label: 'Sub-Domain', value: session.subDomain ? this.resolveSubDomainName(session.subDomain) : 'Not specified' },
    ]);

    if (session.formFields.length > 0) {
      const tableData = session.formFields.map((field) => {
        let value = field.value;
        if (field.name === 'date' && value) {
          const d = new Date(value);
          if (!isNaN(d.getTime())) {
            value = `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
          }
        }
        return [this.getFieldLabel(field.name), value];
      });
      const maxFieldWidth = Math.max(...tableData.map((row) => doc.getTextWidth(row[0]))) + 6;
      autoTable(doc, {
        startY: y + 2,
        head: [['Field', 'Value']],
        body: tableData,
        margin: { left: margin, right: margin },
        theme: 'grid',
        headStyles: { fillColor: [70, 130, 180] },
        styles: { fontSize: 9, textColor: [0, 0, 0], fillColor: [255, 255, 255] },
        columnStyles: {
          0: { cellWidth: maxFieldWidth, fontStyle: 'bold' },
        },
      });
      y = (doc as any).lastAutoTable.finalY + 10;
    }

    if (session.elements.length > 0) {
      doc.setFontSize(13);
      doc.setTextColor(0, 0, 0);
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
        headStyles: { fillColor: [70, 130, 180] },
        styles: { fontSize: 9, textColor: [0, 0, 0], fillColor: [255, 255, 255] },
      });
    }

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
    doc.setTextColor(0, 0, 0);
    doc.text(title, margin, y);
    y += 8;

    if (fields.length > 0) {
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      for (const field of fields) {
        const label = `${field.label}:`;
        doc.setFont('helvetica', 'bold');
        doc.text(label, margin + 47, y, { align: 'right' });
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

  formatDateForPdf(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(d.getTime())) return 'Not specified';
    const day = d.getDate();
    const month = MONTHS[d.getMonth()];
    const year = d.getFullYear();
    const hours = d.getHours();
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    const displayHours = String(hours % 12 || 12).padStart(2, '0');
    return `${day} ${month} ${year}, ${displayHours}:${minutes} ${ampm}`;
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
