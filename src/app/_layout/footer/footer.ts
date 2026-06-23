import { ChangeDetectionStrategy, Component, ChangeDetectorRef, inject } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

function getDeepestRoute(route: ActivatedRoute): ActivatedRoute {
  let child = route.firstChild;
  while (child) {
    if (child.children.some((c) => c === child)) break;
    if (!child.firstChild) return child;
    child = child.firstChild;
  }
  return route;
}

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  lastUpdatedDate: string | null = null;

  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  constructor() {
    this.router.events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd)).subscribe(() => {
      const deepest = getDeepestRoute(this.activatedRoute);
      const date = (deepest.snapshot.data as { lastUpdated?: string }).lastUpdated ?? null;
      this.lastUpdatedDate = date;
      this.cdr.markForCheck();
    });
  }
}
