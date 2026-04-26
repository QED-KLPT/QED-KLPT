import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { getActiveSection, NAV_SECTIONS, VerticalNavSection } from './nav.data';

@Component({
  selector: 'app-vertical-nav',
  imports: [CommonModule, RouterLink],
  templateUrl: './vertical-nav.html',
  styleUrl: './vertical-nav.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerticalNav {
  private readonly router = inject(Router);

  protected readonly sections: VerticalNavSection[] = NAV_SECTIONS;
  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => this.router.url),
      startWith(this.router.url),
    ),
    { initialValue: this.router.url },
  );
  protected readonly activeSection = computed(() => getActiveSection(this.currentUrl()));

  protected isSectionCurrent(sectionId: VerticalNavSection['id']): boolean {
    return this.activeSection().id === sectionId;
  }
}
