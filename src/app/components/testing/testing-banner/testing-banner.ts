import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BannerComponent, BreadcrumbItem, CtaButton, IconTile } from '../../shared/banner/banner.component';

@Component({
  selector: 'app-testing-banner',
  imports: [BannerComponent],
  templateUrl: './testing-banner.html',
  styleUrl: './testing-banner.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestingBanner {
  defaultBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '#' },
    { label: 'Components', href: '#' },
    { label: 'Banner', current: true },
  ];

  darkBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '#' },
    { label: 'Pages', href: '#' },
    { label: 'Advanced Banner', current: true },
  ];

  heroImageUrl = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop';
  heroImageAlt = 'Mountain landscape with clouds';

  ctaPrimary: CtaButton = {
    label: 'Get started',
    href: '#',
  };

  ctaSecondary: CtaButton = {
    label: 'Learn more',
    href: '#',
  };

  iconTiles: IconTile[] = [
    { icon: 'fa-light fa-phone', label: 'Phone', href: '#' },
    { icon: 'fa-light fa-envelope', label: 'Email', href: '#' },
    { icon: 'fa-light fa-location-dot', label: 'Visit', href: '#' },
    { icon: 'fa-light fa-clock', label: 'Hours', href: '#' },
  ];

  basicAbstract = 'This is a brief description or abstract that provides context for the page content. It should be concise and informative, typically no more than two to three sentences long.';

  advancedAbstract = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut interdum purus at efficitur imperdiet. Nulla facilisi. Sed eget nulla non eros tempus volutpat vitae nec nisi.';
}
