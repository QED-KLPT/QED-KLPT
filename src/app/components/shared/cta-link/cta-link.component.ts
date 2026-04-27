import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type CtaVariant = 'default' | 'view-all';

@Component({
  selector: 'app-cta-link',
  imports: [],
  templateUrl: './cta-link.component.html',
  styleUrl: './cta-link.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CtaLinkComponent {
  @Input() href = '#';
  @Input() variant: CtaVariant = 'default';
  @Input() disabled = false;
  @Input() target: '_self' | '_blank' | undefined = undefined;
  @Input() ariaLabel: string | undefined = undefined;

  get linkClasses(): string {
    const classes: string[] = ['klpt__cta-link'];

    if (this.variant === 'view-all') {
      classes.push('klpt__cta-link--view-all');
    }

    return classes.join(' ');
  }

  get isDisabled(): boolean {
    return this.disabled;
  }
}
