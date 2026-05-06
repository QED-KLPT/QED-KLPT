import { TestBed } from '@angular/core/testing';
import { KlptPdfGeneratorService } from './klpt-pdf-generator.service';
import { KlptDomainDataService } from '../components/klpt/components/shared/klpt-domain-data.service';
import type { SessionModel } from '../components/klpt/models/session-model';

function createMockDomainData(domains: any[]) {
  return {
    getAllDomains: () => domains,
    getAllSubDomainsByDomain: () => [],
    getAllElementsByDomain: () => [],
    getAllElementsBySubDomain: () => [],
    getAllBehavioursByElement: () => [],
  };
}

describe('KlptPdfGeneratorService', () => {
  let service: KlptPdfGeneratorService;

  beforeEach(() => {
    const mockDomainData = createMockDomainData([]);

    TestBed.configureTestingModule({
      providers: [
        KlptPdfGeneratorService,
        { provide: KlptDomainDataService, useValue: mockDomainData },
      ],
    });

    service = TestBed.inject(KlptPdfGeneratorService);
  });

  describe('formatDateForPdf', () => {
    it('should format a Date as "d-MMM-yyyy"', () => {
      const date = new Date('2025-01-15');
      expect(service.formatDateForPdf(date)).toBe('15 Jan 2025');
    });

    it('should handle single-digit days with no leading zero', () => {
      const date = new Date('2025-03-05');
      expect(service.formatDateForPdf(date)).toBe('5 Mar 2025');
    });

    it('should handle December correctly', () => {
      const date = new Date('2024-12-31');
      expect(service.formatDateForPdf(date)).toBe('31 Dec 2024');
    });

    it('should handle February correctly', () => {
      const date = new Date('2025-02-14');
      expect(service.formatDateForPdf(date)).toBe('14 Feb 2025');
    });
  });

  describe('formatEducatorName', () => {
    it('should return "Not provided" when educatorName is undefined', () => {
      expect(service.formatEducatorName(undefined)).toBe('Not provided');
    });

    it('should return the name as-is when defined', () => {
      expect(service.formatEducatorName('Jane Smith')).toBe('Jane Smith');
    });

    it('should return empty string when educatorName is empty string', () => {
      expect(service.formatEducatorName('')).toBe('');
    });
  });

  describe('getFieldLabel', () => {
    it('should map student-name to Learner Name', () => {
      expect(service.getFieldLabel('student-name')).toBe('Learner Name');
    });

    it('should map date to Date', () => {
      expect(service.getFieldLabel('date')).toBe('Date');
    });

    it('should map observational-context to Context', () => {
      expect(service.getFieldLabel('observational-context')).toBe('Context');
    });

    it('should map professional-reflection to Professional Reflection', () => {
      expect(service.getFieldLabel('professional-reflection')).toBe('Professional Reflection');
    });

    it('should map support-learning to Support Learning', () => {
      expect(service.getFieldLabel('support-learning')).toBe('Support Learning');
    });

    it('should return original name for unmapped fields', () => {
      expect(service.getFieldLabel('custom-field')).toBe('custom-field');
    });
  });

  describe('resolveDomainName', () => {
    beforeEach(() => {
      const mockDomains = [
        { id: 'domain-1', name: 'Language and literacy' },
        { id: 'domain-2', name: 'Physicality' },
      ];
      const mockDomainData = createMockDomainData(mockDomains);

      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          KlptPdfGeneratorService,
          { provide: KlptDomainDataService, useValue: mockDomainData },
        ],
      });

      service = TestBed.inject(KlptPdfGeneratorService);
    });

    it('should return domain name when ID matches', () => {
      expect(service.resolveDomainName('domain-1')).toBe('Language and literacy');
    });

    it('should return "Not specified" when ID does not match', () => {
      expect(service.resolveDomainName('unknown-domain')).toBe('Not specified');
    });
  });

  describe('resolveSubDomainName', () => {
    beforeEach(() => {
      const mockDomains = [
        {
          id: 'domain-1',
          name: 'Language and literacy',
          subDomains: [
            { id: 'sub-1', name: 'Phonological awareness' },
            { id: 'sub-2', name: 'Print knowledge' },
          ],
        },
      ];
      const mockDomainData = createMockDomainData(mockDomains);

      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          KlptPdfGeneratorService,
          { provide: KlptDomainDataService, useValue: mockDomainData },
        ],
      });

      service = TestBed.inject(KlptPdfGeneratorService);
    });

    it('should return sub-domain name when ID matches', () => {
      expect(service.resolveSubDomainName('sub-1')).toBe('Phonological awareness');
    });

    it('should return "Not specified" when ID does not match', () => {
      expect(service.resolveSubDomainName('unknown-sub')).toBe('Not specified');
    });
  });

  describe('resolveElementName', () => {
    beforeEach(() => {
      const mockDomains = [
        {
          id: 'domain-1',
          name: 'Language and literacy',
          elements: [
            { id: 'elem-1', name: 'Listening and understanding', behaviours: [] },
          ],
          subDomains: [
            { id: 'sub-1', name: 'Phonological awareness', elements: [
              { id: 'elem-2', name: 'Rhyming awareness', behaviours: [] },
            ]},
          ],
        },
      ];
      const mockDomainData = createMockDomainData(mockDomains);

      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          KlptPdfGeneratorService,
          { provide: KlptDomainDataService, useValue: mockDomainData },
        ],
      });

      service = TestBed.inject(KlptPdfGeneratorService);
    });

    it('should return element name when ID matches direct element', () => {
      expect(service.resolveElementName('elem-1')).toBe('Listening and understanding');
    });

    it('should return element name when ID matches sub-domain element', () => {
      expect(service.resolveElementName('elem-2')).toBe('Rhyming awareness');
    });

    it('should return "Not specified" when ID does not match', () => {
      expect(service.resolveElementName('unknown-elem')).toBe('Not specified');
    });
  });

  describe('resolveBehaviourName', () => {
    beforeEach(() => {
      const mockDomains = [
        {
          id: 'domain-1',
          name: 'Language and literacy',
          elements: [
            {
              id: 'elem-1',
              name: 'Listening and understanding',
              behaviours: [
                { id: 'beh-1', index: 0, name: 'Listens to stories', description: '' },
                { id: 'beh-2', index: 1, name: 'Predicts what happens next', description: '' },
              ],
            },
          ],
        },
      ];
      const mockDomainData = createMockDomainData(mockDomains);

      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          KlptPdfGeneratorService,
          { provide: KlptDomainDataService, useValue: mockDomainData },
        ],
      });

      service = TestBed.inject(KlptPdfGeneratorService);
    });

    it('should return behaviour name when ID matches', () => {
      expect(service.resolveBehaviourName('beh-1')).toBe('Listens to stories');
    });

    it('should return "Not specified" when ID does not match', () => {
      expect(service.resolveBehaviourName('unknown-beh')).toBe('Not specified');
    });
  });

  describe('generateSessionPdf', () => {
    const createMockSession = (overrides: Partial<SessionModel> = {}): SessionModel => ({
      id: 'test-session-123',
      created: new Date('2025-01-15'),
      updated: undefined,
      expiry: new Date('2026-12-31'),
      educatorName: 'Jane Smith',
      learnerCode: 'ABC123',
      pageIndex: 5,
      domain: 'domain-1',
      subDomain: undefined,
      elements: [],
      formFields: [],
      ...overrides,
    });

    it('should not throw with a minimal session', async () => {
      const session = createMockSession();
      await expect(service.generateSessionPdf(session)).resolves.not.toThrow();
    });

    it('should not throw with undefined educatorName', async () => {
      const session = createMockSession({ educatorName: undefined });
      await expect(service.generateSessionPdf(session)).resolves.not.toThrow();
    });

    it('should not throw with empty formFields and elements', async () => {
      const session = createMockSession({ formFields: [], elements: [] });
      await expect(service.generateSessionPdf(session)).resolves.not.toThrow();
    });

    it('should not throw with formFields data', async () => {
      const session = createMockSession({
        formFields: [
          { name: 'date', value: '2025-01-15' },
          { name: 'observational-context', value: 'Child showed interest in books during circle time.' },
        ],
      });
      await expect(service.generateSessionPdf(session)).resolves.not.toThrow();
    });

    it('should not throw with elements data', async () => {
      const session = createMockSession({
        elements: [
          { id: 'e1', behaviourId: 'behaviour-1' },
          { id: 'e2', behaviourId: undefined },
        ],
      });
      await expect(service.generateSessionPdf(session)).resolves.not.toThrow();
    });

    it('should not throw with full session data', async () => {
      const session = createMockSession({
        educatorName: 'Jane Smith',
        learnerCode: 'ABC123',
        domain: 'domain-1',
        subDomain: 'sub-domain-1',
        formFields: [
          { name: 'date', value: '2025-01-15' },
          { name: 'observational-context', value: 'Child showed interest in books during circle time.' },
          { name: 'professional-reflection', value: 'Links to phonemic awareness development.' },
        ],
        elements: [
          { id: 'e1', behaviourId: 'behaviour-1' },
          { id: 'e2', behaviourId: 'behaviour-2' },
        ],
      });
      await expect(service.generateSessionPdf(session)).resolves.not.toThrow();
    });

    it('should handle learnerCode as empty string', async () => {
      const session = createMockSession({ learnerCode: '' });
      await expect(service.generateSessionPdf(session)).resolves.not.toThrow();
    });

    it('should handle undefined subDomain', async () => {
      const session = createMockSession({ subDomain: undefined });
      await expect(service.generateSessionPdf(session)).resolves.not.toThrow();
    });

    it('should handle long text in formFields', async () => {
      const longText = 'This is a very long observational note that should test the text wrapping functionality of the PDF generation service to ensure it handles edge cases properly without throwing errors or causing layout issues.';
      const session = createMockSession({
        formFields: [{ name: 'observational-context', value: longText }],
      });
      await expect(service.generateSessionPdf(session)).resolves.not.toThrow();
    });
  });
});

