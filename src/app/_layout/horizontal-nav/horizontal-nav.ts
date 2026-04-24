import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { getActiveSection, HorizontalNavItem } from '../vertical-nav/nav.data';

@Component({
  selector: 'app-horizontal-nav',
  imports: [CommonModule, RouterLink],
  templateUrl: './horizontal-nav.html',
  styleUrl: './horizontal-nav.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorizontalNav {
  private readonly router = inject(Router);

  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => this.router.url),
      startWith(this.router.url),
    ),
    { initialValue: this.router.url },
  );

  protected readonly activeSection = computed(() => getActiveSection(this.currentUrl()));
  protected readonly items = computed(() => this.activeSection().horizontalItems);
  protected readonly hasItems = computed(() => this.items().length > 0);

  protected isItemCurrent(item: HorizontalNavItem): boolean {
    const url = this.currentUrl();
    const prefixes = item.matchPrefixes ?? [item.route];

    return prefixes.some((prefix) => url === prefix || url.startsWith(`${prefix}/`));
  }
}
