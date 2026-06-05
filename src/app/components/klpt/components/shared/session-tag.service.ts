import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

import {
  SessionTag,
  SessionTagColour,
  SessionTagGenerationPattern,
  SessionTagOptions,
  SessionTagPattern,
  SessionTagShape,
} from '../../models/session-tag';

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
  patterns: [
    { id: 'striped', label: 'Striped' },
    { id: 'dotted', label: 'Dotted' },
    { id: 'crosshatched', label: 'Crosshatched' },
  ],
  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
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

  generateTag(
    excludedLabels: string[] = [],
    generationPattern: SessionTagGenerationPattern = 'day-code',
  ): SessionTag {
    const excluded = new Set(excludedLabels.map((label) => label.trim().toLowerCase()));

    for (let attempt = 0; attempt < 25; attempt += 1) {
      const tag = this.randomTag(generationPattern);

      if (!excluded.has(tag.label.toLowerCase())) {
        return tag;
      }
    }

    return this.randomTag(generationPattern);
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

  private randomTag(generationPattern: SessionTagGenerationPattern): SessionTag {
    const options = this.options();
    const colour = this.randomItem(options.colours);
    const shape = this.randomItem(options.shapes);
    const { day, dayCode } = this.currentDayTag(options.days);
    const pattern = generationPattern === 'visual-pattern'
      ? this.randomItem(options.patterns ?? FALLBACK_OPTIONS.patterns ?? [])
      : undefined;
    const label = pattern
      ? `${colour.label} ${pattern.label} ${shape.label} ${dayCode}`
      : `${colour.label} ${shape.label} ${day} ${dayCode}`;

    return this.createTag(colour, shape, day, dayCode, label, generationPattern, pattern);
  }

  private createTag(
    colour: SessionTagColour,
    shape: SessionTagShape,
    day: string,
    dayCode: string,
    label: string,
    generationPattern: SessionTagGenerationPattern,
    pattern: SessionTagPattern | undefined,
  ): SessionTag {
    return {
      id: this.createTagId(),
      colourId: colour.id,
      colourLabel: colour.label,
      colourHex: colour.hex,
      shapeId: shape.id,
      shapeLabel: shape.label,
      patternId: pattern?.id,
      patternLabel: pattern?.label,
      day,
      dayCode,
      label,
      generationPattern,
    };
  }

  private createTagId(): string {
    return typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }

  private currentDayTag(days: string[]): { day: string; dayCode: string } {
    const now = new Date();
    const day = days[now.getDay()] ?? FALLBACK_OPTIONS.days[now.getDay()] ?? '';

    return {
      day,
      dayCode: now.getDate().toString().padStart(2, '0'),
    };
  }

  private randomItem<T>(items: T[]): T {
    const randomValue = typeof crypto !== 'undefined' && 'getRandomValues' in crypto
      ? crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32
      : Math.random();

    return items[Math.floor(randomValue * items.length)];
  }
}
