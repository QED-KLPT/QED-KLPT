import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type QldCalloutVariant = 'default' | 'light' | 'alt' | 'dark' | 'dark-alt';

@Component({
  selector: 'app-qld-callout',
  imports: [],
  templateUrl: './qld-callout.component.html',
  styleUrl: './qld-callout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QldCalloutComponent {
  @Input() title = '';
  @Input() message = '';
  @Input() variant: QldCalloutVariant = 'default';
  @Input() srHeading = false;

  get calloutClasses(): string {
    const classes: string[] = ['qld__callout'];

    if (this.variant !== 'default') {
      classes.push(`qld__callout--${this.variant}`);
    }

    return classes.join(' ');
  }

  get headingClasses(): string {
    const classes: string[] = ['qld__callout__heading'];

    if (this.srHeading) {
      classes.push('qld__callout__heading--sronly');
    }

    return classes.join(' ');
  }
}
