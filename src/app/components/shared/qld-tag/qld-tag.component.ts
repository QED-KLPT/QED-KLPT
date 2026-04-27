import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

export type QldTagSize = 'default' | 'large';
export type QldTagType = 'default' | 'link' | 'info' | 'filter';

@Component({
  selector: 'qld-tag',
  imports: [],
  templateUrl: './qld-tag.component.html',
  styleUrl: './qld-tag.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QldTagComponent {
  @Input() size: QldTagSize = 'default';
  @Input() type: QldTagType = 'default';
  @Input() closable = false;
  @Input() href: string | null = null;
  @Output() close = new EventEmitter<void>();

  get tagClasses(): string {
    const classes: string[] = ['qld__tag'];

    if (this.size === 'large') {
      classes.push('qld__tag--large');
    }

    if (this.type === 'link') {
      classes.push('qld__tag--link');
    }

    if (this.type === 'info') {
      classes.push('qld__tag--info');
    }

    if (this.type === 'filter') {
      classes.push('qld__tag--filter');
    }

    return classes.join(' ');
  }

  get isInteractive(): boolean {
    return this.type === 'link' && !!this.href;
  }

  get tagTag(): string {
    return this.isInteractive ? 'a' : 'span';
  }

  onClose(): void {
    this.close.emit();
  }
}
