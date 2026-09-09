import { test, expect } from '../fixtures/pages.fixture';

test.describe('KLPT welcome video', () => {
  test('Visitor can close the welcome video and access the KLPT homepage', async ({ klptHomePage }) => {
    await test.step('Opening the KLPT Test environment', async () => {
      console.log('Opening the KLPT Test environment');
      await klptHomePage.open();
    });

    await test.step('Verifying the KLPT homepage is displayed', async () => {
      await expect(klptHomePage.heading).toBeVisible();
      console.log('KLPT homepage displayed');
    });
  });
});
