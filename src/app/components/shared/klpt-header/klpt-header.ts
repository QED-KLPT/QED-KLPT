import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { Nav } from '../../../_layout/nav/nav';

export type BrandType = 'coat-of-arms' | 'logo' | 'site-name';
export type PreHeaderStyle = 'dark' | 'light' | 'none';

interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

@Component({
  selector: 'klpt-header',
  imports: [Nav],
  templateUrl: './klpt-header.html',
  styleUrl: './klpt-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KlptHeader {
  readonly brandType = input<BrandType>('coat-of-arms');
  readonly siteName = input<string>('Site Name');
  readonly tagline = input<string>('');
  readonly brandImageUrl = input<string>('');

  readonly showPreHeader = input<PreHeaderStyle>('dark');
  readonly showSearch = input<boolean>(true);
  readonly showNavigation = input<boolean>(true);
  readonly showSecondaryNav = input<boolean>(false);
  readonly contained = input<boolean>(false);

  // Search configuration
  readonly searchPlaceholder = input<string>('Search this website');
  readonly searchAction = input<string>('#');

  readonly navItems = input<NavItem[]>([]);

  readonly isMenuOpen = signal(false);
  readonly searchOpen = signal(false);

  toggleMenu(): void {
    this.isMenuOpen.update((value) => !value);
    if (this.isMenuOpen()) {
      this.searchOpen.set(false);
    }
  }

  toggleSearch(): void {
    this.searchOpen.update((value) => !value);
    if (this.searchOpen()) {
      this.isMenuOpen.set(false);
    }
  }

  closeAll(): void {
    this.isMenuOpen.set(false);
    this.searchOpen.set(false);
  }
}
