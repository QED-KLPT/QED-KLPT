import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavItem, QldMainNav } from '../shared/qld-main-nav/qld-main-nav';

@Component({
  selector: 'app-testing-navigational-horizontal',
  imports: [QldMainNav],
  templateUrl: './testing-navigational-horizontal.html',
  styleUrl: './testing-navigational-horizontal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestingNavigationalHorizontal {

  example1Items: NavItem[] = [
    { label: 'Quality observations', href: '/foundations/quality-observations' },
    { label: 'Analysing data', href: '/foundations/analysing-data' },
    { label: 'Learning domains', href: '/learning-domains' },
    { label: 'KLPT tool', href: '/klpt-tool' },
    { label: 'Practice supports', href: '/practice-supports' },
  ];

  example2Items: NavItem[] = [
    { label: 'Quality observations', href: '/foundations/quality-observations' },
    { label: 'Analysing data', href: '/foundations/analysing-data' },
    { label: 'Learning domains', href: '/learning-domains' },
    { label: 'KLPT tool', href: '/klpt-tool' },
    { label: 'Practice supports', href: '/practice-supports' },
  ];

  example3Items: NavItem[] = [
    { label: 'Quality observations', href: '/foundations/quality-observations', icon: 'fa-light fa-eye' },
    { label: 'Analysing data', href: '/foundations/analysing-data', icon: 'fa-light fa-chart-bar' },
    { label: 'Learning domains', href: '/learning-domains', icon: 'fa-light fa-book-open' },
    { label: 'KLPT tool', href: '/klpt-tool', icon: 'fa-light fa-tools' },
    { label: 'Practice supports', href: '/practice-supports', icon: 'fa-light fa-hands-helping' },
  ];

  example4Items: NavItem[] = [
    { label: 'Foundations', href: '/foundations', children: [
      { label: 'Quality observations', href: '/foundations/quality-observations' },
      { label: 'Analysing data', href: '/foundations/analysing-data' },
    ]},
    { label: 'Learning domains', href: '/learning-domains' },
    { label: 'KLPT tool', href: '/klpt-tool' },
    { label: 'Practice supports', href: '/practice-supports' },
  ];

  example5Items: NavItem[] = [
    { label: 'Foundations', href: '/foundations', children: [
      { label: 'Quality observations', href: '/foundations/quality-observations' },
      { label: 'Analysing data', href: '/foundations/analysing-data' },
      { label: 'Assessment planning', href: '#' },
      { label: 'Evidence collection', href: '#' },
      { label: 'Review cycles', href: '#' },
      { label: 'Reporting', href: '#' },
    ]},
    { label: 'Learning domains', href: '/learning-domains' },
    { label: 'KLPT tool', href: '/klpt-tool' },
  ];

  example6Items: NavItem[] = [
    { label: 'Foundations', href: '/foundations', children: [
      { label: 'Quality observations', href: '/foundations/quality-observations', description: 'Guidelines for making reliable, valid observations in kindergarten settings.' },
      { label: 'Analysing data', href: '/foundations/analysing-data', description: 'Methods for interpreting observation data to inform teaching practice.' },
      { label: 'Assessment planning', href: '#', description: 'Structured approaches to planning assessment activities.' },
      { label: 'Evidence collection', href: '#', description: 'Techniques for gathering meaningful evidence of child learning.' },
      { label: 'Review cycles', href: '#', description: 'Regular review processes to ensure assessment quality.' },
      { label: 'Reporting', href: '#', description: 'Communicating assessment findings to stakeholders.' },
    ]},
    { label: 'Learning domains', href: '/learning-domains' },
    { label: 'KLPT tool', href: '/klpt-tool' },
  ];

  example7Items: NavItem[] = [
    { label: 'Foundations', href: '/foundations', children: [
      { label: 'Quality observations', href: '/foundations/quality-observations' },
      { label: 'Analysing data', href: '/foundations/analysing-data' },
      { label: 'Assessment planning', href: '#' },
      { label: 'Evidence collection', href: '#' },
      { label: 'Review cycles', href: '#' },
      { label: 'Reporting', href: '#' },
    ]},
    { label: 'Learning domains', href: '/learning-domains' },
    { label: 'KLPT tool', href: '/klpt-tool' },
  ];

  example8Items: NavItem[] = [
    { label: 'Quality observations', href: '/foundations/quality-observations' },
    { label: 'Analysing data', href: '/foundations/analysing-data' },
    { label: 'Learning domains', href: '/learning-domains' },
    { label: 'KLPT tool', href: '/klpt-tool' },
    { label: 'Practice supports', href: '/practice-supports' },
  ];

  example9Items: NavItem[] = [
    { label: 'Foundations', href: '/foundations', children: [
      { label: 'Quality observations', href: '/foundations/quality-observations' },
      { label: 'Analysing data', href: '/foundations/analysing-data' },
    ]},
    { label: 'Language and literacy', href: '/learning-domains/language-and-literacy' },
    { label: 'Executive function', href: '/learning-domains/executive-function' },
    { label: 'Social and emotional learning', href: '/learning-domains/social-and-emotional-learning' },
    { label: 'Physicality', href: '/learning-domains/physicality' },
    { label: 'Mathematics and numeracy', href: '/learning-domains/mathematics-and-numeracy' },
  ];

  example10Items: NavItem[] = [
    { label: 'Foundations', href: '/foundations', icon: 'fa-light fa-shield-halved', children: [
      { label: 'Quality observations', href: '/foundations/quality-observations' },
      { label: 'Analysing data', href: '/foundations/analysing-data' },
    ]},
    { label: 'Learning domains', href: '/learning-domains', icon: 'fa-light fa-graduation-cap' },
    { label: 'KLPT tool', href: '/klpt-tool', icon: 'fa-light fa-wrench' },
    { label: 'Practice supports', href: '/practice-supports', icon: 'fa-light fa-handshake' },
    { label: 'About', href: '/about', icon: 'fa-light fa-circle-info' },
  ];

  example1Code = `<app-qld-main-nav
  [items]="example1Items"
  theme="light"
  activeItem="Learning domains">
</app-qld-main-nav>`;

  example2Code = `<app-qld-main-nav
  [items]="example2Items"
  theme="dark"
  activeItem="KLPT tool">
</app-qld-main-nav>`;

  example3Code = `<app-qld-main-nav
  [items]="example3Items"
  theme="light"
  activeItem="Learning domains">
</app-qld-main-nav>`;

  example4Code = `<app-qld-main-nav
  [items]="example4Items"
  theme="light"
  activeItem="Foundations">
</app-qld-main-nav>`;

  example5Code = `<app-qld-main-nav
  [items]="example5Items"
  theme="light"
  activeItem="Assessment planning">
</app-qld-main-nav>`;

  example6Code = `<app-qld-main-nav
  [items]="example6Items"
  theme="light"
  activeItem="Quality observations">
</app-qld-main-nav>`;

  example7Code = `<app-qld-main-nav
  [items]="example7Items"
  theme="dark"
  activeItem="Foundations">
</app-qld-main-nav>`;

  example8Code = `<app-qld-main-nav
  [items]="example8Items"
  theme="light"
  activeItem="Analysing data">
</app-qld-main-nav>`;

  example9Code = `<app-qld-main-nav
  [items]="example9Items"
  theme="light"
  activeItem="Executive function">
</app-qld-main-nav>`;

  example10Code = `<app-qld-main-nav
  [items]="example10Items"
  theme="light"
  activeItem="Foundations">
</app-qld-main-nav>`;
}
