import { DOCUMENT } from '@angular/common';
import { Injectable, effect, inject, signal } from '@angular/core';

export type DomainAssetMode = 'colour' | 'dark-blue';

const STORAGE_KEY = 'klpt-domain-asset-mode';

@Injectable({ providedIn: 'root' })
export class DomainAssetModeService {
  private readonly document = inject(DOCUMENT);
  private readonly modeSignal = signal<DomainAssetMode>(this.getInitialMode());

  readonly mode = this.modeSignal.asReadonly();

  constructor() {
    effect(() => {
      const mode = this.modeSignal();
      this.document.documentElement.dataset['domainAssetMode'] = mode;

      try {
        localStorage.setItem(STORAGE_KEY, mode);
      } catch {
        // Ignore storage failures; the toggle still works for the current session.
      }
    });
  }

  toggle(): void {
    this.modeSignal.update((mode) => (mode === 'colour' ? 'dark-blue' : 'colour'));
  }

  iconPath(name: string): string {
    const mode = this.modeSignal();

    return `assets/img/domain/${mode}/domain-${name}-${mode}.png`;
  }

  private getInitialMode(): DomainAssetMode {
    try {
      const storedMode = localStorage.getItem(STORAGE_KEY);

      return storedMode === 'dark-blue' ? 'dark-blue' : 'colour';
    } catch {
      return 'colour';
    }
  }
}
