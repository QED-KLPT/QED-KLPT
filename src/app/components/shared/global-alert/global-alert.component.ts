import { ChangeDetectionStrategy, Component, ElementRef, Input, output, Renderer2 } from '@angular/core';

export type GlobalAlertType = 'critical' | 'warning' | 'general';

const ICON_MAP: Record<GlobalAlertType, { faClass: string; ariaLabel: string }> = {
  critical: { faClass: 'fas fa-triangle-exclamation', ariaLabel: 'Critical alert' },
  warning: { faClass: 'fas fa-circle-exclamation', ariaLabel: 'Warning' },
  general: { faClass: 'fas fa-circle-info', ariaLabel: 'Information' },
};

@Component({
  selector: 'app-global-alert',
  imports: [],
  templateUrl: './global-alert.component.html',
  styleUrl: './global-alert.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlobalAlertComponent {
  @Input() message = '';
  @Input() actionLabel = '';
  @Input() actionHref = '';
  @Input() dismissible = true;
  @Input({ required: true }) type!: GlobalAlertType;

  close = output<void>();

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
  ) {}

  get iconClass(): string {
    return ICON_MAP[this.type]?.faClass ?? '';
  }

  get iconAriaLabel(): string {
    return ICON_MAP[this.type]?.ariaLabel ?? 'Alert';
  }

  get alertClasses(): string {
    return `qld__global-alert qld__global-alert--${this.type}`;
  }

  get hasAction(): boolean {
    return !!this.actionLabel && !!this.actionHref;
  }

  onCloseClick(): void {
    this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
    this.close.emit();
  }
}
