import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-qld-accordion-item',
  imports: [],
  templateUrl: './qld-accordion-item.component.html',
  styleUrl: './qld-accordion-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QldAccordionItemComponent {
  private static nextId = 0;
  private readonly instanceId = QldAccordionItemComponent.nextId++;

  @Input({ required: true }) title!: string;
  @Input() dark = false;
  @Input() alt = false;
  @Output() toggled = new EventEmitter<boolean>();

  isOpen = false;

  @Input()
  set expanded(value: boolean) {
    this.isOpen = value;
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
    this.toggled.emit(this.isOpen);
  }

  expand(): void {
    this.isOpen = true;
    this.toggled.emit(true);
  }

  collapse(): void {
    this.isOpen = false;
    this.toggled.emit(false);
  }

  get bodyId(): string {
    return `accordion-body-${this.instanceId}`;
  }

  get headingId(): string {
    return `accordion-heading-${this.instanceId}`;
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
