import { ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2 } from '@angular/core';

export type QldAlertType = 'info' | 'success' | 'error' | 'warning';
export type QldAlertState = 'default' | 'light' | 'alt' | 'dark' | 'dark-alt';

const ICON_MAP: Record<QldAlertType, string> = {
  info: 'fas fa-circle-info',
  success: 'fas fa-check-circle',
  error: 'fas fa-circle-xmark',
  warning: 'fas fa-triangle-exclamation',
};

const TYPE_LABEL: Record<QldAlertType, string> = {
  info: 'Information',
  success: 'Success',
  error: 'Error',
  warning: 'Warning',
};

@Component({
  selector: 'app-qld-alert',
  imports: [],
  templateUrl: './qld-alert.component.html',
  styleUrl: './qld-alert.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QldAlertComponent {
  @Input({ required: true }) type!: QldAlertType;
  @Input() state: QldAlertState = 'default';
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
