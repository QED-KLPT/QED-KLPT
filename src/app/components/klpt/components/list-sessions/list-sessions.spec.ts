import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SessionModel } from '../../models/session-model';
import { SessionManagementService } from '../shared/session-management.service';
import { ListSessions } from './list-sessions';

@Component({
  selector: 'app-list-sessions-host',
  template: `<app-list-sessions></app-list-sessions>`,
  imports: [ListSessions],
})
class ListSessionsHostComponent {}

function createMockSessionManagement(sessions: SessionModel[]): SessionManagementService {
  return {
    getAllSessions: () => sessions,
    deleteAllExpiredSessions: () => {},
    getStorageSnapshot: () => '(empty)',
  } as unknown as SessionManagementService;
}

describe('ListSessions', () => {
  describe('with sessions', () => {
    let fixture: ComponentFixture<ListSessionsHostComponent>;

    const mockSessions: SessionModel[] = [
      {
        id: 'session-1',
        created: new Date('2025-01-15'),
        updated: undefined,
        expiry: new Date('2026-12-31'),
        educatorName: 'Jane Smith',
        learnerCode: '123',
        pageIndex: 0,
        domain: 'Language and literacy',
        subDomain: undefined,
        elements: [],
        formFields: [],
      },
      {
        id: 'session-2',
        created: new Date('2025-02-20'),
        updated: new Date('2025-03-01'),
        expiry: new Date('2026-12-31'),
        educatorName: 'John Doe',
        learnerCode: '456',
        pageIndex: 2,
        domain: 'Mathematics and numeracy',
        subDomain: 'Numbers',
        elements: [],
        formFields: [],
      },
    ];

    beforeEach(async () => {
      const mockService = createMockSessionManagement(mockSessions);

      await TestBed.configureTestingModule({
        imports: [ListSessionsHostComponent, ListSessions],
        providers: [
          provideRouter([]),
          { provide: SessionManagementService, useValue: mockService },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ListSessionsHostComponent);
      fixture.detectChanges();
    });

    it('should create the component', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('app-list-sessions')).toBeTruthy();
    });

    it('should not show empty state message when sessions exist', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('.klpt-list-sessions__empty')).toBeNull();
    });

    it('should render a session row for each session', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const items = compiled.querySelectorAll('.klpt-list-sessions__item');
      expect(items.length).toBe(2);
    });

    it('should display learnerCode in each session row', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const items = Array.from(compiled.querySelectorAll('.klpt-list-sessions__item'));
      const learners = items.flatMap((item) => Array.from(item.querySelectorAll('.klpt-list-sessions__learner')));
      expect(learners.length).toBe(2);
      const codes = learners.map((el) => el.textContent?.trim());
      expect(codes).toContain('123');
      expect(codes).toContain('456');
    });

    it('should display full learnerCode without truncation', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const items = Array.from(compiled.querySelectorAll('.klpt-list-sessions__item'));
      const learners = items.flatMap((item) => Array.from(item.querySelectorAll('.klpt-list-sessions__learner')));
      expect(learners.length).toBe(2);
      const codes = learners.map((el) => el.textContent?.trim());
      expect(codes).toContain('123');
      expect(codes).toContain('456');
    });

    it('should sort sessions by updated desc, falling back to created desc', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const items = compiled.querySelectorAll('.klpt-list-sessions__item');
      expect(items.length).toBe(2);
    });

    it('should display educatorName in each session row when present', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const items = Array.from(compiled.querySelectorAll('.klpt-list-sessions__item'));
      const educators = items.flatMap((item) => Array.from(item.querySelectorAll('.klpt-list-sessions__educator')));
      expect(educators.length).toBe(2);
      const names = educators.map((el) => el.textContent?.trim());
      expect(names).toContain('Jane Smith');
      expect(names).toContain('John Doe');
    });

    it('should display sessionId (truncated) in each session row', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const items = Array.from(compiled.querySelectorAll('.klpt-list-sessions__item'));
      const ids = items.flatMap((item) => Array.from(item.querySelectorAll('.klpt-list-sessions__id')));
      expect(ids.length).toBe(2);
      const idTexts = ids.map((el) => el.textContent?.trim());
      expect(idTexts.some((t) => t.includes('session-1'))).toBe(true);
      expect(idTexts.some((t) => t.includes('session-2'))).toBe(true);
    });

    it('should display element count in each session row', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const items = Array.from(compiled.querySelectorAll('.klpt-list-sessions__item'));
      const elements = items.flatMap((item) => Array.from(item.querySelectorAll('.klpt-list-sessions__elements')));
      expect(elements.length).toBe(2);
    });

    it('should display created date in d-MMM HH:mm format', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const items = Array.from(compiled.querySelectorAll('.klpt-list-sessions__item'));
      const dates = items.flatMap((item) => Array.from(item.querySelectorAll('.klpt-list-sessions__date')));
      expect(dates.length).toBe(2);
    });

    it('should display created date in each session row', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const items = Array.from(compiled.querySelectorAll('.klpt-list-sessions__item'));
      const dates = items.flatMap((item) => Array.from(item.querySelectorAll('.klpt-list-sessions__date')));
      expect(dates.length).toBe(2);
    });

    it('should render clickable rows with routerLink based on pageIndex', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const links = Array.from(compiled.querySelectorAll('.session-card'));
      expect(links.length).toBe(2);
      const hrefs = links.map((l) => l.getAttribute('href'));
      expect(hrefs.some((h) => h?.includes('/klpt/select-domains/session-1'))).toBe(true);
      expect(hrefs.some((h) => h?.includes('/klpt/select-behaviours/session-2'))).toBe(true);
    });

    it('should render arrow indicator in each session row', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const items = Array.from(compiled.querySelectorAll('.klpt-list-sessions__item'));
      const arrows = items.flatMap((item) => Array.from(item.querySelectorAll('.klpt-list-sessions__arrow')));
      expect(arrows.length).toBe(2);
    });

    it('should render column headers', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const header = compiled.querySelector('.klpt-list-sessions__header');
      expect(header).toBeTruthy();
      const headers = Array.from(header!.querySelectorAll('.klpt-list-sessions__id, .klpt-list-sessions__educator, .klpt-list-sessions__learner, .klpt-list-sessions__date, .klpt-list-sessions__elements'));
      const texts = headers.map((h) => h.textContent?.trim());
      expect(texts).toContain('Id');
      expect(texts).toContain('Educator');
      expect(texts).toContain('Learner Code');
      expect(texts).toContain('Created');
      expect(texts).toContain('Elements');
    });

    it('should render session list element', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('.klpt-list-sessions')).toBeTruthy();
    });

    it('should render storage modal button', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('.storage-debug-button')).toBeTruthy();
    });

    it('should render navigation buttons', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('.button--secondary')).toBeTruthy();
      expect(compiled.querySelector('.button--primary')).toBeTruthy();
    });
  });

  describe('without sessions', () => {
    let fixture: ComponentFixture<ListSessionsHostComponent>;

    beforeEach(async () => {
      const mockService = createMockSessionManagement([]);

      await TestBed.configureTestingModule({
        imports: [ListSessionsHostComponent, ListSessions],
        providers: [
          provideRouter([]),
          { provide: SessionManagementService, useValue: mockService },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ListSessionsHostComponent);
      fixture.detectChanges();
    });

    it('should show empty state message when no sessions exist', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('.klpt-list-sessions__empty')).toBeTruthy();
    });

    it('should not render session list when no sessions exist', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('.klpt-list-sessions')).toBeNull();
    });

    it('should render storage modal button', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('.storage-debug-button')).toBeTruthy();
    });

    it('should render navigation buttons', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('.button--secondary')).toBeTruthy();
      expect(compiled.querySelector('.button--primary')).toBeTruthy();
    });
  });

  describe('with partial educatorName', () => {
    let fixture: ComponentFixture<ListSessionsHostComponent>;

    const sessionsWithPartialEducator: SessionModel[] = [
      {
        id: 'session-3',
        created: new Date('2025-01-15'),
        updated: undefined,
        expiry: new Date('2026-12-31'),
        educatorName: undefined,
        learnerCode: '789',
        pageIndex: 0,
        domain: 'Physicality',
        subDomain: undefined,
        elements: [],
        formFields: [],
      },
      {
        id: 'session-4',
        created: new Date('2025-02-20'),
        updated: undefined,
        expiry: new Date('2026-12-31'),
        educatorName: 'Active Educator',
        learnerCode: '012',
        pageIndex: 0,
        domain: 'Social and emotional learning',
        subDomain: undefined,
        elements: [],
        formFields: [],
      },
    ];

    beforeEach(async () => {
      const mockService = createMockSessionManagement(sessionsWithPartialEducator);

      await TestBed.configureTestingModule({
        imports: [ListSessionsHostComponent, ListSessions],
        providers: [
          provideRouter([]),
          { provide: SessionManagementService, useValue: mockService },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ListSessionsHostComponent);
      fixture.detectChanges();
    });

    it('should always display educatorName element even when undefined', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const items = Array.from(compiled.querySelectorAll('.klpt-list-sessions__item'));
      const educators = items.flatMap((item) => Array.from(item.querySelectorAll('.klpt-list-sessions__educator')));
      expect(educators.length).toBe(2);
    });

    it('should display educatorName when present', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const items = Array.from(compiled.querySelectorAll('.klpt-list-sessions__item'));
      const educators = items.flatMap((item) => Array.from(item.querySelectorAll('.klpt-list-sessions__educator')));
      expect(educators.map((el) => el.textContent?.trim()).some((t) => t.includes('Active Educator'))).toBe(true);
    });

    it('should render both sessions', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const items = Array.from(compiled.querySelectorAll('.klpt-list-sessions__item'));
      expect(items.length).toBe(2);
    });

    it('should render column headers', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const header = compiled.querySelector('.klpt-list-sessions__header');
      expect(header).toBeTruthy();
    });
  });

  describe('sorting', () => {
    let fixture: ComponentFixture<ListSessionsHostComponent>;

    const sessionsWithDifferentDates: SessionModel[] = [
      {
        id: 'session-a',
        created: new Date('2025-01-01'),
        updated: undefined,
        expiry: new Date('2026-12-31'),
        educatorName: 'Educator A',
        learnerCode: 'AAA',
        pageIndex: 0,
        domain: 'Domain A',
        subDomain: undefined,
        elements: [],
        formFields: [],
      },
      {
        id: 'session-b',
        created: new Date('2025-02-01'),
        updated: new Date('2025-06-15'),
        expiry: new Date('2026-12-31'),
        educatorName: 'Educator B',
        learnerCode: 'BBB',
        pageIndex: 0,
        domain: 'Domain B',
        subDomain: undefined,
        elements: [],
        formFields: [],
      },
      {
        id: 'session-c',
        created: new Date('2025-03-01'),
        updated: undefined,
        expiry: new Date('2026-12-31'),
        educatorName: 'Educator C',
        learnerCode: 'CCC',
        pageIndex: 0,
        domain: 'Domain C',
        subDomain: undefined,
        elements: [],
        formFields: [],
      },
    ];

    beforeEach(async () => {
      const mockService = createMockSessionManagement(sessionsWithDifferentDates);

      await TestBed.configureTestingModule({
        imports: [ListSessionsHostComponent, ListSessions],
        providers: [
          provideRouter([]),
          { provide: SessionManagementService, useValue: mockService },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ListSessionsHostComponent);
      fixture.detectChanges();
    });

    it('should sort by updated desc when updated is defined', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const items = compiled.querySelectorAll('.klpt-list-sessions__item');
      expect(items.length).toBe(3);
      // session-b has updated=2025-06-15, so it should be first
      expect(items[0].querySelector('.klpt-list-sessions__learner')?.textContent?.trim()).toBe('BBB');
    });

    it('should fall back to created desc when updated is undefined', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const items = compiled.querySelectorAll('.klpt-list-sessions__item');
      expect(items[1].querySelector('.klpt-list-sessions__learner')?.textContent?.trim()).toBe('CCC');
      expect(items[2].querySelector('.klpt-list-sessions__learner')?.textContent?.trim()).toBe('AAA');
    });
  });

  describe('with elements', () => {
    let fixture: ComponentFixture<ListSessionsHostComponent>;

    const sessionsWithElements: SessionModel[] = [
      {
        id: 'session-5',
        created: new Date('2025-01-15'),
        updated: undefined,
        expiry: new Date('2026-12-31'),
        educatorName: 'Test Educator',
        learnerCode: 'ABC',
        pageIndex: 0,
        domain: 'Language and literacy',
        subDomain: undefined,
        elements: [{ id: 'e1', behaviourId: undefined }],
        formFields: [],
      },
      {
        id: 'session-6',
        created: new Date('2025-02-20'),
        updated: undefined,
        expiry: new Date('2026-12-31'),
        educatorName: 'Test Educator',
        learnerCode: 'DEF',
        pageIndex: 0,
        domain: 'Mathematics and numeracy',
        subDomain: undefined,
        elements: [
          { id: 'e1', behaviourId: undefined },
          { id: 'e2', behaviourId: undefined },
        ],
        formFields: [],
      },
    ];

    beforeEach(async () => {
      const mockService = createMockSessionManagement(sessionsWithElements);

      await TestBed.configureTestingModule({
        imports: [ListSessionsHostComponent, ListSessions],
        providers: [
          provideRouter([]),
          { provide: SessionManagementService, useValue: mockService },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ListSessionsHostComponent);
      fixture.detectChanges();
    });

    it('should display "1 element" (singular) when count is 1', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const items = Array.from(compiled.querySelectorAll('.klpt-list-sessions__item'));
      const elements = items.flatMap((item) => Array.from(item.querySelectorAll('.klpt-list-sessions__elements')));
      expect(elements.length).toBe(2);
      const texts = elements.map((el) => el.textContent?.trim());
      expect(texts.some((t) => t === '1 element')).toBe(true);
    });

    it('should display "N elements" (plural) when count is greater than 1', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const items = Array.from(compiled.querySelectorAll('.klpt-list-sessions__item'));
      const elements = items.flatMap((item) => Array.from(item.querySelectorAll('.klpt-list-sessions__elements')));
      expect(elements.length).toBe(2);
      const texts = elements.map((el) => el.textContent?.trim());
      expect(texts.some((t) => t === '2 elements')).toBe(true);
    });
  });
});
