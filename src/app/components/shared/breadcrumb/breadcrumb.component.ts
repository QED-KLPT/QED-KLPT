import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

export type BreadcrumbVariant = 'default' | 'alt';

@Component({
  selector: 'app-breadcrumb',
  imports: [RouterLink],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent {
  @Input({ required: true }) items!: BreadcrumbItem[];
  @Input() variant: BreadcrumbVariant = 'default';
  @Input() showHomeIcon = false;

  get breadcrumbClasses(): string {
    const classes: string[] = ['qld__breadcrumbs'];

    if (this.variant === 'alt') {
      classes.push('qld__breadcrumbs--alt');
    }

    return classes.join(' ');
  }

  get hasHomeIcon(): boolean {
    return this.showHomeIcon && this.items.length > 0;
  }

  get homeLabel(): string {
    return this.items[0]?.label ?? 'Home';
  }

  get homeHref(): string {
    return this.items[0]?.href ?? '/';
  }

  get separatorClass(): string {
    return 'qld__breadcrumbs__separator';
  }

  get parentItem(): BreadcrumbItem | null {
    return this.items.length > 1 ? this.items[this.items.length - 2] : null;
  }

  isRouterLink(href: string | undefined): href is string {
    return !!href && href.startsWith('/');
  }
}
