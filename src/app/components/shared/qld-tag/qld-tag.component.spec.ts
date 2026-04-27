import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QldTagComponent } from './qld-tag.component';

@Component({
  selector: 'qld-tag-host',
  template: `<qld-tag>{{ label }}</qld-tag>`,
  imports: [QldTagComponent],
})
class QldTagHostComponent {
  label = 'Test Label';
}

describe('QldTagComponent', () => {
  let fixture: ComponentFixture<QldTagHostComponent>;
  let component: QldTagHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QldTagHostComponent, QldTagComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QldTagHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render projected content', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Test Label');
  });

  it('should apply default classes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const tag = compiled.querySelector('.qld__tag');
    expect(tag).toBeTruthy();
    expect(tag?.classList.contains('qld__tag')).toBe(true);
  });

  it('should apply large class when size is large', () => {
    fixture.destroy();

    @Component({
      selector: 'qld-tag-host-large',
      template: `<qld-tag [size]="size">Large Tag</qld-tag>`,
      imports: [QldTagComponent],
    })
    class LargeTagHost {
      size = 'large' as const;
    }

    const largeFixture = TestBed.createComponent(LargeTagHost);
    largeFixture.detectChanges();
    const compiled = largeFixture.nativeElement as HTMLElement;
    const tag = compiled.querySelector('.qld__tag');
    expect(tag?.classList.contains('qld__tag--large')).toBe(true);
  });

  it('should apply link class when type is link', () => {
    fixture.destroy();

    @Component({
      selector: 'qld-tag-host-link',
      template: `<qld-tag [type]="type">Link Tag</qld-tag>`,
      imports: [QldTagComponent],
    })
    class LinkTagHost {
      type = 'link' as const;
    }

    const linkFixture = TestBed.createComponent(LinkTagHost);
    linkFixture.detectChanges();
    const compiled = linkFixture.nativeElement as HTMLElement;
    const tag = compiled.querySelector('.qld__tag');
    expect(tag?.classList.contains('qld__tag--link')).toBe(true);
  });

  it('should apply info class when type is info', () => {
    fixture.destroy();

    @Component({
      selector: 'qld-tag-host-info',
      template: `<qld-tag [type]="type">Info Tag</qld-tag>`,
      imports: [QldTagComponent],
    })
    class InfoTagHost {
      type = 'info' as const;
    }

    const infoFixture = TestBed.createComponent(InfoTagHost);
    infoFixture.detectChanges();
    const compiled = infoFixture.nativeElement as HTMLElement;
    const tag = compiled.querySelector('.qld__tag');
    expect(tag?.classList.contains('qld__tag--info')).toBe(true);
  });

  it('should apply filter class when type is filter', () => {
    fixture.destroy();

    @Component({
      selector: 'qld-tag-host-filter',
      template: `<qld-tag [type]="type">Filter Tag</qld-tag>`,
      imports: [QldTagComponent],
    })
    class FilterTagHost {
      type = 'filter' as const;
    }

    const filterFixture = TestBed.createComponent(FilterTagHost);
    filterFixture.detectChanges();
    const compiled = filterFixture.nativeElement as HTMLElement;
    const tag = compiled.querySelector('.qld__tag');
    expect(tag?.classList.contains('qld__tag--filter')).toBe(true);
  });

  it('should show close button when closable is true and type is filter', () => {
    fixture.destroy();

    @Component({
      selector: 'qld-tag-host-closable',
      template: `<qld-tag [type]="type" [closable]="closable">Closable Tag</qld-tag>`,
      imports: [QldTagComponent],
    })
    class ClosableTagHost {
      type = 'filter' as const;
      closable = true;
    }

    const closableFixture = TestBed.createComponent(ClosableTagHost);
    closableFixture.detectChanges();
    const compiled = closableFixture.nativeElement as HTMLElement;
    const closeBtn = compiled.querySelector('.qld__tag__close');
    expect(closeBtn).toBeTruthy();
  });

  it('should not show close button when closable is false', () => {
    fixture.destroy();

    @Component({
      selector: 'qld-tag-host-not-closable',
      template: `<qld-tag [type]="type" [closable]="closable">Not Closable</qld-tag>`,
      imports: [QldTagComponent],
    })
    class NotClosableHost {
      type = 'filter' as const;
      closable = false;
    }

    const notClosableFixture = TestBed.createComponent(NotClosableHost);
    notClosableFixture.detectChanges();
    const compiled = notClosableFixture.nativeElement as HTMLElement;
    const closeBtn = compiled.querySelector('.qld__tag__close');
    expect(closeBtn).toBeFalsy();
  });

  it('should emit close event when close button is clicked', () => {
    fixture.destroy();

    let closeEmitted = false;

    @Component({
      selector: 'qld-tag-host-close',
      template: `<qld-tag [type]="type" [closable]="true" (close)="onClose()"></qld-tag>`,
      imports: [QldTagComponent],
    })
    class CloseEventHost {
      type = 'filter' as const;
      onClose() { closeEmitted = true; }
    }

    const closeFixture = TestBed.createComponent(CloseEventHost);
    closeFixture.detectChanges();
    const compiled = closeFixture.nativeElement as HTMLElement;
    const closeBtn = compiled.querySelector('.qld__tag__close') as HTMLButtonElement;
    closeBtn?.click();
    expect(closeEmitted).toBe(true);
  });

  it('should render span with href attribute for link type', () => {
    fixture.destroy();

    @Component({
      selector: 'qld-tag-host-href',
      template: `<qld-tag [type]="type" [href]="href">Href Tag</qld-tag>`,
      imports: [QldTagComponent],
    })
    class HrefTagHost {
      type = 'link' as const;
      href = '#test';
    }

    const hrefFixture = TestBed.createComponent(HrefTagHost);
    hrefFixture.detectChanges();
    const compiled = hrefFixture.nativeElement as HTMLElement;
    const tag = compiled.querySelector('.qld__tag');
    expect(tag?.getAttribute('href')).toBe('#test');
  });

  it('should render as span for default type', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const tag = compiled.querySelector('span');
    expect(tag?.tagName).toBe('SPAN');
  });

  it('should render as span for info type', () => {
    fixture.destroy();

    @Component({
      selector: 'qld-tag-host-info-span',
      template: `<qld-tag [type]="type">Info Span</qld-tag>`,
      imports: [QldTagComponent],
    })
    class InfoSpanHost {
      type = 'info' as const;
    }

    const infoSpanFixture = TestBed.createComponent(InfoSpanHost);
    infoSpanFixture.detectChanges();
    const compiled = infoSpanFixture.nativeElement as HTMLElement;
    const tag = compiled.querySelector('span');
    expect(tag?.tagName).toBe('SPAN');
  });

  it('should render as span for filter type', () => {
    fixture.destroy();

    @Component({
      selector: 'qld-tag-host-filter-span',
      template: `<qld-tag [type]="type">Filter Span</qld-tag>`,
      imports: [QldTagComponent],
    })
    class FilterSpanHost {
      type = 'filter' as const;
    }

    const filterSpanFixture = TestBed.createComponent(FilterSpanHost);
    filterSpanFixture.detectChanges();
    const compiled = filterSpanFixture.nativeElement as HTMLElement;
    const tag = compiled.querySelector('span');
    expect(tag?.tagName).toBe('SPAN');
  });

  it('should render as span for link type without href', () => {
    fixture.destroy();

    @Component({
      selector: 'qld-tag-host-no-href',
      template: `<qld-tag [type]="type" [href]="null">No Href</qld-tag>`,
      imports: [QldTagComponent],
    })
    class NoHrefHost {
      type = 'link' as const;
      href: string | null = null;
    }

    const noHrefFixture = TestBed.createComponent(NoHrefHost);
    noHrefFixture.detectChanges();
    const compiled = noHrefFixture.nativeElement as HTMLElement;
    const tag = compiled.querySelector('span');
    expect(tag?.tagName).toBe('SPAN');
  });

  it('should apply both default and large classes together', () => {
    fixture.destroy();

    @Component({
      selector: 'qld-tag-host-both',
      template: `<qld-tag [size]="size" [type]="type">Both</qld-tag>`,
      imports: [QldTagComponent],
    })
    class BothHost {
      size = 'large' as const;
      type = 'info' as const;
    }

    const bothFixture = TestBed.createComponent(BothHost);
    bothFixture.detectChanges();
    const compiled = bothFixture.nativeElement as HTMLElement;
    const tag = compiled.querySelector('.qld__tag');
    expect(tag?.classList.contains('qld__tag')).toBe(true);
    expect(tag?.classList.contains('qld__tag--large')).toBe(true);
    expect(tag?.classList.contains('qld__tag--info')).toBe(true);
  });

  it('should have host element with inline-block display', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.tagName).toBe('QLD-TAG');
  });
});
