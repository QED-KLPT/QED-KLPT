import { ChangeDetectionStrategy, Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-back-to-top',
  imports: [],
  templateUrl: './back-to-top.component.html',
  styleUrl: './back-to-top.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackToTopComponent implements OnInit {
  @Input() threshold = 520;

  protected isVisible = false;

  ngOnInit(): void {
    this.updateVisibility();
  }

  @HostListener('window:scroll')
  protected onWindowScroll(): void {
    this.updateVisibility();
  }

  protected scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  private updateVisibility(): void {
    this.isVisible = window.scrollY > this.threshold;
  }
}
