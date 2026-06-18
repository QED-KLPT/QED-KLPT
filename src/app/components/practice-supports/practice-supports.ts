import { AfterViewInit, ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { BreadcrumbComponent, BreadcrumbItem } from '../shared/breadcrumb';

@Component({
  selector: 'app-practice-supports',
  imports: [BreadcrumbComponent],
  templateUrl: './practice-supports.html',
  styleUrl: './practice-supports.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PracticeSupports implements OnInit, AfterViewInit {
  constructor(private scroll: ViewportScroller) {}

  protected readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Practice supports', current: true },
  ];

  private readonly route = inject(ActivatedRoute);
  private readonly viewportScroller = inject(ViewportScroller);
  private fragmentToScroll?: string;
  private viewInitialized = false;

  ngOnInit(): void {
    this.scroll.scrollToPosition([0, 0]);
    this.route.fragment.subscribe((fragment) => {
      if (!fragment) {
        return;
      }

      if (this.viewInitialized) {
        this.scrollToAnchor(fragment);
      } else {
        this.fragmentToScroll = fragment;
      }
    });
  }

  ngAfterViewInit(): void {
    this.viewInitialized = true;

    if (this.fragmentToScroll) {
      this.scrollToAnchor(this.fragmentToScroll);
    }
  }

  private scrollToAnchor(fragment: string): void {
    Promise.resolve().then(() => this.viewportScroller.scrollToAnchor(fragment));
  }
}
