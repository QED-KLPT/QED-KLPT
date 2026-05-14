import { AfterViewInit, ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-practice-supports',
  imports: [],
  templateUrl: './practice-supports.html',
  styleUrl: './practice-supports.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PracticeSupports implements OnInit, AfterViewInit {
  constructor(private scroll: ViewportScroller) {}

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
