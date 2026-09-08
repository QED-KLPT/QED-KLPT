import { test, expect } from '../fixtures/pages.fixture';
import { ReviewDownloadPage } from '../pages/ReviewDownloadPage';
import { reachReviewScreen } from './helpers/learningObservationFlow';

/**
 * CONFIRMED REAL ENVIRONMENT LIMITATION: clicking "Generate Word document" or
 * "Generate PDF" produces no observable response at all in the KLPT Test
 * environment — no network request, download, new tab, or console/page error
 * (confirmed via full event/network logging, headed and headless, waiting up
 * to 45s, with every Learning statement field populated). Download
 * verification is therefore intentionally excluded here — asserting on a
 * download that never fires would require a hard-coded wait and would not be
 * a reliable check. These tests are scoped to what IS reliably verifiable:
 * the controls are visible and enabled. Revisit once the KLPT dev team
 * confirms document generation is expected to work in this environment (see
 * the defect report raised alongside this change).
 */
test.describe('Review and download', () => {
  test('Generate Word document control is visible and enabled', async ({ page, klptHomePage }) => {
    await reachReviewScreen(page, klptHomePage);
    const reviewPage = new ReviewDownloadPage(page);

    await test.step("Entering the Child's name", async () => {
      await expect(reviewPage.childNameInput).toBeVisible();
      await reviewPage.childNameInput.fill('Automation Child');
    });

    await test.step('Verifying Generate Word document is visible and enabled', async () => {
      await expect(reviewPage.generateWordButton).toBeVisible();
      await expect(reviewPage.generateWordButton).toBeEnabled();
    });
  });

  test('Generate PDF control is visible and enabled', async ({ page, klptHomePage }) => {
    await reachReviewScreen(page, klptHomePage);
    const reviewPage = new ReviewDownloadPage(page);

    await test.step("Entering the Child's name", async () => {
      await expect(reviewPage.childNameInput).toBeVisible();
      await reviewPage.childNameInput.fill('Automation Child');
    });

    await test.step('Verifying Generate PDF is visible and enabled', async () => {
      await expect(reviewPage.generatePdfButton).toBeVisible();
      await expect(reviewPage.generatePdfButton).toBeEnabled();
    });
  });
});
