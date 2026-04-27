import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export interface QldSideNavItem {
  label: string;
  href?: string;
  children?: QldSideNavItem[];
  icon?: string;
  active?: boolean;
  isTitle?: boolean;
}

@Component({
  selector: 'app-qld-side-nav',
  imports: [],
  templateUrl: './qld-side-nav.component.html',
  styleUrl: './qld-side-nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QldSideNavComponent {
  @Input() items: QldSideNavItem[] = [];
  @Input() title = 'In this section';
  @Input() ariaLabel = 'section';
  @Input() collapsed = false;

  protected openMenus = new Set<string>();

  toggleMenu(item: QldSideNavItem): void {
    const key = this.getItemKey(item);
    if (this.openMenus.has(key)) {
      this.openMenus.delete(key);
    } else {
      this.openMenus.add(key);
    }
  }

  isExpanded(item: QldSideNavItem): boolean {
    return this.openMenus.has(this.getItemKey(item));
  }

  isCurrentPage(item: QldSideNavItem): boolean {
    return item.active ?? false;
  }

  hasChildren(item: QldSideNavItem): boolean {
    return !!(item.children && item.children.length > 0);
  }

  isTitle(item: QldSideNavItem): boolean {
    return item.isTitle ?? false;
  }

  getItemKey(item: QldSideNavItem): string {
    return item.label.replace(/\s+/g, '-').toLowerCase();
  }

  getAsideClasses(): string {
    return 'qld__side-nav qld__accordion';
  }

  getToggleClasses(): string {
    const classes = ['qld__side-nav__toggle', 'qld__accordion__title'];
    if (this.collapsed) {
      classes.push('qld__accordion--closed');
    } else {
      classes.push('qld__accordion--open');
    }
    return classes.join(' ');
  }

  getNavClasses(item: QldSideNavItem): string {
    const classes = ['qld__side-nav__content'];
    if (this.collapsed || !this.isExpanded(item)) {
      classes.push('qld__accordion--closed');
    } else {
      classes.push('qld__accordion--open');
    }
    return classes.join(' ');
  }

  getNavId(item: QldSideNavItem): string {
    return `nav-${this.getItemKey(item)}`;
  }

  getTitleClasses(): string {
    return 'qld__sidenav__title';
  }

  getLinkClasses(item: QldSideNavItem): string {
    const classes = ['qld__sidenav__link'];
    return classes.join(' ');
  }

  getListItemClasses(item: QldSideNavItem): string {
    const classes: string[] = [];
    if (this.isCurrentPage(item)) {
      classes.push('active');
    } else if (this.hasChildren(item)) {
      classes.push('qld__side-nav__item--has-children');
    }
    return classes.join(' ');
  }

  getLinkListClasses(): string {
    return 'qld__link-list';
  }

  getIconClasses(): string {
    return 'qld__icon qld__icon--sm';
  }

  getChevronClasses(): string {
    return 'qld__icon qld__icon--sm';
  }

  getChevronOpenPath(): string {
    return '#chevron-up';
  }

  getChevronClosedPath(): string {
    return '#chevron-down';
  }

  getToggleAriaExpanded(): string {
    return this.collapsed ? 'false' : 'true';
  }

  getToggleAriaSelected(): string {
    return this.collapsed ? 'false' : 'true';
  }

  getToggleAriaControls(): string {
    return this.items.length > 0 ? `nav-${this.getItemKey(this.items[0])}` : 'nav-default';
  }

  getNavAriaControls(): string {
    return this.items.length > 0 ? `nav-${this.getItemKey(this.items[0])}` : 'nav-default';
  }

  getToggleId(): string {
    return 'side-nav-toggle';
  }
}
