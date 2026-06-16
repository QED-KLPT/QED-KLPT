import { ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { getSitemapNavItems, SiteNavItem } from '../../navigation/site-navigation';

@Component({
  selector: 'app-sitemap',
  imports: [RouterLink],
  templateUrl: './sitemap.html',
  styleUrl: './sitemap.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sitemap implements OnInit {
  constructor(private scroll: ViewportScroller) {}

  ngOnInit(): void {
    this.scroll.scrollToPosition([0, 0]);
  }

  protected readonly tree = getSitemapNavItems();

  protected renderLink(node: SiteNavItem): string {
    return node.path;
  }
}
