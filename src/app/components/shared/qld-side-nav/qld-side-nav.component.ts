import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface QldSideNavItem {
  label: string;
  path?: string;
  href?: string;
  children?: QldSideNavItem[];
  icon?: string;
  active?: boolean;
  isTitle?: boolean;
}

@Component({
  selector: 'app-qld-side-nav',
  imports: [RouterLink],
  templateUrl: './qld-side-nav.component.html',
  styleUrl: './qld-side-nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QldSideNavComponent implements OnChanges {
  protected readonly expandedItems = new Set<string>();
  protected mobileExpanded = false;

  @Input() items: QldSideNavItem[] = [];
  @Input() title = 'In this section...';
  @Input() ariaLabel = 'Section navigation';
  @Input() collapsed = false;

  ngOnChanges(): void {
    this.expandedItems.clear();
    this.items.forEach((item) => this.expandActiveBranches(item));
  }

  protected hasChildren(item: QldSideNavItem): boolean {
    return !!item.children?.length;
  }

  protected isCurrentPage(item: QldSideNavItem): boolean {
    return item.active ?? false;
  }

  protected isTitle(item: QldSideNavItem): boolean {
    return item.isTitle ?? false;
  }

  protected linkTarget(item: QldSideNavItem): string {
    return item.path ?? item.href ?? '';
  }

  protected isRouterLink(item: QldSideNavItem): boolean {
    return this.linkTarget(item).startsWith('/');
  }

  protected itemKey(item: QldSideNavItem): string {
    return this.linkTarget(item) || item.label;
  }

  protected panelId(item: QldSideNavItem): string {
    return `side-nav-${this.itemKey(item).replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
  }

  protected isExpanded(item: QldSideNavItem): boolean {
    return this.expandedItems.has(this.itemKey(item));
  }

  protected toggleMobileNav(): void {
    this.mobileExpanded = !this.mobileExpanded;
  }

  protected toggleItem(item: QldSideNavItem): void {
    const key = this.itemKey(item);

    if (this.expandedItems.has(key)) {
      this.expandedItems.delete(key);
      return;
    }

    this.expandedItems.add(key);
  }

  private expandActiveBranches(item: QldSideNavItem): boolean {
    const hasActiveChild = item.children?.some((child) => this.expandActiveBranches(child)) ?? false;
    const isActiveBranch = this.isCurrentPage(item) || hasActiveChild;

    if (this.hasChildren(item) && isActiveBranch) {
      this.expandedItems.add(this.itemKey(item));
    }

    return isActiveBranch;
  }
}
