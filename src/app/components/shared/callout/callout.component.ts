import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type CalloutVariant = 'default' | 'light' | 'alt' | 'dark' | 'dark-alt';

@Component({
  selector: 'app-callout',
  imports: [],
  templateUrl: './callout.component.html',
  styleUrl: './callout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalloutComponent {
  @Input() title = '';
  @Input() message = '';
  @Input() variant: CalloutVariant = 'default';
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
