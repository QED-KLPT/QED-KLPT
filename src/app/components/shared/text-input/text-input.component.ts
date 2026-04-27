import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-text-input',
  imports: [],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextInputComponent {
  @Input({ required: true }) label!: string;
  @Input() hint?: string;
  @Input() placeholder?: string;
  @Input() type: 'text' | 'email' | 'number' | 'password' | 'tel' | 'url' = 'text';
  @Input() disabled = false;
  @Input() block = false;
  @Input() optional = false;
  @Input() required = false;
  @Input() error?: string;
  @Input() success?: string;

  private _id = `text-input-${Math.random().toString(36).substring(2, 9)}`;

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
    if (this.success) parts.push(this.successId);
    return parts.length > 0 ? parts.join(' ') : null;
  }

  get inputClasses(): string {
    const classes: string[] = ['qld__text-input'];

    if (this.block) {
      classes.push('qld__text-input--block');
    }

    if (this.error) {
      classes.push('qld__text-input--error');
    }

    if (this.success) {
      classes.push('qld__text-input--valid');
    }

    return classes.join(' ');
  }

  get isInvalid(): boolean {
    return !!this.error;
  }
}
