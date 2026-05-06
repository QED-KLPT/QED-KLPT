import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export interface InPageNavItem {
  label: string;
  href: string;
}

export type InPageNavVariant = 'default' | 'dark';

@Component({
  selector: 'app-in-page-nav',
  imports: [],
  templateUrl: './in-page-nav.component.html',
  styleUrl: './in-page-nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InPageNavComponent {
  @Input() heading = 'On this page';
  @Input({ required: true }) items!: InPageNavItem[];
  @Input() variant: InPageNavVariant = 'default';

  onLinkClick(href: string): void {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  get navClasses(): string {
    const classes: string[] = ['qld__inpage-nav-links'];

    if (this.variant === 'dark') {
      classes.push('qld__inpage-nav-links--dark');
    }

    return classes.join(' ');
  }
}
