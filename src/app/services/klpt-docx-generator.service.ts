import { Injectable } from '@angular/core';
import type { SessionModel } from '../components/klpt-learning-observation-tool/models/session-model';
import { KlptDomainDataService } from '../components/klpt-learning-observation-tool/components/shared/klpt-domain-data.service';
import type { KlptBehaviour } from '../components/klpt-learning-observation-tool/models/klpt-behaviour';
import type { KlptDomain } from '../components/klpt-learning-observation-tool/models/klpt-domain';
import type { KlptElement } from '../components/klpt-learning-observation-tool/models/klpt-element';
import type { KlptSubDomain } from '../components/klpt-learning-observation-tool/models/klpt-sub-domain';
import { HIGHEST_BEHAVIOUR_HTML } from '../components/klpt-learning-observation-tool/components/shared/klpt-constants';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
  Footer,
  PageNumber,
} from 'docx';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const FORM_FIELD_LABELS: Record<string, string> = {
  'child-name': 'Child name',
  'date': 'Date',
  'observational-context': 'Context',
  'professional-reflection': 'Professional Reflection',
  'support-learning': 'Support Learning',
  'qklg-eylf-links': 'QKLG and EYLF Links',
};

const COLORS = {
  ink: '000000',
  muted: '526985',
  blue: '0D3B66',
  white: 'FFFFFF',
};

const TYPOGRAPHY = {
  heading: {
    bold: true,
    size: 24,
    font: 'Helvetica',
    color: COLORS.blue,
  },
  subheading: {
    bold: true,
    size: 16,
    font: 'Helvetica',
    color: COLORS.blue,
  },
  body: {
    bold: false,
    size: 18,
    font: 'Helvetica',
    color: COLORS.ink,
  },
  muted: {
    bold: false,
    size: 14,
    font: 'Helvetica',
    color: COLORS.muted,
  },
};


interface DocxProgressionItem {
  subDomain: KlptSubDomain | undefined;
  element: KlptElement;
  behaviour: KlptBehaviour;
  nextBehaviour: KlptBehaviour | undefined;
}

interface GenerateSessionDocxOptions {
  learnerName?: string;
}

@Injectable({ providedIn: 'root' })
export class KlptDocxGeneratorService {
  constructor(private readonly domainData: KlptDomainDataService) {}

  async generateSessionDocx(
    session: SessionModel,
    options: GenerateSessionDocxOptions = {},
  ): Promise<void> {
    const domain = this.resolveDomain(session.domain);
    const progressionItems = this.progressionItems(session);

    const children: (Paragraph | Table)[] = [];

    children.push(this.createHeaderBar());

    const metadataFields = [
      { label: 'Date', value: this.displayValue(this.formatFormDate(this.formValue(session, 'date'))) },
      { label: "Observer name", value: this.displayValue(session.educatorName) },
      { label: 'Learner code', value: this.displayValue(session.learnerCode) },
      { label: 'Child name', value: options.learnerName?.trim() ?? '' },
    ];
    children.push(this.createMetadataTable(metadataFields));

    if (domain) {
      children.push(new Paragraph({ spacing: { before: 200, after: 100 } }));
      children.push(...this.createTextCard('Learning domain summary', `${domain.name}: ${domain.summary}`));
    }

    children.push(new Paragraph({ spacing: { before: 200, after: 100 } }));
    children.push(...this.createTextCard(
      'Description of observation context or evidence collected',
      this.displayValue(this.formValue(session, 'observational-context')),
    ));

    for (const item of progressionItems) {
      children.push(new Paragraph({ spacing: { before: 200, after: 100 } }));
      children.push(...this.createProgressionItem(item));
    }

    children.push(new Paragraph({ spacing: { before: 200, after: 100 } }));
    children.push(...this.createTextCard(
      'Professional reflection',
      this.displayValue(this.formValue(session, 'professional-reflection')),
    ));

    children.push(new Paragraph({ spacing: { before: 100, after: 100 } }));
    children.push(...this.createTextCard(
      'How can you support this learning',
      this.displayValue(this.formValue(session, 'support-learning')),
    ));

    children.push(new Paragraph({ spacing: { before: 100, after: 100 } }));
    children.push(...this.createTextCard(
      'What QKLG learning and development area(s) and significant learnings and EYLF learning outcomes are reflected in this learning?',
      this.displayValue(this.formValue(session, 'qklg-eylf-links')),
    ));

    const doc = new Document({
      sections: [{
        footers: {
          default: new Footer({
            children: [this.createPageFooter()],
          }),
        },
        children,
      }],
    });

    const blob = await Packer.toBlob(doc);
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
    const filename = `klpt-session-${learnerCode}-${dateStr}.docx`;

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  private createHeaderBar(): Paragraph {
    return new Paragraph({
      children: [
        new TextRun({
          text: 'Learning progression statement',
          ...TYPOGRAPHY.heading,
        }),
      ],
      spacing: { before: 100, after: 200 },
      border: {
        bottom: {
          style: BorderStyle.SINGLE,
          size: 1,
          color: '000000',
        },
      },
    });
  }

  private createMetadataTable(fields: { label: string; value: string }[]): Table {
    const columns = Math.min(fields.length, 4);
    const cellWidth = Math.floor(100 / columns);

    const rows: TableRow[] = [];
    for (let rowIndex = 0; rowIndex < Math.ceil(fields.length / columns); rowIndex++) {
      const rowCells: TableCell[] = [];
      for (let colIndex = 0; colIndex < columns && (rowIndex * columns + colIndex) < fields.length; colIndex++) {
        const field = fields[rowIndex * columns + colIndex];
        rowCells.push(
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({ 
                    text: field.label, 
                    ...TYPOGRAPHY.muted 
                  }),
                ],
                spacing: { before: 4, after: 2 },
              }),
              new Paragraph({
                children: [
                  new TextRun({ 
                    text: field.value, 
                    ...TYPOGRAPHY.body 
                  }),
                ],
                spacing: { before: 2, after: 4 },
              }),
            ],
            width: { size: cellWidth, type: WidthType.PERCENTAGE },
            verticalAlign: AlignmentType.CENTER,
          }),
        );
      }
      rows.push(new TableRow({ children: rowCells }));
    }

    return new Table({
      rows,
      width: { size: 100, type: WidthType.PERCENTAGE },
    });
  }

  private createTextCard(title: string, body: string): Paragraph[] {
    const bodyText = this.htmlToText(body) || 'Not entered';
    const bodyLines = this.wrapText(bodyText, 80);

    return [
      new Paragraph({
        children: [new TextRun({ text: title, ...TYPOGRAPHY.subheading })],
        spacing: { before: 200, after: 100 },
      }),
      ...bodyLines.map((line) =>
        new Paragraph({
          children: [new TextRun({ text: line, ...TYPOGRAPHY.body })],
          spacing: { before: 2, after: 2 },
        }),
      ),
    ];
  }

  private createProgressionItem(item: DocxProgressionItem): Paragraph[] {
    const observedText = this.htmlToText(item.behaviour.description);
    const nextText = item.nextBehaviour
      ? this.htmlToText(item.nextBehaviour.description)
      : this.htmlToText(HIGHEST_BEHAVIOUR_HTML);

    const observedLines = this.wrapText(observedText, 80);
    const nextLines = nextText ? this.wrapText(nextText, 80) : [];

    const paragraphs: Paragraph[] = [];

    if (item.subDomain) {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({ text: 'SUBDOMAIN: ', ...TYPOGRAPHY.subheading }),
            new TextRun({ text: item.subDomain.name.toUpperCase(), ...TYPOGRAPHY.subheading }),
          ],
          spacing: { before: 400, after: 120 },
        }),
      );
    }

    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({ text: 'KEY ELEMENT: ', ...TYPOGRAPHY.subheading }),
          new TextRun({ text: item.element.name.toUpperCase(), ...TYPOGRAPHY.heading }),
        ],
        spacing: { before: item.subDomain ? 0 : 400, after: 200 },
      }),
    );

    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({ text: 'What you observed:', ...TYPOGRAPHY.subheading }),
          new TextRun({ text: ' ', ...TYPOGRAPHY.body }),
          ...observedLines.map(line => new TextRun({ text: line, ...TYPOGRAPHY.body })),
        ],
        spacing: { before: 100, after: 100 },
      }),
    );

    if (nextText) {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({ text: 'What is likely to be the next step in learning progression:', ...TYPOGRAPHY.subheading }),
            new TextRun({ text: ' ', ...TYPOGRAPHY.body }),
            ...nextLines.map(line => new TextRun({ text: line, ...TYPOGRAPHY.body })),
          ],
          spacing: { before: 200, after: 100 },
        }),
      );
    }

    return paragraphs;
  }


  private createPageFooter(): Paragraph {
    return new Paragraph({
      children: [
        new TextRun({
          text: 'Kindergarten Learning Progression Toolkit | Page ',
          size: 16,
          font: 'Helvetica',
          color: COLORS.muted,
        }),
        new TextRun({
          children: [PageNumber.CURRENT],
          size: 16,
          font: 'Helvetica',
          color: COLORS.muted,
        }),
        new TextRun({
          text: ' of ',
          size: 16,
          font: 'Helvetica',
          color: COLORS.muted,
        }),
        new TextRun({
          children: [PageNumber.TOTAL_PAGES],
          size: 16,
          font: 'Helvetica',
          color: COLORS.muted,
        }),
      ],
      alignment: AlignmentType.CENTER,
    });
  }

  private createBorder() {
    return {
      style: BorderStyle.SINGLE,
      size: 1,
      color: '000000',
    };
  }

  private wrapText(text: string, maxCharsPerLine: number): string[] {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    for (const word of words) {
      if ((currentLine + word).length > maxCharsPerLine && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = currentLine ? `${currentLine} ${word}` : word;
      }
    }

    if (currentLine) {
      lines.push(currentLine);
    }

    return lines || ['Not entered'];
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

  formatDateForDocx(date: Date | string): string {
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

  private resolveDomain(domainId: string): KlptDomain | undefined {
    return this.domainData.getAllDomains().find((domain) => domain.id === domainId);
  }

  private progressionItems(session: SessionModel): DocxProgressionItem[] {
    const allElements = this.allElements();
    const subDomain = this.resolveSubDomain(session.subDomain);

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
          subDomain,
          element,
          behaviour,
          nextBehaviour: element.behaviours.find(
            (candidate) => candidate.index === behaviour.index + 1,
          ),
        };
      })
      .filter((item): item is DocxProgressionItem => Boolean(item));
  }

  private allElements(): KlptElement[] {
    return this.domainData
      .getAllDomains()
      .flatMap((domain) => [
        ...(domain.elements ?? []),
        ...(domain.subDomains ?? []).flatMap((subDomain) => subDomain.elements ?? []),
      ]);
  }

  private resolveSubDomain(subDomainId: string | undefined): KlptSubDomain | undefined {
    if (!subDomainId) {
      return undefined;
    }

    return this.domainData
      .getAllDomains()
      .flatMap((domain) => domain.subDomains ?? [])
      .find((subDomain) => subDomain.id === subDomainId);
  }

  private formValue(session: SessionModel, name: string): string {
    return session.formFields.find((field) => field.name === name)?.value ?? '';
  }

  private displayValue(value: string | undefined): string {
    return value?.trim() ? value : 'Not entered';
  }

  private formatFormDate(value: string): string {
    return value ? this.formatDateForDocx(value) : '';
  }
}
