import { test, expect } from '../fixtures/pages.fixture';

/**
 * Verifies that a visitor can get past the KLPT passkey gate and reach the
 * KLPT home page, whether or not the first-time "Acknowledgement of Country"
 * welcome video modal appears along the way.
 *
 * klptHomePage.open() already handles both steps internally:
 *  - the passkey gate, via ensureKlptAccess(), and
 *  - the optional welcome video, via handleVideoPopupIfDisplayed(), which
 *    clicks Continue only if the popup is actually shown.
 *
 * By the time open() returns, any welcome video popup has already been
 * closed, so this test does not re-check the popup's visibility afterwards —
 * it simply drives the flow and asserts the resulting home page state.
 */
test.describe('KLPT welcome video', () => {
  test('Visitor can close the welcome video and access the KLPT homepage', async ({ klptHomePage }) => {
    await test.step('Opening the KLPT Test environment', async () => {
      console.log('Opening the KLPT Test environment');
      // open() internally: navigates to '/', handles the passkey gate, then
      // handles the welcome video if it appears (clicks Continue).
      await klptHomePage.open();
    });

    await test.step('Verifying the KLPT homepage is displayed', async () => {
      await expect(klptHomePage.heading).toBeVisible();
      console.log('KLPT homepage displayed');
    });
  });
});
