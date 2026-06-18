import { ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { getSitemapNavItems, SiteNavItem } from '../../navigation/site-navigation';
import { BreadcrumbComponent, BreadcrumbItem } from '../shared/breadcrumb';

@Component({
  selector: 'app-sitemap',
  imports: [BreadcrumbComponent, RouterLink],
  templateUrl: './sitemap.html',
  styleUrl: './sitemap.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sitemap implements OnInit {
  constructor(private scroll: ViewportScroller) {}

  protected readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Site map', current: true },
  ];

  ngOnInit(): void {
    this.scroll.scrollToPosition([0, 0]);
  }

  protected readonly tree = getSitemapNavItems();

  protected renderLink(node: SiteNavItem): string {
    return node.path;
  }
}
