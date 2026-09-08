import { test, expect } from '../fixtures/pages.fixture';

/**
 * Smoke test for the real KLPT home page (KLPT Test environment).
 *
 * `klptHomePage.open()` navigates to the configured base URL and internally
 * calls `ensureKlptAccess()`, which transparently handles the KLPT passkey
 * ("Site access") gate if it appears — whether this is the very first visit in
 * this browser context or the ~1 hour access window has expired.
 */
test.describe('KLPT home page smoke test', () => {
  test('loads successfully and shows a meaningful heading', async ({ page, klptHomePage }) => {
    const response = await klptHomePage.open();

    // 1. Verify the initial navigation loaded successfully (no failed navigation / server error).
    expect(response, 'Expected a navigation response from the KLPT base URL').not.toBeNull();
    expect(response!.ok(), `Expected a successful HTTP status, got ${response?.status()}`).toBeTruthy();

    // 2. Verify the real KLPT home page rendered (confirmed via the browser tab title).
    await expect(page).toHaveTitle(/Home/i);

    // 3. Verify the real, meaningful home-page heading is visible.
    await expect(klptHomePage.heading).toBeVisible();
  });
});
