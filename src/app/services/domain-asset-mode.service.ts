import { DOCUMENT } from '@angular/common';
import { Injectable, effect, inject, signal } from '@angular/core';

export type DomainAssetMode = 'colour' | 'dark-blue';

const STORAGE_KEY = 'klpt-domain-asset-mode';

const DOMAIN_ICONS: Record<string, { colour: string; 'dark-blue': string }> = {
  'language-literacy': { colour: 'domain-lang-lit-col', 'dark-blue': 'domain-lang-lit-db' },
  'executive-function': { colour: 'domain-exec-func-col', 'dark-blue': 'domain-exec-func-db' },
  'social-emotional-learning': { colour: 'domain-soc-emot-lrn-col', 'dark-blue': 'domain-soc-emot-lrn-db' },
  'mathematics-numeracy': { colour: 'domain-math-num-col', 'dark-blue': 'domain-math-num-db' },
  'analysing-interpreting': { colour: 'domain-anlys-intprt-col', 'dark-blue': 'domain-anlys-intprt-db' },
  'conducting-documenting': { colour: 'domain-cond-doc-col', 'dark-blue': 'domain-cond-doc-db' },
  'physicality': { colour: 'domain-physicality-colour', 'dark-blue': 'phys-db' },
};

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
    const entry = DOMAIN_ICONS[name];

    if (!entry) {
      return `assets/img/domain/${mode}/domain-${name}-${mode}.png`;
    }

    return `assets/img/domain/${mode}/${entry[mode]}.png`;
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
