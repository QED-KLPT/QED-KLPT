import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

export type QldBreadcrumbVariant = 'default' | 'alt';

@Component({
  selector: 'app-qld-breadcrumb',
  imports: [],
  templateUrl: './qld-breadcrumb.component.html',
  styleUrl: './qld-breadcrumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QldBreadcrumbComponent {
  @Input({ required: true }) items!: BreadcrumbItem[];
  @Input() variant: QldBreadcrumbVariant = 'default';
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
}
