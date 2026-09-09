import { test, expect } from '../fixtures/pages.fixture';
import { ReviewDownloadPage } from '../pages/ReviewDownloadPage';
import { reachReviewScreen } from './helpers/learningObservationFlow';

// Document generation has no observable response in Test, so these only verify the buttons.
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
