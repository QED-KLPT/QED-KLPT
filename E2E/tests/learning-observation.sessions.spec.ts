import { test, expect } from '../fixtures/pages.fixture';
import { ObservationSessionsPage } from '../pages/ObservationSessionsPage';

test.describe('Learning observation sessions — create and cancel', () => {
  test('Cancelling a new observation hides the session fields', async ({ page, klptHomePage }) => {
    await test.step('Open sessions page and start new observation', async () => {
      await klptHomePage.open();
      await page.goto('/learning-observation-tool/sessions');
    });

    const sessions = new ObservationSessionsPage(page);
    await test.step('Click Start a new observation and verify fields', async () => {
      await sessions.startNew();
      await expect(sessions.learnerCodeInput).toBeVisible();
      await expect(sessions.observerNameInput).toBeVisible();
      await expect(sessions.createButton).toBeVisible();
      await expect(sessions.cancelButton).toBeVisible();
    });

    await test.step('Click Cancel and verify fields are hidden', async () => {
      await sessions.cancelNew();
      await expect(sessions.learnerCodeInput).toBeHidden();
      await expect(sessions.createButton).toBeHidden();
      await expect(sessions.startNewButton).toBeVisible();
    });
  });

  test('User can create a new observation session with valid details', async ({ page, klptHomePage }) => {
    await klptHomePage.open();
    await page.goto('/learning-observation-tool/sessions');

    const sessions = new ObservationSessionsPage(page);
    await test.step('Start new observation and enter valid details', async () => {
      await sessions.startNew();
      const code = String(Math.floor(100 + Math.random() * 900));
      await sessions.learnerCodeInput.fill(code);
      await sessions.observerNameInput.fill('Playwright Tester');
      await expect(sessions.createButton).toBeEnabled();
      await sessions.createButton.click();
    });

    await test.step('Verify navigation to the Learning observation workflow (Domains)', async () => {
      const domainsHeading = page.getByRole('heading').filter({ hasText: /Domains|Domain selection/i }).first();
      await expect(domainsHeading).toBeVisible({ timeout: 10000 });
    });
  });
});
