import { ChangeDetectionStrategy, Component } from '@angular/core';
import { QldMainNav, NavItem } from '../../shared/qld-main-nav/qld-main-nav';
import { VerticalNavComponent, VerticalNavItem } from '../../shared/vertical-nav/vertical-nav.component';
import { InPageNavComponent, InPageNavItem } from '../../shared/in-page-nav/in-page-nav.component';

@Component({
  selector: 'app-testing-navigation',
  imports: [QldMainNav, VerticalNavComponent, InPageNavComponent],
  templateUrl: './testing-navigation.html',
  styleUrl: './testing-navigation.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestingNavigation {

  horizontalLightItems: NavItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Learning domains', href: '/learning-domains' },
    { label: 'KLPT tool', href: '/klpt-tool' },
    { label: 'Practice supports', href: '/practice-supports' },
  ];

  horizontalDarkItems: NavItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Learning domains', href: '/learning-domains' },
    { label: 'KLPT tool', href: '/klpt-tool' },
    { label: 'Practice supports', href: '/practice-supports' },
  ];

  horizontalIconItems: NavItem[] = [
    { label: 'Home', href: '/', icon: 'fa-light fa-house' },
    { label: 'Learning domains', href: '/learning-domains', icon: 'fa-light fa-book-open' },
    { label: 'KLPT tool', href: '/klpt-tool', icon: 'fa-light fa-tools' },
    { label: 'Practice supports', href: '/practice-supports', icon: 'fa-light fa-hands-helping' },
  ];

  horizontalDropdownItems: NavItem[] = [
    { label: 'Foundations', href: '/foundations', children: [
      { label: 'Quality observations', href: '/foundations/quality-observations' },
      { label: 'Analysing data', href: '/foundations/analysing-data' },
    ]},
    { label: 'Learning domains', href: '/learning-domains' },
    { label: 'KLPT tool', href: '/klpt-tool' },
  ];

  horizontalMegaMenuItems: NavItem[] = [
    { label: 'Foundations', href: '/foundations', children: [
      { label: 'Quality observations', href: '/foundations/quality-observations', description: 'Guidelines for making reliable, valid observations in kindergarten settings.' },
      { label: 'Analysing data', href: '/foundations/analysing-data', description: 'Methods for interpreting observation data to inform teaching practice.' },
      { label: 'Assessment planning', href: '#', description: 'Structured approaches to planning assessment activities.' },
      { label: 'Evidence collection', href: '#', description: 'Techniques for gathering meaningful evidence of child learning.' },
      { label: 'Review cycles', href: '#', description: 'Regular review processes to ensure assessment quality.' },
      { label: 'Reporting', href: '#', description: 'Communicating assessment findings to stakeholders.' },
    ]},
    { label: 'Learning domains', href: '/learning-domains' },
  ];

  verticalBasicItems: VerticalNavItem[] = [
    { label: 'Home', href: '#' },
    { label: 'Dashboard', href: '#' },
    { label: 'Profile', href: '#' },
    { label: 'Settings', href: '#' },
  ];

  verticalAccordionItems: VerticalNavItem[] = [
    { label: 'Getting Started', href: '#', children: [
      { label: 'Introduction', href: '#' },
      { label: 'Installation', href: '#' },
      { label: 'Quick Start', href: '#' },
    ]},
    { label: 'Components', href: '#', children: [
      { label: 'Buttons', href: '#' },
      { label: 'Cards', href: '#' },
      { label: 'Forms', href: '#' },
    ]},
    { label: 'Resources', href: '#', children: [
      { label: 'Documentation', href: '#' },
      { label: 'Tutorials', href: '#' },
    ]},
  ];

  verticalIconActiveItems: VerticalNavItem[] = [
    { label: 'Home', href: '#', icon: 'fa-light fa-house' },
    { label: 'Dashboard', href: '#', icon: 'fa-light fa-gauge-high', active: true },
    { label: 'Messages', href: '#', icon: 'fa-light fa-envelope' },
    { label: 'Calendar', href: '#', icon: 'fa-light fa-calendar-days' },
    { label: 'Reports', href: '#', icon: 'fa-light fa-chart-line' },
  ];

  inPageBasicItems: InPageNavItem[] = [
    { label: 'Overview', href: '#section__overview' },
    { label: 'Example', href: '#section__example' },
    { label: 'Usage guidelines', href: '#section__usageguidelines' },
    { label: 'Research and rationale', href: '#section__researchandrationale' },
    { label: 'References', href: '#section__references' },
  ];

  inPageCustomDarkItems: InPageNavItem[] = [
    { label: 'Getting Started', href: '#getting-started' },
    { label: 'Installation', href: '#installation' },
    { label: 'Configuration', href: '#configuration' },
    { label: 'Basic Usage', href: '#basic-usage' },
  ];

}
