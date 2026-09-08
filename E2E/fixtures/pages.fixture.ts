import { test as base } from '@playwright/test';
import { KlptHomePage } from '../pages/KlptHomePage';

/**
 * Extends the base Playwright `test` with ready-to-use Page Object instances,
 * so specs don't need to construct Page Objects by hand in every test.
 *
 * Usage in a spec:
 *   import { test, expect } from '../fixtures/pages.fixture';
 *   test('...', async ({ klptHomePage }) => { ... });
 */
type Fixtures = {
  klptHomePage: KlptHomePage;
};

export const test = base.extend<Fixtures>({
  klptHomePage: async ({ page }, use) => {
    await use(new KlptHomePage(page));
  },
});

export { expect } from '@playwright/test';
