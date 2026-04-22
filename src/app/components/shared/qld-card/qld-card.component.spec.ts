import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QldCardComponent, FooterLink, FooterTag } from './qld-card.component';

describe('QldCardComponent', () => {
  let fixture: ComponentFixture<QldCardComponent>;
  let component: QldCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QldCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QldCardComponent);
    component = fixture.componentInstance;
    component.title = 'Test Title';
    component.description = 'Test Description';
    component.type = 'single-action';
    component.variant = 'default';
    component.href = '#';
    component.imageUrl = '';
    component.imageAlt = '';
    component.footerLinks = [];
    component.footerTags = [];
    component.dark = false;
    component.featureAlign = 'left';
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.qld__card__title')?.textContent?.trim()).toContain('Test Title');
  });

  it('should render the description', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.qld__card__description')?.textContent?.trim()).toContain('Test Description');
  });

  it('should apply single-action class by default', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const card = compiled.querySelector('.qld__card')!;
    expect(card.classList).toContain('qld__card__action');
  });

  it('should apply no-action class when type is no-action', () => {
    component.type = 'no-action';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const card = compiled.querySelector('.qld__card')!;
    expect(card.classList).not.toContain('qld__card__action');
  });

  it('should apply multi-action class when type is multi-action', () => {
    component.type = 'multi-action';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const card = compiled.querySelector('.qld__card')!;
    expect(card.classList).toContain('qld__card__multi-action');
  });

  it('should apply arrow variant class', () => {
    component.variant = 'arrow';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const card = compiled.querySelector('.qld__card')!;
    expect(card.classList).toContain('qld__card--arrow');
  });

  it('should apply stacked-icon variant class', () => {
    component.variant = 'stacked-icon';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const card = compiled.querySelector('.qld__card')!;
    expect(card.classList).toContain('qld__card--icon');
  });

  it('should apply leading-icon variant classes', () => {
    component.variant = 'leading-icon';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const card = compiled.querySelector('.qld__card')!;
    expect(card.classList).toContain('qld__card--icon');
    expect(card.classList).toContain('qld__card--icon-left');
  });

  it('should apply image variant class', () => {
    component.variant = 'image';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const card = compiled.querySelector('.qld__card')!;
    expect(card.classList).toContain('qld__card--image');
  });

  it('should render image block when imageUrl is set', () => {
    component.variant = 'image';
    component.imageUrl = 'https://example.com/image.jpg';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.qld__responsive-media-img--bg')).toBeTruthy();
  });

  it('should not render image block when imageUrl is empty', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.qld__responsive-media-img--bg')).toBeNull();
  });

  it('should render footer links when provided', () => {
    component.type = 'multi-action';
    component.footerLinks = [
      { label: 'Link 1', href: '#' },
      { label: 'Link 2', href: '#' },
    ];
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.querySelectorAll('.qld__card__footer-link');
    expect(links.length).toBe(2);
  });

  it('should render footer tags when provided', () => {
    component.type = 'multi-action';
    component.footerTags = [
      { label: 'Tag 1', href: '#' },
      { label: 'Tag 2' },
    ];
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const tags = compiled.querySelectorAll('.qld__tag');
    expect(tags.length).toBe(2);
  });

  it('should apply dark class when dark is true', () => {
    component.dark = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const card = compiled.querySelector('.qld__card')!;
    expect(card.classList).toContain('qld__card--dark');
  });

  it('should apply feature alignment classes', () => {
    component.featureAlign = 'right';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const card = compiled.querySelector('.qld__card')!;
    expect(card.classList).toContain('qld__card--feature');
    expect(card.classList).toContain('qld__card--feature-right');
  });

  it('should render clickable link in title for single-action with href', () => {
    component.type = 'single-action';
    component.href = '#test';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const link = compiled.querySelector('.qld__card--clickable__link');
    expect(link).toBeTruthy();
    expect(link?.getAttribute('href')).toBe('#test');
  });

  it('should not render clickable link for no-action type', () => {
    component.type = 'no-action';
    component.href = '#test';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const link = compiled.querySelector('.qld__card--clickable__link');
    expect(link).toBeNull();
  });

  it('should render arrow icon when variant is arrow', () => {
    component.variant = 'arrow';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.qld__card--arrow-icon')).toBeTruthy();
  });

  it('should render icon block when variant is stacked-icon', () => {
    component.variant = 'stacked-icon';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.qld__card__icon')).toBeTruthy();
  });

  it('should render icon block when variant is leading-icon', () => {
    component.variant = 'leading-icon';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.qld__card__icon')).toBeTruthy();
  });

  it('should not render icon block for default variant', () => {
    component.variant = 'default';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.qld__card__icon')).toBeNull();
  });

  it('should not render footer when no links or tags provided', () => {
    component.type = 'single-action';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.qld__card__footer')).toBeNull();
  });

  it('should render footer when links are provided', () => {
    component.type = 'multi-action';
    component.footerLinks = [{ label: 'Link', href: '#' }];
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.qld__card__footer')).toBeTruthy();
  });

  it('should render footer when tags are provided', () => {
    component.type = 'multi-action';
    component.footerTags = [{ label: 'Tag' }];
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.qld__card__footer')).toBeTruthy();
  });

  it('should default description to empty string', () => {
    component.description = '';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.qld__card__description')).toBeNull();
  });

  it('should render description when provided', () => {
    component.description = 'Some description text';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.qld__card__description')?.textContent?.trim()).toContain('Some description text');
  });

  it('should apply feature-left class when featureAlign is left', () => {
    component.featureAlign = 'left';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const card = compiled.querySelector('.qld__card')!;
    expect(card.classList).toContain('qld__card--feature-left');
  });

  it('should apply feature-right class when featureAlign is right', () => {
    component.featureAlign = 'right';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const card = compiled.querySelector('.qld__card')!;
    expect(card.classList).toContain('qld__card--feature-right');
  });

  it('should not apply feature classes when variant is not image', () => {
    component.featureAlign = 'left';
    component.variant = 'default';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const card = compiled.querySelector('.qld__card')!;
    expect(card.classList).not.toContain('qld__card--feature');
  });

  it('should render footer link with icon when icon is provided', () => {
    component.type = 'multi-action';
    component.footerLinks = [
      { label: 'Link with icon', href: '#', icon: 'fa-light fa-alicorn' },
    ];
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const icon = compiled.querySelector('.qld__card__footer-link i');
    expect(icon).toBeTruthy();
    expect(icon?.classList.contains('fa-light')).toBe(true);
    expect(icon?.classList.contains('fa-alicorn')).toBe(true);
  });

  it('should render footer link without icon when icon is not provided', () => {
    component.type = 'multi-action';
    component.footerLinks = [
      { label: 'Link without icon', href: '#' },
    ];
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const link = compiled.querySelector('.qld__card__footer-link');
    expect(link?.querySelector('i')).toBeNull();
  });

  it('should render tag as link when href is provided', () => {
    component.type = 'multi-action';
    component.footerTags = [{ label: 'Linked Tag', href: '#tag' }];
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const tagLink = compiled.querySelector('.qld__tag--link');
    expect(tagLink).toBeTruthy();
    expect(tagLink?.getAttribute('href')).toBe('#tag');
  });

  it('should render tag as span when href is not provided', () => {
    component.type = 'multi-action';
    component.footerTags = [{ label: 'Non-linked Tag' }];
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const tagSpan = compiled.querySelector('.qld__tag:not(.qld__tag--link)');
    expect(tagSpan).toBeTruthy();
  });

  it('should set imageAlt on the image block', () => {
    component.variant = 'image';
    component.imageUrl = 'https://example.com/image.jpg';
    component.imageAlt = 'Test alt text';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const imgBlock = compiled.querySelector('.qld__responsive-media-img--bg');
    expect(imgBlock?.getAttribute('aria-label')).toBe('Test alt text');
  });

  it('should use title as aria-label when imageAlt is not provided', () => {
    component.variant = 'image';
    component.imageUrl = 'https://example.com/image.jpg';
    component.imageAlt = '';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const imgBlock = compiled.querySelector('.qld__responsive-media-img--bg');
    expect(imgBlock?.getAttribute('aria-label')).toBe('Test Title');
  });

});
