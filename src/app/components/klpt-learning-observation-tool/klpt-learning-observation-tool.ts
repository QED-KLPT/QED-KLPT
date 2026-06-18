import { ChangeDetectionStrategy, Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { BreadcrumbComponent, BreadcrumbItem } from '../shared/breadcrumb';

@Component({
  selector: 'app-klpt',
  imports: [BreadcrumbComponent, RouterOutlet],
  templateUrl: './klpt-learning-observation-tool.html',
  styleUrl: './klpt-learning-observation-tool.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Klpt {
  private readonly router = inject(Router);

  protected readonly isToolActive = signal(this.isLaunchedToolRoute(this.router.url));

  protected readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Learning observation tool', current: true },
  ];

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe((event) => {
        this.isToolActive.set(this.isLaunchedToolRoute(event.urlAfterRedirects));
      });
  }

  private isLaunchedToolRoute(url: string): boolean {
    const path = url.split(/[?#]/)[0].replace(/\/$/, '');

    return path.startsWith('/learning-observation-tool/') && path !== '/learning-observation-tool/introduction';
  }
}
