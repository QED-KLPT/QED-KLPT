import { ChangeDetectionStrategy, Component } from '@angular/core';
import { VerticalNavComponent, VerticalNavItem } from '../shared/vertical-nav/vertical-nav.component';

@Component({
  selector: 'app-testing-navigation-vertical',
  imports: [VerticalNavComponent],
  templateUrl: './testing-navigation-vertical.html',
  styleUrl: './testing-navigation-vertical.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestingNavigationVertical {
  basicLinks: VerticalNavItem[] = [
    { label: 'Home', href: '#' },
    { label: 'Dashboard', href: '#' },
    { label: 'Profile', href: '#' },
    { label: 'Settings', href: '#' },
    { label: 'Logout', href: '#' },
  ];

  withIcons: VerticalNavItem[] = [
    { label: 'Home', href: '#', icon: 'fa-light fa-house' },
    { label: 'Dashboard', href: '#', icon: 'fa-light fa-gauge-high' },
    { label: 'Messages', href: '#', icon: 'fa-light fa-envelope' },
    { label: 'Calendar', href: '#', icon: 'fa-light fa-calendar-days' },
    { label: 'Reports', href: '#', icon: 'fa-light fa-chart-line' },
  ];

  accordionSubmenus: VerticalNavItem[] = [
    {
      label: 'Getting Started',
      href: '#',
      children: [
        { label: 'Introduction', href: '#' },
        { label: 'Installation', href: '#' },
        { label: 'Quick Start', href: '#' },
      ],
    },
    {
      label: 'Components',
      href: '#',
      children: [
        { label: 'Buttons', href: '#' },
        { label: 'Cards', href: '#' },
        { label: 'Forms', href: '#' },
        { label: 'Modals', href: '#' },
      ],
    },
    {
      label: 'Resources',
      href: '#',
      children: [
        { label: 'Documentation', href: '#' },
        { label: 'Tutorials', href: '#' },
        { label: 'Examples', href: '#' },
      ],
    },
  ];

  activePageState: VerticalNavItem[] = [
    { label: 'Home', href: '#' },
    { label: 'Dashboard', href: '#', active: true },
    { label: 'Analytics', href: '#' },
    { label: 'Reports', href: '#' },
    { label: 'Settings', href: '#' },
  ];

  multiLevelNesting: VerticalNavItem[] = [
    {
      label: 'Products',
      href: '#',
      children: [
        { label: 'Electronics', href: '#' },
        {
          label: 'Clothing',
          href: '#',
          children: [
            { label: 'Men', href: '#' },
            { label: 'Women', href: '#' },
            { label: 'Children', href: '#' },
          ],
        },
        { label: 'Home & Garden', href: '#' },
      ],
    },
    {
      label: 'Services',
      href: '#',
      children: [
        { label: 'Consulting', href: '#' },
        { label: 'Support', href: '#' },
      ],
    },
  ];

  sectionHeaders: VerticalNavItem[] = [
    { label: 'Main', isHeader: true },
    { label: 'Home', href: '#' },
    { label: 'Dashboard', href: '#' },
    { label: 'Profile', href: '#' },
    { label: 'Preferences', isHeader: true },
    { label: 'Account', href: '#' },
    { label: 'Security', href: '#' },
    { label: 'Notifications', href: '#' },
  ];

  mixedActiveSubmenu: VerticalNavItem[] = [
    {
      label: 'Dashboard',
      href: '#',
      active: true,
      children: [
        { label: 'Overview', href: '#' },
        { label: 'Statistics', href: '#' },
      ],
    },
    {
      label: 'Projects',
      href: '#',
      children: [
        { label: 'Active Projects', href: '#' },
        { label: 'Completed', href: '#' },
      ],
    },
    { label: 'Team', href: '#' },
    { label: 'Reports', href: '#' },
  ];

  withTitle: VerticalNavItem[] = [
    { label: 'Home', href: '#' },
    { label: 'Navigation', href: '#', active: true },
    { label: 'Layout', href: '#' },
    { label: 'Typography', href: '#' },
  ];

  compactNav: VerticalNavItem[] = [
    { label: 'Home', href: '#' },
    { label: 'Dashboard', href: '#' },
    { label: 'Messages', href: '#' },
    { label: 'Calendar', href: '#' },
  ];

  darkThemeNav: VerticalNavItem[] = [
    { label: 'Home', href: '#' },
    { label: 'Dashboard', href: '#', active: true },
    { label: 'Analytics', href: '#' },
    { label: 'Reports', href: '#' },
  ];

  imageUrl = 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=400&fit=crop';
}
