import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AccordionGroupComponent } from '../../shared/accordion-group/accordion-group.component';
import { AccordionItemComponent } from '../../shared/accordion-item/accordion-item.component';

export interface AccordionDemoItem {
  id: string;
  title: string;
  expanded?: boolean;
  dark?: boolean;
  alt?: boolean;
}

@Component({
  selector: 'app-testing-accordians',
  imports: [AccordionGroupComponent, AccordionItemComponent],
  templateUrl: './testing-accordians.html',
  styleUrl: './testing-accordians.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestingAccordians {
  demo1Items: AccordionDemoItem[] = [
    { id: 'd1', title: 'Accordion heading 1' },
  ];

  demo2Items: AccordionDemoItem[] = [
    { id: 'd2', title: 'Accordion heading 1', expanded: true },
  ];

  demo3Items: AccordionDemoItem[] = [
    { id: 'd3', title: 'Dark accordion heading' },
  ];

  demo4Items: AccordionDemoItem[] = [
    { id: 'd4', title: 'Alt background accordion' },
  ];

  demo5Items: AccordionDemoItem[] = [
    { id: 'd5a', title: 'Accordion heading 1' },
    { id: 'd5b', title: 'Accordion heading 2' },
    { id: 'd5c', title: 'Accordion heading 3' },
  ];

  demo6Items: AccordionDemoItem[] = [
    { id: 'd6a', title: 'Accordion heading 1' },
    { id: 'd6b', title: 'Accordion heading 2' },
    { id: 'd6c', title: 'Accordion heading 3' },
  ];

  demo7Items: AccordionDemoItem[] = [
    { id: 'd7a', title: 'Dark group heading 1' },
    { id: 'd7b', title: 'Dark group heading 2' },
    { id: 'd7c', title: 'Dark group heading 3' },
  ];

  demo8Items: AccordionDemoItem[] = [
    { id: 'd8a', title: 'First item expanded', expanded: true },
    { id: 'd8b', title: 'Second item' },
    { id: 'd8c', title: 'Third item' },
  ];

  demo9Items: AccordionDemoItem[] = [
    { id: 'd9a', title: 'Dark variant item' },
    { id: 'd9b', title: 'Alt variant item' },
    { id: 'd9c', title: 'Default variant item' },
  ];

  demo10Items: AccordionDemoItem[] = [
    { id: 'd10a', title: 'Rich content accordion' },
    { id: 'd10b', title: 'Another rich item' },
  ];

  demo3ItemClasses(_item: AccordionDemoItem): string {
    return 'qld__accordion qld__accordion--dark';
  }

  demo4ItemClasses(_item: AccordionDemoItem): string {
    return 'qld__accordion qld__accordion--alt';
  }

  demo7ItemClasses(_item: AccordionDemoItem): string {
    return 'qld__accordion qld__accordion--dark';
  }

  demo9ItemClasses(item: AccordionDemoItem): string {
    if (item.dark) return 'qld__accordion qld__accordion--dark';
    if (item.alt) return 'qld__accordion qld__accordion--alt';
    return 'qld__accordion';
  }

  demo10ItemClasses(_item: AccordionDemoItem): string {
    return 'qld__accordion';
  }
}
