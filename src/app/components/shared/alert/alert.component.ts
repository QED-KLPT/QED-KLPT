import { ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2 } from '@angular/core';

export type AlertType = 'info' | 'success' | 'error' | 'warning';
export type AlertState = 'default' | 'light' | 'alt' | 'dark' | 'dark-alt';

const ICON_MAP: Record<AlertType, string> = {
  info: 'fas fa-circle-info',
  success: 'fas fa-check-circle',
  error: 'fas fa-circle-xmark',
  warning: 'fas fa-triangle-exclamation',
};

const TYPE_LABEL: Record<AlertType, string> = {
  info: 'Information',
  success: 'Success',
  error: 'Error',
  warning: 'Warning',
};

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
  @Input({ required: true }) type!: AlertType;
  @Input() state: AlertState = 'default';
  @Input() title = '';
  @Input() dismissible = false;
  @Input() showMore = false;
  @Input() showMoreLabel = 'Show more';
  @Input() hideMoreLabel = 'Hide more';

  showMoreExpanded = false;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
  ) {}

  get iconClass(): string {
    return ICON_MAP[this.type] ?? '';
  }

  get ariaLabel(): string {
    return TYPE_LABEL[this.type] ?? 'Alert';
  }

  get headingLevel(): 2 | 4 {
    return this.type === 'error' ? 4 : 2;
  }

  get alertClasses(): string {
    return `qld__page-alerts qld__page-alerts--svg qld__page-alerts--${this.type} qld__page-alerts--${this.state}`;
  }

  get showMoreLabelText(): string {
    return this.showMoreExpanded ? this.hideMoreLabel : this.showMoreLabel;
  }

  toggleShowMore(): void {
    this.showMoreExpanded = !this.showMoreExpanded;
  }

  close(): void {
    this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
  }
}
