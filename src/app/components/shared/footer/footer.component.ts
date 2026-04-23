import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export interface FooterLinkColumn {
  heading: string;
  links: { label: string; href: string }[];
}

export interface FooterSocialLink {
  label: string;
  href: string;
  icon: string;
}

@Component({
  selector: 'app-footer-shared',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterSharedComponent {
  @Input() title = 'Department of Education';
  @Input() contactText = '';
  @Input() phoneLabel = 'Phone:';
  @Input() phoneNumber = '';
  @Input() contactButtonText = '';
  @Input() contactButtonHref = '';
  @Input() linkColumns: FooterLinkColumn[] = [];
  @Input() socialLinks: FooterSocialLink[] = [];
  @Input() acknowledgementText = '';
  @Input() copyrightText = '';
  @Input() qgovLink = 'Queensland Government';
  @Input() qgovHref = '';
  @Input() variant: 'default' | 'dark' | 'minimal' = 'default';
  @Input() showLogo = false;

  get footerClasses(): string {
    const classes: string[] = ['qld__footer'];
    if (this.variant === 'dark') {
      classes.push('qld__footer--dark');
    }
    if (this.variant === 'minimal') {
      classes.push('qld__footer--minimal');
    }
    return classes.join(' ');
  }

  get hasContact(): boolean {
    return !!this.contactText || !!this.phoneNumber;
  }

  get hasLinks(): boolean {
    return this.linkColumns.length > 0;
  }

  get hasSocial(): boolean {
    return this.socialLinks.length > 0;
  }

  get hasAcknowledgement(): boolean {
    return !!this.acknowledgementText || !!this.copyrightText;
  }

  get hasAllSections(): boolean {
    return this.hasContact && this.hasLinks && this.hasSocial && this.hasAcknowledgement;
  }

  get hasLogo(): boolean {
    return this.showLogo && !!this.qgovHref;
  }

  get defaultAcknowledgement(): string {
    return 'The Department of Education acknowledges the Traditional Owners of the lands, seas, skies and waterways from across Queensland. We pay our respects to the Elders past, present and emerging.';
  }

  get defaultCopyright(): string {
    return '© The State of Queensland (Department of Education) 2026';
  }

  get displayAcknowledgement(): string {
    return this.acknowledgementText || this.defaultAcknowledgement;
  }

  get displayCopyright(): string {
    return this.copyrightText || this.defaultCopyright;
  }

  get defaultContactButton(): string {
    return 'Contact us';
  }

  get displayContactButton(): string {
    return this.contactButtonText || this.defaultContactButton;
  }

  get defaultPhone(): string {
    return '13 QGOV (13 74 68)';
  }

  get displayPhone(): string {
    return this.phoneNumber || this.defaultPhone;
  }

  get defaultContactHref(): string {
    return 'https://qed.qld.gov.au/contact-us';
  }

  get displayContactHref(): string {
    return this.contactButtonHref || this.defaultContactHref;
  }

  get defaultQgovHref(): string {
    return 'https://www.qld.gov.au/';
  }

  get displayQgovHref(): string {
    return this.qgovHref || this.defaultQgovHref;
  }

  get defaultPhoneHref(): string {
    return 'tel:137468';
  }

  get displayPhoneHref(): string {
    return this.phoneLabel.includes('tel:') ? this.phoneLabel : 'tel:137468';
  }

  get phoneDisplayText(): string {
    if (this.phoneNumber) return this.phoneNumber;
    return '13 QGOV (13 74 68)';
  }

  get phoneLabelDisplay(): string {
    if (this.phoneLabel === 'Phone:') return this.phoneLabel;
    return this.phoneLabel;
  }

  get hasPhone(): boolean {
    return !!this.phoneNumber || true;
  }
}
