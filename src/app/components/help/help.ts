import { ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { InPageNavComponent, type InPageNavItem } from '../shared/in-page-nav/in-page-nav.component';

@Component({
  selector: 'app-help',
  imports: [InPageNavComponent],
  templateUrl: './help.html',
  styleUrl: './help.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Help implements OnInit {
  inPageNavItems: InPageNavItem[] = [
    { label: 'What is the purpose of the KLPT?', href: '#faq-purpose' },
    { label: 'What are the five core skills addressed by the KLPT?', href: '#faq-core-skills' },
    { label: 'What is included in the KLPT?', href: '#faq-included' },
    { label: 'In what order should I use the KLPT?', href: '#faq-order' },
    { label: 'How do teachers and educators use the KLPT to support the Assessment and Planning Cycle?', href: '#faq-assessment-cycle' },
    { label: 'Is the KLP a summative assessment tool?', href: '#faq-summative' },
    { label: 'Why am I seeing observables that appear to be beyond a typical kindergarten aged child?', href: '#faq-observables' },
    { label: 'Is the KLPT culturally responsive and inclusive?', href: '#faq-inclusive' },
    { label: 'Do I need to use every progression with every child?', href: '#faq-every-progression' },
  ];

  constructor(private scroll: ViewportScroller) {}

  ngOnInit(): void {
    this.scroll.scrollToPosition([0, 0]);
  }


}
