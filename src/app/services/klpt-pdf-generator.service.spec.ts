import { KlptPdfGeneratorService } from './klpt-pdf-generator.service';
import type { SessionModel } from '../components/klpt/models/session-model';

describe('KlptPdfGeneratorService', () => {
  let service: KlptPdfGeneratorService;

  beforeEach(() => {
    service = new KlptPdfGeneratorService();
  });

  describe('formatDateForPdf', () => {
    it('should format a Date as "d-MMM-yyyy"', () => {
      const date = new Date('2025-01-15');
      expect(service.formatDateForPdf(date)).toBe('15-Jan-2025');
    });

    it('should handle single-digit days with no leading zero', () => {
      const date = new Date('2025-03-05');
      expect(service.formatDateForPdf(date)).toBe('5-Mar-2025');
    });

    it('should handle December correctly', () => {
      const date = new Date('2024-12-31');
      expect(service.formatDateForPdf(date)).toBe('31-Dec-2024');
    });

    it('should handle February correctly', () => {
      const date = new Date('2025-02-14');
      expect(service.formatDateForPdf(date)).toBe('14-Feb-2025');
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

  describe('generateSessionPdf', () => {
    const createMockSession = (overrides: Partial<SessionModel> = {}): SessionModel => ({
      id: 'test-session-123',
      created: new Date('2025-01-15'),
      updated: undefined,
      expiry: new Date('2026-12-31'),
      educatorName: 'Jane Smith',
      learnerCode: 'ABC123',
      pageIndex: 5,
      domain: 'Language and literacy',
      subDomain: undefined,
      elements: [],
      formFields: [],
      ...overrides,
    });

    it('should not throw with a minimal session', () => {
      const session = createMockSession();
      expect(() => service.generateSessionPdf(session)).not.toThrow();
    });

    it('should not throw with undefined educatorName', () => {
      const session = createMockSession({ educatorName: undefined });
      expect(() => service.generateSessionPdf(session)).not.toThrow();
    });

    it('should not throw with empty formFields and elements', () => {
      const session = createMockSession({ formFields: [], elements: [] });
      expect(() => service.generateSessionPdf(session)).not.toThrow();
    });

    it('should not throw with formFields data', () => {
      const session = createMockSession({
        formFields: [
          { name: 'date', value: '2025-01-15' },
          { name: 'observational-context', value: 'Child showed interest in books during circle time.' },
        ],
      });
      expect(() => service.generateSessionPdf(session)).not.toThrow();
    });

    it('should not throw with elements data', () => {
      const session = createMockSession({
        elements: [
          { id: 'e1', behaviourId: 'behaviour-1' },
          { id: 'e2', behaviourId: undefined },
        ],
      });
      expect(() => service.generateSessionPdf(session)).not.toThrow();
    });

    it('should not throw with full session data', () => {
      const session = createMockSession({
        educatorName: 'Jane Smith',
        learnerCode: 'ABC123',
        domain: 'Language and literacy',
        subDomain: 'Phonological awareness',
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
      expect(() => service.generateSessionPdf(session)).not.toThrow();
    });

    it('should handle learnerCode as empty string', () => {
      const session = createMockSession({ learnerCode: '' });
      expect(() => service.generateSessionPdf(session)).not.toThrow();
    });

    it('should handle undefined subDomain', () => {
      const session = createMockSession({ subDomain: undefined });
      expect(() => service.generateSessionPdf(session)).not.toThrow();
    });

    it('should handle long text in formFields', () => {
      const longText = 'This is a very long observational note that should test the text wrapping functionality of the PDF generation service to ensure it handles edge cases properly without throwing errors or causing layout issues.';
      const session = createMockSession({
        formFields: [{ name: 'observational-context', value: longText }],
      });
      expect(() => service.generateSessionPdf(session)).not.toThrow();
    });
  });
});
