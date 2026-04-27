import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FooterSharedComponent, FooterLinkColumn, FooterSocialLink } from '../shared/footer/footer.component';

@Component({
  selector: 'app-testing-footer',
  imports: [FooterSharedComponent],
  templateUrl: './testing-footer.html',
  styleUrl: './testing-footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestingFooter {
  defaultLinkColumns: FooterLinkColumn[] = [
    {
      heading: 'Quick links',
      links: [
        { label: 'Copyright', href: '#' },
        { label: 'Disclaimer', href: '#' },
        { label: 'Privacy', href: '#' },
        { label: 'Right to information', href: '#' },
        { label: 'Accessibility', href: '#' },
        { label: 'Jobs in Queensland Government', href: '#' },
      ],
    },
  ];

  multiLinkColumns: FooterLinkColumn[] = [
    {
      heading: 'About us',
      links: [
        { label: 'Our people and culture', href: '#' },
        { label: 'Our roles and responsibilities', href: '#' },
        { label: 'Our policies and strategies', href: '#' },
      ],
    },
    {
      heading: 'Resources',
      links: [
        { label: 'Forms and templates', href: '#' },
        { label: 'Fees and charges', href: '#' },
        { label: 'Publications', href: '#' },
      ],
    },
  ];

  defaultSocialLinks: FooterSocialLink[] = [
    { label: 'Facebook', href: '#', icon: 'fa-brands fa-facebook-f' },
    { label: 'X (Twitter)', href: '#', icon: 'fa-brands fa-x-twitter' },
    { label: 'YouTube', href: '#', icon: 'fa-brands fa-youtube' },
    { label: 'Instagram', href: '#', icon: 'fa-brands fa-instagram' },
    { label: 'LinkedIn', href: '#', icon: 'fa-brands fa-linkedin-in' },
  ];

  minimalSocialLinks: FooterSocialLink[] = [
    { label: 'Facebook', href: '#', icon: 'fa-brands fa-facebook-f' },
    { label: 'X (Twitter)', href: '#', icon: 'fa-brands fa-x-twitter' },
  ];

  minimalLinkColumns: FooterLinkColumn[] = [
    {
      heading: 'Useful links',
      links: [
        { label: 'Home', href: '#' },
        { label: 'Contact', href: '#' },
        { label: 'Privacy policy', href: '#' },
      ],
    },
  ];

  socialOnlyLinkColumns: FooterLinkColumn[] = [
    {
      heading: 'Explore',
      links: [
        { label: 'Latest news', href: '#' },
        { label: 'Events', href: '#' },
      ],
    },
  ];

  simpleLinkColumns: FooterLinkColumn[] = [
    {
      heading: 'Navigation',
      links: [
        { label: 'Home', href: '#' },
        { label: 'About', href: '#' },
        { label: 'Services', href: '#' },
        { label: 'Contact', href: '#' },
      ],
    },
    {
      heading: 'Support',
      links: [
        { label: 'FAQs', href: '#' },
        { label: 'Help centre', href: '#' },
      ],
    },
  ];

  fullFeaturedLinkColumns: FooterLinkColumn[] = [
    {
      heading: 'Programs',
      links: [
        { label: 'Early learning', href: '#' },
        { label: 'Primary education', href: '#' },
        { label: 'Secondary education', href: '#' },
      ],
    },
    {
      heading: 'Legal',
      links: [
        { label: 'Copyright statement', href: '#' },
        { label: 'Disclaimer', href: '#' },
        { label: 'Privacy policy', href: '#' },
      ],
    },
  ];

  governmentLinkColumns: FooterLinkColumn[] = [
    {
      heading: 'Government links',
      links: [
        { label: 'Copyright', href: '#' },
        { label: 'Disclaimer', href: '#' },
        { label: 'Privacy', href: '#' },
        { label: 'Right to information', href: '#' },
        { label: 'Accessibility', href: '#' },
        { label: 'Jobs in Queensland Government', href: '#' },
        { label: 'Other languages', href: '#' },
      ],
    },
  ];

  get defaultSocial(): FooterSocialLink[] {
    return this.defaultSocialLinks;
  }

  get minimalSocial(): FooterSocialLink[] {
    return this.minimalSocialLinks;
  }

  get defaultLinks(): FooterLinkColumn[] {
    return this.defaultLinkColumns;
  }

  get multiLinks(): FooterLinkColumn[] {
    return this.multiLinkColumns;
  }

  get socialLinks(): FooterLinkColumn[] {
    return this.socialOnlyLinkColumns;
  }

  get simpleLinks(): FooterLinkColumn[] {
    return this.simpleLinkColumns;
  }

  get fullLinks(): FooterLinkColumn[] {
    return this.fullFeaturedLinkColumns;
  }

  get governmentLinks(): FooterLinkColumn[] {
    return this.governmentLinkColumns;
  }

  get defaultSocialLinksArr(): FooterSocialLink[] {
    return this.defaultSocialLinks;
  }

  get minimalSocialLinksArr(): FooterSocialLink[] {
    return this.minimalSocialLinks;
  }

  get fullSocialLinksArr(): FooterSocialLink[] {
    return this.defaultSocialLinks;
  }

  get governmentSocialLinksArr(): FooterSocialLink[] {
    return this.defaultSocialLinks;
  }

  get defaultContactText(): string {
    return 'Get in touch for enquiries, feedback, complaints and compliments.';
  }

  get defaultAcknowledgement(): string {
    return 'The Department of Education acknowledges the Traditional Owners of the lands, seas, skies and waterways from across Queensland. We pay our respects to the Elders past, present and emerging, for they hold the memories, the traditions, the culture and hopes of Aboriginal and Torres Strait Islander peoples across the state.';
  }

  get minimalAcknowledgement(): string {
    return '© The State of Queensland 2026';
  }

  get simpleCopyright(): string {
    return '© Your Organisation 2026';
  }

  get fullCopyright(): string {
    return '© The State of Queensland (Department of Education) 2026';
  }

  get governmentCopyright(): string {
    return '© The State of Queensland (Department of Education) 2026';
  }

  get defaultQgovHref(): string {
    return 'https://www.qld.gov.au/';
  }

  get minimalQgovHref(): string {
    return 'https://www.qld.gov.au/';
  }

  get fullQgovHref(): string {
    return 'https://www.qld.gov.au/';
  }

  get governmentQgovHref(): string {
    return 'https://www.qld.gov.au/';
  }

  get defaultContactHref(): string {
    return 'https://qed.qld.gov.au/contact-us';
  }

  get minimalContactHref(): string {
    return '#';
  }

  get socialContactHref(): string {
    return '#';
  }

  get fullContactHref(): string {
    return 'https://qed.qld.gov.au/contact-us';
  }

  get governmentContactHref(): string {
    return 'https://qed.qld.gov.au/contact-us';
  }

  get defaultPhoneHref(): string {
    return 'tel:137468';
  }

  get minimalPhoneHref(): string {
    return 'tel:137468';
  }

  get socialPhoneHref(): string {
    return 'tel:137468';
  }

  get fullPhoneHref(): string {
    return 'tel:137468';
  }

  get governmentPhoneHref(): string {
    return 'tel:137468';
  }

  get defaultPhoneText(): string {
    return '13 QGOV (13 74 68)';
  }

  get minimalPhoneText(): string {
    return '13 QGOV (13 74 68)';
  }

  get socialPhoneText(): string {
    return '13 QGOV (13 74 68)';
  }

  get fullPhoneText(): string {
    return '13 QGOV (13 74 68)';
  }

  get governmentPhoneText(): string {
    return '13 QGOV (13 74 68)';
  }

  get defaultContactLabel(): string {
    return 'Phone:';
  }

  get minimalContactLabel(): string {
    return 'Phone:';
  }

  get socialContactLabel(): string {
    return 'Phone:';
  }

  get fullContactLabel(): string {
    return 'Phone:';
  }

  get governmentContactLabel(): string {
    return 'Phone:';
  }
}
