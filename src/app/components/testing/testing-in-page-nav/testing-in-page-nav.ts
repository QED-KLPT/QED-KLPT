import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InPageNavComponent, InPageNavItem } from '../../shared/in-page-nav/in-page-nav.component';

@Component({
  selector: 'app-testing-in-page-nav',
  imports: [InPageNavComponent],
  templateUrl: './testing-in-page-nav.html',
  styleUrl: './testing-in-page-nav.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestingInPageNav {
  basicLinks: InPageNavItem[] = [
    { label: 'Overview', href: '#section__overview' },
    { label: 'Example', href: '#section__example' },
    { label: 'Usage guidelines', href: '#section__usageguidelines' },
    { label: 'Research and rationale', href: '#section__researchandrationale' },
    { label: 'References', href: '#section__references' },
  ];

  customHeadingLinks: InPageNavItem[] = [
    { label: 'Getting Started', href: '#getting-started' },
    { label: 'Installation', href: '#installation' },
    { label: 'Configuration', href: '#configuration' },
    { label: 'Basic Usage', href: '#basic-usage' },
    { label: 'Advanced Topics', href: '#advanced-topics' },
  ];

  shortLinks: InPageNavItem[] = [
    { label: 'Introduction', href: '#introduction' },
    { label: 'Key Features', href: '#key-features' },
    { label: 'Conclusion', href: '#conclusion' },
  ];

  longLinks: InPageNavItem[] = [
    { label: 'Introduction', href: '#introduction' },
    { label: 'Background', href: '#background' },
    { label: 'Objectives', href: '#objectives' },
    { label: 'Methodology', href: '#methodology' },
    { label: 'Data Collection', href: '#data-collection' },
    { label: 'Analysis Framework', href: '#analysis-framework' },
    { label: 'Results', href: '#results' },
    { label: 'Discussion', href: '#discussion' },
    { label: 'Recommendations', href: '#recommendations' },
    { label: 'Conclusion', href: '#conclusion' },
    { label: 'Appendices', href: '#appendices' },
  ];

  h2OnlyLinks: InPageNavItem[] = [
    { label: 'Section One', href: '#section-one' },
    { label: 'Section Two', href: '#section-two' },
    { label: 'Section Three', href: '#section-three' },
    { label: 'Section Four', href: '#section-four' },
  ];

  descriptiveLinks: InPageNavItem[] = [
    { label: 'Understanding the Assessment Framework', href: '#understanding-assessment' },
    { label: 'Implementing Formative Assessment Practices', href: '#implementing-formative' },
    { label: 'Analyzing Student Progress Data', href: '#analyzing-progress' },
    { label: 'Communicating Results to Stakeholders', href: '#communicating-results' },
    { label: 'Planning for Continuous Improvement', href: '#planning-improvement' },
  ];

  nestedLinks: InPageNavItem[] = [
    { label: 'Language and Literacy', href: '#language-literacy' },
    { label:  'Phonological Awareness', href: '#phonological-awareness' },
    { label: 'Print Knowledge', href: '#print-knowledge' },
    { label: 'Oral Language', href: '#oral-language' },
    { label: 'Social and Emotional Learning', href: '#social-emotional' },
    { label: 'Self-Regulation', href: '#self-regulation' },
    { label: 'Social Skills', href: '#social-skills' },
  ];

  stickyLinks: InPageNavItem[] = [
    { label: 'Part One', href: '#part-one' },
    { label: 'Part Two', href: '#part-two' },
    { label: 'Part Three', href: '#part-three' },
    { label: 'Part Four', href: '#part-four' },
  ];

  accessibilityLinks: InPageNavItem[] = [
    { label: 'Section A', href: '#section-a' },
    { label: 'Section B', href: '#section-b' },
    { label: 'Section C', href: '#section-c' },
  ];

  get basicCode(): string {
    return `<app-in-page-nav [items]="basicLinks"></app-in-page-nav>`;
  }

  get customHeadingCode(): string {
    return `<app-in-page-nav heading="Contents" [items]="customHeadingLinks"></app-in-page-nav>`;
  }

  get shortCode(): string {
    return `<app-in-page-nav [items]="shortLinks"></app-in-page-nav>`;
  }

  get longCode(): string {
    return `<app-in-page-nav [items]="longLinks"></app-in-page-nav>`;
  }

  get darkCode(): string {
    return `<app-in-page-nav [items]="h2OnlyLinks" variant="dark"></app-in-page-nav>`;
  }

  get h2OnlyCode(): string {
    return `<app-in-page-nav [items]="h2OnlyLinks"></app-in-page-nav>`;
  }

  get descriptiveCode(): string {
    return `<app-in-page-nav [items]="descriptiveLinks"></app-in-page-nav>`;
  }

  get nestedCode(): string {
    return `<app-in-page-nav [items]="nestedLinks"></app-in-page-nav>`;
  }

  get stickyCode(): string {
    return `<app-in-page-nav [items]="stickyLinks"></app-in-page-nav>`;
  }

  get accessibilityCode(): string {
    return `<app-in-page-nav [items]="accessibilityLinks" heading="On this page"></app-in-page-nav>`;
  }
}
