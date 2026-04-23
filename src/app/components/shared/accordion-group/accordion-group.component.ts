import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccordionItemComponent } from '../accordion-item/accordion-item.component';

@Component({
  selector: 'app-accordion-group',
  imports: [],
  templateUrl: './accordion-group.component.html',
  styleUrl: './accordion-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionGroupComponent {
  @Input() dark = false;
  @Input() toggleAll = false;
  @Input() singleOpen = true;

  @ContentChildren(AccordionItemComponent) items!: QueryList<AccordionItemComponent>;

  allExpanded = false;
  private itemSubscriptions = new Subscription();

  ngAfterContentInit(): void {
    this.bindItemToggles();
    this.items.changes.subscribe(() => {
      this.bindItemToggles();
      this.syncAllExpandedState();
    });
    this.syncAllExpandedState();
  }

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

  handleItemToggle(item: AccordionItemComponent, isOpen: boolean): void {
    if (this.singleOpen && isOpen && this.items) {
      for (const sibling of this.items.toArray()) {
        if (sibling !== item) {
          sibling.collapse();
        }
      }
    }

    this.syncAllExpandedState();
  }

  private bindItemToggles(): void {
    this.itemSubscriptions.unsubscribe();
    this.itemSubscriptions = new Subscription();

    if (!this.items) {
      return;
    }

    for (const item of this.items.toArray()) {
      this.itemSubscriptions.add(item.toggled.subscribe((isOpen) => this.handleItemToggle(item, isOpen)));
    }
  }

  private syncAllExpandedState(): void {
    this.allExpanded = this.items?.length > 0 && this.items.toArray().every((item) => item.isOpen);
  }
}
