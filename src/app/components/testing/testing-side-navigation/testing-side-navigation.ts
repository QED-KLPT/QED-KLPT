import { ChangeDetectionStrategy, Component } from '@angular/core';
import { QldSideNavComponent, QldSideNavItem } from '../../shared/qld-side-nav/qld-side-nav.component';

@Component({
  selector: 'app-testing-side-navigation',
  imports: [QldSideNavComponent],
  templateUrl: './testing-side-navigation.html',
  styleUrl: './testing-side-navigation.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestingSideNavigation {
  flatListItems: QldSideNavItem[] = [
    { label: 'Home', href: '#' },
    { label: 'Dashboard', href: '#' },
    { label: 'Profile', href: '#' },
    { label: 'Settings', href: '#' },
    { label: 'Logout', href: '#' },
  ];

  withAccordionToggleItems: QldSideNavItem[] = [
    { label: 'Getting Started', href: '#' },
    { label: 'Configuration', href: '#' },
    { label: 'Usage Guide', href: '#' },
    { label: 'FAQs', href: '#' },
  ];

  activeStateItems: QldSideNavItem[] = [
    { label: 'Home', href: '#' },
    { label: 'Dashboard', href: '#', active: true },
    { label: 'Analytics', href: '#' },
    { label: 'Reports', href: '#' },
    { label: 'Settings', href: '#' },
  ];

  withTickIconsItems: QldSideNavItem[] = [
    { label: 'Keeping your tax records', href: '#', icon: 'tick' },
    { label: 'Incorrect amounts', href: '#', icon: 'tick' },
    { label: 'Tax receipt', href: '#', icon: 'tick' },
    { label: 'Pre-fill availability', href: '#', icon: 'tick' },
  ];

  twoLevelItems: QldSideNavItem[] = [
    { label: 'Lodging your tax return', href: '#', isTitle: true },
    { label: 'Lodge online', href: '#', children: [
      { label: 'Pre-filling your online tax return', href: '#' },
      { label: 'Using a registered tax agent', href: '#' },
    ]},
    { label: "What's new for individuals", href: '#' },
    { label: 'Why you may receive a tax bill', href: '#' },
  ];

  threeLevelItems: QldSideNavItem[] = [
    { label: 'Lodging your tax return', href: '#', isTitle: true },
    { label: 'In detail', href: '#', children: [
      { label: 'Record keeping', href: '#', children: [
        { label: 'Keeping your tax records', href: '#' },
        { label: 'Incorrect amounts', href: '#' },
      ]},
      { label: 'Tax receipt', href: '#' },
      { label: 'Pre-fill availability', href: '#' },
    ]},
    { label: 'Lodge online', href: '#', children: [
      { label: 'Pre-filling your online tax return', href: '#' },
    ]},
  ];

  withSectionTitleItems: QldSideNavItem[] = [
    { label: 'Account Settings', href: '#', isTitle: true },
    { label: 'Personal Information', href: '#' },
    { label: 'Security', href: '#' },
    { label: 'Notifications', href: '#' },
    { label: 'Privacy', href: '#' },
  ];

  mixedLinksPlainItems: QldSideNavItem[] = [
    { label: 'Lodging your tax return', href: '#', isTitle: true },
    { label: 'Lodge online', href: '#' },
    { label: "Do you need to lodge a tax return?", href: '#', active: true },
    { label: "What's new for individuals", href: '#' },
    { label: 'Why you may receive a tax bill', href: '#' },
  ];

  collapsedStateItems: QldSideNavItem[] = [
    { label: 'Products', href: '#', children: [
      { label: 'Electronics', href: '#' },
      { label: 'Clothing', href: '#' },
      { label: 'Home & Garden', href: '#' },
    ]},
    { label: 'Services', href: '#', children: [
      { label: 'Consulting', href: '#' },
      { label: 'Support', href: '#' },
    ]},
  ];

  fullRealWorldItems: QldSideNavItem[] = [
    { label: 'Lodging your tax return', href: '#', isTitle: true },
    { label: 'Lodge online', href: '#', children: [
      { label: 'Pre-filling your online tax return', href: '#' },
    ]},
    { label: "Do you need to lodge a tax return?", href: '#', active: true },
    { label: "What's new for individuals", href: '#' },
    { label: 'Why you may receive a tax bill', href: '#' },
    { label: 'In detail', href: '#', children: [
      { label: 'Record keeping', href: '#', children: [
        { label: 'Keeping your tax records', href: '#', icon: 'tick' },
        { label: 'Incorrect amounts', href: '#', icon: 'tick' },
      ]},
      { label: 'Tax receipt', href: '#' },
      { label: 'Pre-fill availability', href: '#' },
    ]},
  ];

  getExampleCode1(): string {
    return `<app-qld-side-nav
  [items]="flatListItems"
  title="In this section">
</app-qld-side-nav>`;
  }

  getExampleCode2(): string {
    return `<app-qld-side-nav
  [items]="withAccordionToggleItems"
  title="In this section">
</app-qld-side-nav>`;
  }

  getExampleCode3(): string {
    return `<app-qld-side-nav
  [items]="activeStateItems"
  title="In this section">
</app-qld-side-nav>`;
  }

  getExampleCode4(): string {
    return `<app-qld-side-nav
  [items]="withTickIconsItems"
  title="In this section">
</app-qld-side-nav>`;
  }

  getExampleCode5(): string {
    return `<app-qld-side-nav
  [items]="twoLevelItems"
  title="In this section">
</app-qld-side-nav>`;
  }

  getExampleCode6(): string {
    return `<app-qld-side-nav
  [items]="threeLevelItems"
  title="In this section">
</app-qld-side-nav>`;
  }

  getExampleCode7(): string {
    return `<app-qld-side-nav
  [items]="withSectionTitleItems"
  title="In this section">
</app-qld-side-nav>`;
  }

  getExampleCode8(): string {
    return `<app-qld-side-nav
  [items]="mixedLinksPlainItems"
  title="In this section">
</app-qld-side-nav>`;
  }

  getExampleCode9(): string {
    return `<app-qld-side-nav
  [items]="collapsedStateItems"
  title="In this section"
  [collapsed]="true">
</app-qld-side-nav>`;
  }

  getExampleCode10(): string {
    return `<app-qld-side-nav
  [items]="fullRealWorldItems"
  title="In this section">
</app-qld-side-nav>`;
  }
}
