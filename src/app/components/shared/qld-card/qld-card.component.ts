import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type QldCardType = 'no-action' | 'single-action' | 'multi-action';
export type QldCardVariant = 'default' | 'arrow' | 'stacked-icon' | 'leading-icon' | 'image';
export type QldCardFeatureAlign = 'left' | 'right';

export interface FooterLink {
  label: string;
  href: string;
  icon?: string;
}

export interface FooterTag {
  label: string;
  href?: string;
}

@Component({
  selector: 'app-qld-card',
  imports: [],
  templateUrl: './qld-card.component.html',
  styleUrl: './qld-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QldCardComponent {
  @Input({ required: true }) title!: string;
  @Input() description = '';
  @Input() type: QldCardType = 'single-action';
  @Input() variant: QldCardVariant = 'default';
  @Input() imageUrl = '';
  @Input() imageAlt = '';
  @Input() footerLinks: FooterLink[] = [];
  @Input() footerTags: FooterTag[] = [];
  @Input() dark = false;
  @Input() featureAlign: QldCardFeatureAlign = 'left';
  @Input() href = '';

  get cardClasses(): string {
    const classes: string[] = ['qld__card'];

    if (this.type === 'single-action') {
      classes.push('qld__card__action');
    }

    if (this.type === 'multi-action') {
      classes.push('qld__card__multi-action');
    }

    if (this.variant === 'arrow') {
      classes.push('qld__card--arrow');
    }

    if (this.variant === 'stacked-icon' || this.variant === 'leading-icon') {
      classes.push('qld__card--icon');
    }

    if (this.variant === 'leading-icon') {
      classes.push('qld__card--icon-left');
    }

    if (this.variant === 'image') {
      classes.push('qld__card--image');
    }

    if (this.variant === 'image' && this.featureAlign === 'left') {
      classes.push('qld__card--feature', 'qld__card--feature-left');
    }

    if (this.variant === 'image' && this.featureAlign === 'right') {
      classes.push('qld__card--feature', 'qld__card--feature-right');
    }

    if (this.dark) {
      classes.push('qld__card--dark');
    }

    return classes.join(' ');
  }

  get hasFooter(): boolean {
    return this.footerLinks.length > 0 || this.footerTags.length > 0;
  }

  get hasIcon(): boolean {
    return this.variant === 'stacked-icon' || this.variant === 'leading-icon';
  }

  get hasImage(): boolean {
    return this.variant === 'image' && !!this.imageUrl;
  }

  get hasArrow(): boolean {
    return this.variant === 'arrow';
  }

  get isClickable(): boolean {
    return this.type === 'single-action' && !!this.href;
  }

  get titleTag(): string {
    if (this.isClickable) {
      return 'h3';
    }
    return this.type === 'multi-action' ? 'h3' : 'p';
  }

  get iconClass(): string {
    return 'fa-light fa-alicorn';
  }
}
