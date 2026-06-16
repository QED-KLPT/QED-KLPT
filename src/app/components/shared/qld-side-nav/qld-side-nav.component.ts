import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

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
export class QldSideNavComponent {
  private readonly router = inject(Router);

  @Input() items: QldSideNavItem[] = [];
  @Input() title = 'In this section...';
  @Input() ariaLabel = 'Section navigation';
  @Input() collapsed = false;

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

  protected flattenedItems(): QldSideNavItem[] {
    return this.flattenItems(this.items.filter((item) => !this.isTitle(item)));
  }

  protected onMobileNavChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const target = select.value;

    if (!target) {
      return;
    }

    if (target.startsWith('/')) {
      void this.router.navigateByUrl(target);
      return;
    }

    window.location.href = target;
  }

  private flattenItems(items: QldSideNavItem[]): QldSideNavItem[] {
    return items.flatMap((item) => [item, ...this.flattenItems(item.children ?? [])]);
  }
}
