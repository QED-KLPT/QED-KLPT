import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavItem[];
  description?: string;
}

export type QldNavTheme = 'light' | 'dark';

interface SubMenuData {
  heading: string;
  headingHref: string;
  columns: NavItem[][];
  viewAllHref?: string;
}

@Component({
  selector: 'app-qld-main-nav',
  imports: [NgFor, NgIf],
  templateUrl: './qld-main-nav.html',
  styleUrl: './qld-main-nav.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QldMainNav {
  readonly items = input<NavItem[]>([]);
  readonly theme = input<QldNavTheme>('light');
  readonly activeItem = input<string>('');
  readonly showMobileToggle = input<boolean>(true);

  protected readonly isMenuOpen = signal(false);
  protected readonly openSubmenu = signal<string | null>(null);

  toggleMenu(): void {
    this.isMenuOpen.update((value) => !value);
    if (this.isMenuOpen()) {
      this.openSubmenu.set(null);
    } else {
      setTimeout(() => this.openSubmenu.set(null), 300);
    }
  }

  closeAllMenus(): void {
    this.isMenuOpen.set(false);
    this.openSubmenu.set(null);
  }

  toggleSubmenu(name: string): void {
    this.openSubmenu.update((current) => (current === name ? null : name));
  }

  closeMenu(event: MouseEvent): void {
    if (event.currentTarget instanceof HTMLElement) {
      event.currentTarget.blur();
    }
    this.closeAllMenus();
  }

  hasChildren(item: NavItem): boolean {
    return !!(item.children && item.children.length > 0);
  }

  isItemActive(item: NavItem): boolean {
    return this.activeItem() === item.label;
  }

  isChildActive(item: NavItem): boolean {
    if (!item.children) return false;
    return item.children.some((child) => this.activeItem() === child.label);
  }

  getSubmenuColumns(children: NavItem[], colCount = 3): NavItem[][] {
    const chunkSize = Math.ceil(children.length / colCount);
    const columns: NavItem[][] = [];
    for (let i = 0; i < children.length; i += chunkSize) {
      columns.push(children.slice(i, i + chunkSize));
    }
    return columns;
  }

  getHomeIcon(): string {
    return 'fa-light fa-house';
  }
}
