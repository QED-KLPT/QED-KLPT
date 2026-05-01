import { KlptElement } from './klpt-element';
import { KlptSubDomain } from './klpt-sub-domain';

export interface KlptDomain {
  id: string;
  index: number;
  name: string;
  summary: string;
  subDomains?: KlptSubDomain[];
  elements?: KlptElement[];
}
