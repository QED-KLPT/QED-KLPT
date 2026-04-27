import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BreadcrumbComponent, BreadcrumbItem } from '../../shared/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-testing-breadcrumbs',
  imports: [BreadcrumbComponent],
  templateUrl: './testing-breadcrumbs.html',
  styleUrl: './testing-breadcrumbs.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestingBreadcrumbs {
  simpleBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '#' },
    { label: 'Page', current: true },
  ];

  withHomeIconBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '#' },
    { label: 'Components', href: '#' },
    { label: 'Breadcrumbs', current: true },
  ];

  threeLevelBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '#' },
    { label: 'Learning Domains', href: '#' },
    { label: 'Language and Literacy', current: true },
  ];

  fourLevelBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '#' },
    { label: 'Learning Domains', href: '#' },
    { label: 'Physicality', href: '#' },
    { label: 'Gross Motor', current: true },
  ];

  fiveLevelBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '#' },
    { label: 'Foundations', href: '#' },
    { label: 'Quality Observations', href: '#' },
    { label: 'Analysing Data', href: '#' },
    { label: 'Deep Page', current: true },
  ];

  altBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '#' },
    { label: 'Pages', href: '#' },
    { label: 'Dark Section', current: true },
  ];

  noHomeBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Dashboard', href: '#' },
    { label: 'Reports', href: '#' },
    { label: 'Monthly Summary', current: true },
  ];

  iconBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '#' },
    { label: 'Mathematics', href: '#' },
    { label: 'Numbers', current: true },
  ];

  singleItemBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Current Page', current: true },
  ];

  partialBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '#' },
    { label: 'Practice Supports' },
    { label: 'Implementation Guide', current: true },
  ];
}
