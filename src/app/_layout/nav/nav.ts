import { ChangeDetectionStrategy, Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Nav {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  protected readonly isMenuOpen = signal(false);
  protected readonly openSubmenu = signal<string | null>(null);
  protected readonly suppressHoverSubmenus = signal(false);

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

  @HostListener('keydown.escape')
  protected closeMenusOnEscape(): void {
    const activeElement = this.elementRef.nativeElement.ownerDocument.activeElement;
    const menuItem = activeElement?.closest('.doe-primary-nav__item--has-menu') as
      | HTMLElement
      | null
      | undefined;
    const submenuToggle = menuItem?.querySelector<HTMLElement>('.doe-primary-nav__submenu-toggle');

    this.closeAllMenus();
    submenuToggle?.focus();
  }

  protected toggleSubmenu(name: string): void {
    this.suppressHoverSubmenus.set(false);
    this.openSubmenu.update((current) => (current === name ? null : name));
  }

  protected closeMenu(event: MouseEvent): void {
    if (event.currentTarget instanceof HTMLElement) {
      event.currentTarget.blur();
    }

    this.suppressHoverSubmenus.set(true);
    this.closeAllMenus();
  }
}
