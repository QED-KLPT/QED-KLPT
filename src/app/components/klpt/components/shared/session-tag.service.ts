import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

import { SessionTag, SessionTagColour, SessionTagOptions, SessionTagShape } from '../../models/session-tag';

const FALLBACK_OPTIONS: SessionTagOptions = {
  colours: [
    { id: 'blue', label: 'Blue', hex: '#2f6fcf' },
    { id: 'teal', label: 'Teal', hex: '#008b8b' },
    { id: 'green', label: 'Green', hex: '#2e8540' },
    { id: 'gold', label: 'Gold', hex: '#d99a00' },
    { id: 'orange', label: 'Orange', hex: '#d66a00' },
  ],
  shapes: [
    { id: 'circle', label: 'Circle' },
    { id: 'square', label: 'Square' },
    { id: 'triangle', label: 'Triangle' },
    { id: 'diamond', label: 'Diamond' },
    { id: 'hexagon', label: 'Hexagon' },
  ],
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
};

@Injectable({
  providedIn: 'root',
})
export class SessionTagService {
  private readonly sessionTagsUrl = 'assets/klpt/data/session-tags.json';
  private readonly options = signal<SessionTagOptions>(FALLBACK_OPTIONS);

  constructor(private readonly http: HttpClient) {
    this.loadOptions();
  }

  generateTag(excludedLabels: string[] = []): SessionTag {
    const excluded = new Set(excludedLabels.map((label) => label.trim().toLowerCase()));

    for (let attempt = 0; attempt < 25; attempt += 1) {
      const tag = this.randomTag();

      if (!excluded.has(tag.label.toLowerCase())) {
        return tag;
      }
    }

    return this.randomTag();
  }

  private loadOptions(): void {
    this.http.get<SessionTagOptions>(this.sessionTagsUrl).subscribe({
      next: (options) => {
        if (options.colours.length && options.shapes.length && options.days.length) {
          this.options.set(options);
        }
      },
      error: () => this.options.set(FALLBACK_OPTIONS),
    });
  }

  private randomTag(): SessionTag {
    const options = this.options();
    const colour = this.randomItem(options.colours);
    const shape = this.randomItem(options.shapes);
    const day = this.randomItem(options.days);
    const label = `${colour.label} ${shape.label} ${day}`;

    return this.createTag(colour, shape, day, label);
  }

  private createTag(
    colour: SessionTagColour,
    shape: SessionTagShape,
    day: string,
    label: string,
  ): SessionTag {
    return {
      colourId: colour.id,
      colourLabel: colour.label,
      colourHex: colour.hex,
      shapeId: shape.id,
      shapeLabel: shape.label,
      day,
      label,
    };
  }

  private randomItem<T>(items: T[]): T {
    const randomValue = typeof crypto !== 'undefined' && 'getRandomValues' in crypto
      ? crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32
      : Math.random();

    return items[Math.floor(randomValue * items.length)];
  }
}
