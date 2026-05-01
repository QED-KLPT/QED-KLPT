import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SessionModel } from '../models/session-model';
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
      const learners = compiled.querySelectorAll('.klpt-list-sessions__learner');
      expect(learners.length).toBe(2);
      expect(learners[0].textContent?.trim()).toContain('123');
      expect(learners[1].textContent?.trim()).toContain('456');
    });

    it('should display educatorName in each session row when present', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const educators = compiled.querySelectorAll('.klpt-list-sessions__educator');
      expect(educators.length).toBe(2);
      expect(educators[0].textContent?.trim()).toContain('Jane Smith');
      expect(educators[1].textContent?.trim()).toContain('John Doe');
    });

    it('should display domain in each session row', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const domains = compiled.querySelectorAll('.klpt-list-sessions__domain');
      expect(domains.length).toBe(2);
      expect(domains[0].textContent?.trim()).toContain('Language and literacy');
      expect(domains[1].textContent?.trim()).toContain('Mathematics and numeracy');
    });

    it('should display created date in each session row', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const dates = compiled.querySelectorAll('.klpt-list-sessions__date');
      expect(dates.length).toBe(2);
    });

    it('should render clickable rows with routerLink to select-domains/:sessionId', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const links = compiled.querySelectorAll('.klpt-list-sessions__link');
      expect(links.length).toBe(2);
      expect(links[0].getAttribute('href')).toContain('/klpt/select-domains/session-1');
      expect(links[1].getAttribute('href')).toContain('/klpt/select-domains/session-2');
    });

    it('should render arrow indicator in each session row', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const arrows = compiled.querySelectorAll('.klpt-list-sessions__arrow');
      expect(arrows.length).toBe(2);
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

    it('should not display educatorName element when undefined', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const educators = compiled.querySelectorAll('.klpt-list-sessions__educator');
      expect(educators.length).toBe(1);
    });

    it('should display educatorName when present', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const educators = compiled.querySelectorAll('.klpt-list-sessions__educator');
      expect(educators[0].textContent?.trim()).toContain('Active Educator');
    });

    it('should render both sessions', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const items = compiled.querySelectorAll('.klpt-list-sessions__item');
      expect(items.length).toBe(2);
    });
  });
});
