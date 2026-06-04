import { Injectable } from '@angular/core';
import { AvatarModel } from '../../models/avatar.model';

const ROSTER_KEY = 'klpt.roster';

const COLORS: { name: string; hex: string }[] = [
  { name: 'Red',     hex: '#dc2626' },
  { name: 'Orange',  hex: '#c2410c' },
  { name: 'Amber',   hex: '#b45309' },
  { name: 'Lime',    hex: '#4d7c0f' },
  { name: 'Green',   hex: '#15803d' },
  { name: 'Emerald', hex: '#047857' },
  { name: 'Teal',    hex: '#0f766e' },
  { name: 'Cyan',    hex: '#0e7490' },
  { name: 'Sky',     hex: '#0369a1' },
  { name: 'Blue',    hex: '#1d4ed8' },
  { name: 'Indigo',  hex: '#4338ca' },
  { name: 'Violet',  hex: '#6d28d9' },
  { name: 'Purple',  hex: '#7e22ce' },
  { name: 'Fuchsia', hex: '#a21caf' },
  { name: 'Pink',    hex: '#be185d' },
  { name: 'Rose',    hex: '#be123c' },
  { name: 'Brown',   hex: '#92400e' },
  { name: 'Navy',    hex: '#1e3a8a' },
];

const WORDS: { word: string; iconClass: string }[] = [
  { word: 'Tree',      iconClass: 'fa-tree'      },
  { word: 'Moon',      iconClass: 'fa-moon'      },
  { word: 'Star',      iconClass: 'fa-star'      },
  { word: 'Sun',       iconClass: 'fa-sun'       },
  { word: 'Cloud',     iconClass: 'fa-cloud'     },
  { word: 'Leaf',      iconClass: 'fa-leaf'      },
  { word: 'Wave',      iconClass: 'fa-water'     },
  { word: 'Diamond',   iconClass: 'fa-gem'       },
  { word: 'Feather',   iconClass: 'fa-feather'   },
  { word: 'Flower',    iconClass: 'fa-spa'       },
  { word: 'Snowflake', iconClass: 'fa-snowflake' },
  { word: 'Droplet',   iconClass: 'fa-droplet'   },
];

export const ROSTER_MAX = COLORS.length * WORDS.length;

const CURRENT_COLOR_NAMES = new Set(COLORS.map((c) => c.name));
const COLOR_HEX = new Map(COLORS.map((c) => [c.name.toLowerCase(), c.hex]));
const WORD_ICON = new Map(WORDS.map((w) => [w.word.toLowerCase(), w.iconClass]));

export interface AvatarInfo {
  colorHex: string;
  iconClass: string;
  word: string;
}

@Injectable({ providedIn: 'root' })
export class RosterService {
  generateAvatars(count: number): AvatarModel[] {
    const all: AvatarModel[] = [];

    for (const color of COLORS) {
      for (const w of WORDS) {
        all.push({
          id: `${color.name.toLowerCase()}-${w.word.toLowerCase()}`,
          color: color.name,
          colorHex: color.hex,
          word: w.word,
          iconClass: w.iconClass,
          label: `${color.name} ${w.word}`,
        });
      }
    }

    return this.shuffle(all).slice(0, Math.min(count, ROSTER_MAX));
  }

  private shuffle<T>(arr: T[]): T[] {
    const result = [...arr];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  save(avatars: AvatarModel[]): void {
    localStorage.setItem(ROSTER_KEY, JSON.stringify(avatars));
  }

  load(): AvatarModel[] {
    try {
      const raw = localStorage.getItem(ROSTER_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as AvatarModel[];
      // Clear stale roster if any avatar uses a colour no longer in the palette
      if (parsed.some((a) => !CURRENT_COLOR_NAMES.has(a.color))) {
        this.clear();
        return [];
      }
      return parsed;
    } catch {
      return [];
    }
  }

  getAvatarInfo(label: string): AvatarInfo | null {
    const spaceIdx = label.indexOf(' ');
    if (spaceIdx < 0) return null;
    const colorHex = COLOR_HEX.get(label.slice(0, spaceIdx).toLowerCase());
    const word = label.slice(spaceIdx + 1);
    const iconClass = WORD_ICON.get(word.toLowerCase());
    if (!colorHex || !iconClass) return null;
    return { colorHex, iconClass, word };
  }

  clear(): void {
    localStorage.removeItem(ROSTER_KEY);
  }
}
