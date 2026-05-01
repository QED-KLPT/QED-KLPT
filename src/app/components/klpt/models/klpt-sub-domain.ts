import { KlptElement } from './klpt-element';

export interface KlptSubDomain {
  id: string;
  index: number;
  name: string;
  elements: KlptElement[];
}
