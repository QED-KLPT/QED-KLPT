import { KlptBehaviour } from './klpt-behaviour';

export interface KlptElement {
  id: string;
  index: number;
  name: string;
  behaviours: KlptBehaviour[];
}
