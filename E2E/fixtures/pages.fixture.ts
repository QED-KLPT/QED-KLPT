import { test as base } from '@playwright/test';
import { KlptHomePage } from '../pages/KlptHomePage';

type Fixtures = {
  klptHomePage: KlptHomePage;
};

export const test = base.extend<Fixtures>({
  klptHomePage: async ({ page }, use) => {
    await use(new KlptHomePage(page));
  },
});

export { expect } from '@playwright/test';
