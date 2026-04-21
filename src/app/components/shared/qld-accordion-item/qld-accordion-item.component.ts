import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-qld-accordion-item',
  imports: [],
  templateUrl: './qld-accordion-item.component.html',
  styleUrl: './qld-accordion-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QldAccordionItemComponent {
  @Input({ required: true }) title!: string;
  @Input() expanded = false;
  @Input() dark = false;
  @Input() alt = false;

  isOpen = false;

  constructor() {
    this.isOpen = this.expanded;
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  expand(): void {
    this.isOpen = true;
  }

  collapse(): void {
    this.isOpen = false;
  }

  get bodyId(): string {
    return 'accordion-body-' + Math.random().toString(36).substring(2, 9);
  }

  get headingId(): string {
    return 'accordion-heading-' + Math.random().toString(36).substring(2, 9);
  }

  get accordionClasses(): string {
    const base = 'qld__accordion';
    const states: string[] = [base];

    if (this.isOpen) {
      states.push(base + '--open');
    } else {
      states.push(base + '--closed');
    }

    if (this.dark) {
      states.push(base + '--dark');
    }

    if (this.alt) {
      states.push(base + '--alt');
    }

    return states.join(' ');
  }
}
