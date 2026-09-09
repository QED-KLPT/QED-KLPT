import { test, expect } from '../fixtures/pages.fixture';

test.describe('KLPT home page smoke test', () => {
  test('loads successfully and shows a meaningful heading', async ({ page, klptHomePage }) => {
    const response = await klptHomePage.open();

    expect(response, 'Expected a navigation response from the KLPT base URL').not.toBeNull();
    expect(response!.ok(), `Expected a successful HTTP status, got ${response?.status()}`).toBeTruthy();

    await expect(page).toHaveTitle(/Home/i);
    await expect(klptHomePage.heading).toBeVisible();
  });
});
