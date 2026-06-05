export interface SessionTag {
  id?: string;
  colourId: string;
  colourLabel: string;
  colourHex: string;
  shapeId: string;
  shapeLabel: string;
  patternId?: string;
  patternLabel?: string;
  day: string;
  dayCode: string;
  label: string;
  generationPattern?: SessionTagGenerationPattern;
}

export interface SessionTagOptions {
  colours: SessionTagColour[];
  shapes: SessionTagShape[];
  patterns?: SessionTagPattern[];
  days: string[];
}

export interface SessionTagColour {
  id: string;
  label: string;
  hex: string;
}

export interface SessionTagShape {
  id: string;
  label: string;
}

export interface SessionTagPattern {
  id: string;
  label: string;
}

export type SessionTagGenerationPattern = 'day-code' | 'visual-pattern';
