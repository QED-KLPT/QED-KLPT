import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export interface VerticalNavItem {
  label: string;
  href?: string;
  children?: VerticalNavItem[];
  icon?: string;
  active?: boolean;
  isHeader?: boolean;
}

@Component({
  selector: 'app-vertical-nav',
  imports: [],
  templateUrl: './vertical-nav.component.html',
  styleUrl: './vertical-nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerticalNavComponent {
  @Input() items: VerticalNavItem[] = [];
  @Input() title = '';
  @Input() ariaLabel = 'Vertical navigation';

  protected openMenus = new Set<string>();

  toggleMenu(item: VerticalNavItem): void {
    const key = this.getItemKey(item);
    if (this.openMenus.has(key)) {
      this.openMenus.delete(key);
    } else {
      this.openMenus.add(key);
    }
  }

  isExpanded(item: VerticalNavItem): boolean {
    return this.openMenus.has(this.getItemKey(item));
  }

  isCurrentPage(item: VerticalNavItem): boolean {
    return item.active ?? false;
  }

  hasChildren(item: VerticalNavItem): boolean {
    return (item.children && item.children.length > 0) ?? false;
  }

  isHeader(item: VerticalNavItem): boolean {
    return item.isHeader ?? false;
  }

  getItemKey(item: VerticalNavItem): string {
    return item.label.replace(/\s+/g, '-').toLowerCase();
  }

  getNavClasses(): string {
    return 'qld__left-nav';
  }

  getNavContentClasses(): string {
    return 'qld__left-nav__content';
  }

  getLinkClasses(item: VerticalNavItem): string {
    const classes = ['qld__left-nav__item-link'];
    if (this.isCurrentPage(item)) {
      classes.push('qld__left-nav__item-link--open');
    }
    return classes.join(' ');
  }

  getToggleClasses(item: VerticalNavItem): string {
    const classes = ['qld__left-nav__item-toggle'];
    if (this.isExpanded(item)) {
      classes.push('qld__accordion--open');
    } else {
      classes.push('qld__accordion--closed');
    }
    return classes.join(' ');
  }

  getSubmenuClasses(item: VerticalNavItem): string {
    const classes = ['qld__link-list', 'qld__accordion__body'];
    if (this.isExpanded(item)) {
      classes.push('qld__accordion--open');
    } else {
      classes.push('qld__accordion--closed');
    }
    return classes.join(' ');
  }

  getSubmenuId(item: VerticalNavItem): string {
    return `internal-nav-${this.getItemKey(item)}`;
  }

  getItemClasses(item: VerticalNavItem): string {
    const classes: string[] = [];
    if (this.isHeader(item)) {
      classes.push('qld__left-nav__item--header');
    } else if (this.isCurrentPage(item)) {
      classes.push('active');
    } else if (this.hasChildren(item)) {
      classes.push('qld__left-nav__item--has-submenu');
    }
    return classes.join(' ');
  }

  getHeaderClasses(): string {
    return 'qld__left-nav__header';
  }

  getHeaderTextClasses(): string {
    return 'qld__left-nav__item-text';
  }

  getIconClasses(): string {
    return 'qld__left-nav__item-icon';
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

  getHomeIconPath(): string {
    return '#home';
  }
}
