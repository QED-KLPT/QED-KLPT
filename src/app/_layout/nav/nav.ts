import { ChangeDetectionStrategy, Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { getPrimaryNavItems, SiteNavItem } from '../../navigation/site-navigation';
import { DomainAssetModeService } from '../../services/domain-asset-mode.service';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Nav {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  protected readonly domainAssetMode = inject(DomainAssetModeService);

  protected readonly isMenuOpen = signal(false);
  protected readonly openSubmenu = signal<string | null>(null);
  protected readonly suppressHoverSubmenus = signal(false);
  protected readonly navItems = getPrimaryNavItems();

  protected allowHoverSubmenus(event: PointerEvent): void {
    if (event.pointerType === 'mouse') {
      this.suppressHoverSubmenus.set(false);
    }
  }

  protected toggleMenu(): void {
    this.isMenuOpen.update((value) => !value);

    if (!this.isMenuOpen()) {
      this.openSubmenu.set(null);
    }
  }

  protected closeAllMenus(): void {
    this.isMenuOpen.set(false);
    this.openSubmenu.set(null);
  }

  @HostListener('focusout', ['$event'])
  protected onFocusOut(event: FocusEvent): void {
    if (!this.openSubmenu()) return;

    const relatedTarget = event.relatedTarget as HTMLElement | null;
    const host = this.elementRef.nativeElement as HTMLElement;
    const openItem = host
      .querySelector<HTMLElement>(`#${this.openSubmenu()}-submenu`)
      ?.closest<HTMLElement>('.doe-primary-nav__item--has-menu');

    if (openItem && !openItem.contains(relatedTarget)) {
      this.openSubmenu.set(null);
    }
  }

  @HostListener('keydown.escape')
  protected closeMenusOnEscape(): void {
    const activeElement = this.elementRef.nativeElement.ownerDocument.activeElement;
    const menuItem = activeElement?.closest('.doe-primary-nav__item--has-menu') as
      | HTMLElement
      | null
      | undefined;
    const parentLink = menuItem?.querySelector<HTMLElement>('.doe-primary-nav__item-row > .doe-primary-nav__link');

    this.closeAllMenus();
    parentLink?.focus();
  }

  @HostListener('keydown.arrowdown', ['$event'])
  protected moveDown(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    const activeElement = this.elementRef.nativeElement.ownerDocument.activeElement as HTMLElement | null;
    const menuItem = activeElement?.closest('.doe-primary-nav__item--has-menu') as HTMLElement | null | undefined;

    if (!menuItem) {
      return;
    }

    keyboardEvent.preventDefault();

    if (activeElement?.closest('.doe-primary-nav__submenu')) {
      this.focusAdjacentSubmenuItem(menuItem, 1);
      return;
    }

    this.openSubmenuFromMenuItem(menuItem);
    this.focusFirstSubmenuItem(menuItem);
  }

  @HostListener('keydown.arrowup', ['$event'])
  protected moveUp(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    const activeElement = this.elementRef.nativeElement.ownerDocument.activeElement as HTMLElement | null;
    const menuItem = activeElement?.closest('.doe-primary-nav__item--has-menu') as HTMLElement | null | undefined;

    if (!menuItem || !activeElement?.closest('.doe-primary-nav__submenu')) {
      return;
    }

    keyboardEvent.preventDefault();
    this.focusAdjacentSubmenuItem(menuItem, -1);
  }

  protected hasChildren(item: SiteNavItem): boolean {
    return !!item.children?.length;
  }

  protected itemKey(item: SiteNavItem): string {
    return item.path.replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '') || 'home';
  }

  protected isSubmenuOpen(item: SiteNavItem): boolean {
    return this.openSubmenu() === this.itemKey(item);
  }

  protected toggleSubmenu(name: string): void {
    this.suppressHoverSubmenus.set(true);
    this.openSubmenu.update((current) => (current === name ? null : name));
  }

  protected toggleDomainAssetMode(): void {
    this.domainAssetMode.toggle();
  }

  protected closeMenu(event: MouseEvent): void {
    if (event.currentTarget instanceof HTMLElement) {
      event.currentTarget.blur();
    }

    this.suppressHoverSubmenus.set(true);
    this.closeAllMenus();
  }

  private openSubmenuFromMenuItem(menuItem: HTMLElement): void {
    const submenuName = this.getSubmenuName(menuItem);

    if (!submenuName) {
      return;
    }

    this.suppressHoverSubmenus.set(true);
    this.openSubmenu.set(submenuName);
  }

  private getSubmenuName(menuItem: HTMLElement): string | null {
    const submenuId = menuItem.querySelector<HTMLElement>('.doe-primary-nav__submenu-toggle')?.getAttribute('aria-controls');

    return submenuId?.replace(/-submenu$/, '') ?? null;
  }

  private focusFirstSubmenuItem(menuItem: HTMLElement): void {
    window.setTimeout(() => {
      this.getSubmenuLinks(menuItem)[0]?.focus();
    });
  }

  private focusAdjacentSubmenuItem(menuItem: HTMLElement, direction: 1 | -1): void {
    const submenuLinks = this.getSubmenuLinks(menuItem);
    const activeElement = this.elementRef.nativeElement.ownerDocument.activeElement;
    const activeIndex = submenuLinks.findIndex((link) => link === activeElement);

    if (submenuLinks.length === 0) {
      return;
    }

    if (activeIndex === -1) {
      submenuLinks[0]?.focus();
      return;
    }

    const nextIndex = (activeIndex + direction + submenuLinks.length) % submenuLinks.length;
    submenuLinks[nextIndex]?.focus();
  }

  private getSubmenuLinks(menuItem: HTMLElement): HTMLElement[] {
    return Array.from(menuItem.querySelectorAll<HTMLElement>('.doe-primary-nav__submenu a'));
  }
}
