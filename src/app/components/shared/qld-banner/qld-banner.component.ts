import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type QldBannerVariant = 'default' | 'basic' | 'advanced';
export type QldBannerBackground = 'white' | 'light' | 'alt' | 'dark' | 'dark-alt';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

export interface CtaButton {
  label: string;
  href: string;
}

export interface IconTile {
  icon: string;
  label: string;
  href: string;
}

@Component({
  selector: 'app-qld-banner',
  imports: [],
  templateUrl: './qld-banner.component.html',
  styleUrl: './qld-banner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QldBannerComponent {
  @Input({ required: true }) variant: QldBannerVariant = 'default';
  @Input() title = '';
  @Input() breadcrumbs: BreadcrumbItem[] = [];
  @Input() abstractText = '';
  @Input() secondaryHeading = '';
  @Input() background: QldBannerBackground = 'white';
  @Input() heroImageUrl = '';
  @Input() heroImageAlt = '';
  @Input() ctaPrimary: CtaButton | null = null;
  @Input() ctaSecondary: CtaButton | null = null;
  @Input() iconTiles: IconTile[] = [];

  get bannerClasses(): string {
    const classes: string[] = ['qld__banner'];

    if (this.variant === 'basic') {
      classes.push('qld__banner__basic');
    }

    if (this.variant === 'advanced') {
      classes.push('qld__banner__advanced');
    }

    if (this.background !== 'white') {
      classes.push(`qld__banner--${this.background}`);
    }

    if (this.breadcrumbs.length > 0) {
      classes.push('qld__banner--breadcrumbs');
    }

    if (this.variant === 'advanced' && this.heroImageUrl) {
      classes.push('qld__banner--has-hero');
    }

    if (this.variant === 'advanced' && this.iconTiles.length > 0) {
      classes.push('qld__banner--nav');
    }

    return classes.join(' ');
  }

  get headingClass(): string {
    if (this.background === 'dark' || this.background === 'dark-alt') {
      return 'qld__banner__heading qld__banner__heading--dark';
    }
    return 'qld__banner__heading';
  }

  get hasHero(): boolean {
    return this.variant === 'advanced' && !!this.heroImageUrl;
  }

  get hasIconTiles(): boolean {
    return this.variant === 'advanced' && this.iconTiles.length > 0;
  }

  get hasCtas(): boolean {
    return this.variant === 'advanced' && !!(this.ctaPrimary || this.ctaSecondary);
  }

  get hasAbstract(): boolean {
    return (this.variant === 'basic' || this.variant === 'advanced') && !!this.abstractText;
  }

  get hasSecondaryHeading(): boolean {
    return this.variant === 'advanced' && !!this.secondaryHeading;
  }

  get hasHeroImage(): boolean {
    return this.hasHero && !!this.heroImageAlt;
  }

  get breadcrumbNavClass(): string {
    const base = 'qld__breadcrumbs qld__banner__breadcrumbs';
    if (this.background === 'dark' || this.background === 'dark-alt') {
      return `${base} qld__breadcrumbs--alt`;
    }
    return base;
  }

  get mobileBreadcrumbClasses(): string {
    return `${this.breadcrumbNavClass} qld__banner__breadcrumbs--mobile`;
  }

  get desktopBreadcrumbClasses(): string {
    return `${this.breadcrumbNavClass} qld__banner__breadcrumbs--desktop`;
  }

  get contentColumnClasses(): string {
    if (this.hasHero) {
      return 'qld__banner__content col-xs-12 col-md-6 col-lg-7';
    }
    return 'qld__banner__content col-xs-12';
  }

  get heroImageStyle(): string {
    if (this.heroImageUrl) {
      return `background-image: url('${this.heroImageUrl}');`;
    }
    return '';
  }
}
