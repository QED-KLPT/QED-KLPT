import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type PromoPanelType = 'indented-text' | 'indented-image' | 'contained' | 'full-image';
export type PromoPanelBackground = 'default' | 'light' | 'alt' | 'dark' | 'dark-alt';
export type PromoPanelImageAlign = 'left' | 'right';

@Component({
  selector: 'app-promotional-panel',
  imports: [],
  templateUrl: './promotional-panel.component.html',
  styleUrl: './promotional-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromotionalPanelComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() type: PromoPanelType = 'indented-text';
  @Input() background: PromoPanelBackground = 'default';
  @Input() imageAlign: PromoPanelImageAlign = 'right';
  @Input() iconClass = '';
  @Input() ctaLabel = '';
  @Input() ctaHref = '#';
  @Input() imageUrl = '';
  @Input() imageAlt = '';

  get panelClasses(): string {
    const classes: string[] = ['qld__promo-panel'];

    if (this.background !== 'default') {
      classes.push(`qld__body--${this.background}`);
    }

    if (this.type === 'contained') {
      classes.push('qld__body--contained');
    }

    if (this.type === 'full-image') {
      classes.push('qld__body--full-image');
    }

    if (this.imageAlign === 'left') {
      classes.push('qld__promo-panel--image-left');
    } else if (this.imageAlign === 'right') {
      classes.push('qld__promo-panel--image-right');
    }

    if (!this.imageUrl) {
      classes.push('qld__promo-panel--no-image');
    }

    return classes.join(' ');
  }

  get imageStyle(): string {
    if (this.imageUrl) {
      return `background-image: url('${this.imageUrl}');`;
    }
    return '';
  }

  get hasImage(): boolean {
    return !!this.imageUrl;
  }

  get hasIcon(): boolean {
    return !!this.iconClass;
  }

  get hasCta(): boolean {
    return !!this.ctaLabel;
  }

  get hasTitle(): boolean {
    return !!this.title;
  }

  get hasDescription(): boolean {
    return !!this.description;
  }
}
