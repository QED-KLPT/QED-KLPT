import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type QldButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type QldButtonSize = 'default' | 'sm' | 'lg';

@Component({
  selector: 'app-qld-button',
  imports: [],
  templateUrl: './qld-button.component.html',
  styleUrl: './qld-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QldButtonComponent {
  @Input() variant: QldButtonVariant = 'primary';
  @Input() size: QldButtonSize = 'default';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() iconLead = false;
  @Input() iconTrail = false;
  @Input() block = false;

  get buttonClasses(): string {
    const classes: string[] = ['qld__btn'];

    if (this.variant === 'secondary') {
      classes.push('qld__btn--secondary');
    }

    if (this.variant === 'tertiary') {
      classes.push('qld__btn--tertiary');
    }

    if (this.iconLead) {
      classes.push('qld__btn--icon-lead');
    }

    if (this.iconTrail) {
      classes.push('qld__btn--icon-trail');
    }

    if (this.size === 'sm') {
      classes.push('qld__btn--sm');
    }

    if (this.size === 'lg') {
      classes.push('qld__btn--lg');
    }

    if (this.block) {
      classes.push('qld__btn--block');
    }

    return classes.join(' ');
  }

  get isDisabled(): boolean {
    return this.disabled || this.loading;
  }
}
