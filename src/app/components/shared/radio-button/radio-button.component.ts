import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export interface RadioOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-radio-button',
  imports: [],
  templateUrl: './radio-button.component.html',
  styleUrl: './radio-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioButtonComponent {
  @Input({ required: true }) label!: string;
  @Input() name = '';
  @Input() hint?: string;
  @Input() disabled = false;
  @Input() optional = false;
  @Input() required = false;
  @Input() error?: string;

  private _id = `radio-${Math.random().toString(36).substring(2, 9)}`;

  get id(): string {
    return this._id;
  }

  get hintId(): string {
    return `${this.id}-hint`;
  }

  get errorId(): string {
    return `${this.id}-error-message`;
  }

  get ariaDescribedBy(): string | null {
    const parts: string[] = [];
    if (this.hint) parts.push(this.hintId);
    if (this.error) parts.push(this.errorId);
    return parts.length > 0 ? parts.join(' ') : null;
  }

  get inputClasses(): string {
    const classes: string[] = ['qld__control-input__input', 'qld__control-input-radio'];
    if (this.error) {
      classes.push('qld__input--error');
    }
    return classes.join(' ');
  }

  get isInvalid(): boolean {
    return !!this.error;
  }
}

@Component({
  selector: 'app-radio-group',
  imports: [],
  templateUrl: './radio-group.component.html',
  styleUrl: './radio-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioGroupComponent {
  @Input({ required: true }) label!: string;
  @Input() name = '';
  @Input({ required: true }) options!: RadioOption[];
  @Input() hint?: string;
  @Input() disabled = false;
  @Input() optional = false;
  @Input() required = false;
  @Input() error?: string;

  private _id = `radio-group-${Math.random().toString(36).substring(2, 9)}`;

  get id(): string {
    return this._id;
  }

  get legendId(): string {
    return `${this.id}-legend`;
  }

  get hintId(): string {
    return `${this.id}-hint`;
  }

  get errorId(): string {
    return `${this.id}-error-message`;
  }

  get ariaDescribedBy(): string | null {
    const parts: string[] = [];
    if (this.hint) parts.push(this.hintId);
    if (this.error) parts.push(this.errorId);
    return parts.length > 0 ? parts.join(' ') : null;
  }

  get isInvalid(): boolean {
    return !!this.error;
  }
}
