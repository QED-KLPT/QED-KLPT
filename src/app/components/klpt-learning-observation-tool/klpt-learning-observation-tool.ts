import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
  protected readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Learning observation tool', current: true },
  ];
}
