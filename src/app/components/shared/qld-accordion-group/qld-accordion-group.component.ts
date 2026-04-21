import { ChangeDetectionStrategy, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { QldAccordionItemComponent } from '../qld-accordion-item/qld-accordion-item.component';

@Component({
  selector: 'app-qld-accordion-group',
  imports: [],
  templateUrl: './qld-accordion-group.component.html',
  styleUrl: './qld-accordion-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QldAccordionGroupComponent {
  @Input() dark = false;
  @Input() toggleAll = false;

  @ContentChildren(QldAccordionItemComponent) items!: QueryList<QldAccordionItemComponent>;

  allExpanded = false;

  handleToggleAll(): void {
    this.allExpanded = !this.allExpanded;

    if (this.items) {
      for (const item of this.items.toArray()) {
        if (this.allExpanded) {
          item.expand();
        } else {
          item.collapse();
        }
      }
    }
  }

  get toggleAllLabel(): string {
    return this.allExpanded ? 'Close all' : 'Open all';
  }

  get toggleBtnClasses(): string {
    const base = 'qld__accordion__toggle-btn';
    return this.allExpanded ? (base + ' ' + base + '--open') : base;
  }

  get groupClasses(): string {
    const base = 'qld__accordion-group';
    return this.dark ? (base + ' ' + base + '--dark') : base;
  }

  get shouldShowToggle(): boolean {
    return this.toggleAll && this.items?.length >= 3;
  }

  get isOpenCount(): number {
    if (!this.items) return 0;
    let count = 0;
    for (const item of this.items.toArray()) {
      if (item.isOpen) count++;
    }
    return count;
  }

  get isAllOpen(): boolean {
    if (!this.items || this.items.length === 0) return false;
    return this.isOpenCount === this.items.length;
  }

  get isAnyOpen(): boolean {
    return this.isOpenCount > 0;
  }

  get accordionGroupClass(): string {
    const base = 'qld__accordion-group';
    return this.dark ? (base + ' ' + base + '--dark') : base;
  }
}
