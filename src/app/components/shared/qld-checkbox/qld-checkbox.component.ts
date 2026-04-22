import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-qld-checkbox',
  imports: [],
  templateUrl: './qld-checkbox.component.html',
  styleUrl: './qld-checkbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QldCheckboxComponent {
  @Input({ required: true }) label!: string;
  @Input() checked = false;
  @Input() disabled = false;
  @Input() indeterminate = false;
  @Input() optional = false;
  @Input() required = false;
  @Input() hint?: string;
  @Input() error?: string;
  @Input() success?: string;

  private _id = `checkbox-${Math.random().toString(36).substring(2, 9)}`;

  get id(): string {
    return this._id;
  }

  get hintId(): string {
    return `${this.id}-hint`;
  }

  get errorId(): string {
    return `${this.id}-error-message`;
  }

  get successId(): string {
    return `${this.id}-success-message`;
  }

  get ariaDescribedBy(): string | null {
    const parts: string[] = [];
    if (this.hint) parts.push(this.hintId);
    if (this.error) parts.push(this.errorId);
    return parts.length > 0 ? parts.join(' ') : null;
  }

  get inputClasses(): string {
    const classes: string[] = ['qld__control-input__input'];

    if (this.error) {
      classes.push('qld__input--error');
    }

    return classes.join(' ');
  }

  get isInvalid(): boolean {
    return !!this.error;
  }
}
