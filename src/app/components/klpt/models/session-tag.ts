export interface SessionTag {
  colourId: string;
  colourLabel: string;
  colourHex: string;
  shapeId: string;
  shapeLabel: string;
  day: string;
  label: string;
}

export interface SessionTagOptions {
  colours: SessionTagColour[];
  shapes: SessionTagShape[];
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
