import type { Download } from '@playwright/test';
import { test, expect } from '../../../fixtures/pages.fixture';
import { LearningStatementPage } from '../../../pages/LearningStatementPage';
import { ReviewDownloadPage } from '../../../pages/ReviewDownloadPage';
import {
  reachStatementScreenWithSelections,
  fillLearningStatementFields,
  expectLearningStatementFieldsToHaveValues,
  verifySelectionsOnReviewScreen,
} from '../../helpers/learningObservationFlow';
import { randomChildName, randomObserverName, learningStatementText } from '../../../test-data/learningObservation.data';

// Full end-to-end scenario for the Language and literacy domain: launch a session,
// select a domain/subdomain/key element/behaviour, fill the statement, and verify
// everything on the Review and download screen. Compare with the Executive function
// scenario, which exercises the same helpers with multiple key elements.
test.describe('Learning observation toolkit — Language and literacy end-to-end scenario', () => {
  test('Launch session through to Review and download, with all selections and entries verified', async ({
    page,
    klptHomePage,
    context,
  }) => {
    const observerName = randomObserverName();

    const selections = await reachStatementScreenWithSelections(page, klptHomePage, observerName, {
      domainName: 'Language and literacy',
    });

    const statementPage = new LearningStatementPage(page);
    await expect(statementPage.heading).toBeVisible({ timeout: 10_000 });

    await test.step('Filling in the Learning statement fields', async () => {
      await fillLearningStatementFields(statementPage, learningStatementText);
    });

    await test.step('Opening the "How can you support this learning?" practice supports link in a new tab and verifying it', async () => {
      const link = statementPage.practiceSupportsLink;
      await expect(link).toBeVisible();

      const href = await link.getAttribute('href');
      expect(href).toBeTruthy();

      const [newPage] = await Promise.all([context.waitForEvent('page'), link.click()]);
      await newPage.waitForLoadState();

      // Resolve the relative link before comparing URLs.
      const expectedUrl = new URL(href!, page.url()).toString();
      await expect(newPage).toHaveURL(expectedUrl);
      await expect(newPage.getByRole('heading', { level: 1 })).toHaveText(selections.domainName);

      await newPage.close();
      await page.bringToFront();
      await expect(statementPage.heading).toBeVisible({ timeout: 10_000 });
    });

    await test.step('Confirming the Learning statement fields survived the practice supports tab', async () => {
      await expectLearningStatementFieldsToHaveValues(statementPage, learningStatementText);
    });

    await test.step(
      'Opening the QKLG/EYLF alignment link (for "What QKLG..." field) in a new tab and verifying it',
      async () => {
        // Headed Chrome opens the PDF in a tab; headless Chrome may download it instead.
        const control = statementPage.alignmentPdfControl;
        await expect(control).toBeVisible();

        const pageCountBefore = context.pages().length;
        let download: Download | null = null;
        context.once('download', (d) => {
          download = d;
        });

        const [newPage] = await Promise.all([context.waitForEvent('page'), control.click()]);
        expect(context.pages().length).toBe(pageCountBefore + 1);

        await Promise.race([
          newPage.waitForURL(/qklg_align_eylf\.pdf/i, { timeout: 10_000 }).catch(() => {}),
          newPage.waitForEvent('close', { timeout: 10_000 }).catch(() => {}),
        ]);

        const openedPdfUrl = download ? (download as Download).url() : newPage.url();
        expect(openedPdfUrl).toContain('qklg_align_eylf.pdf');

        if (!newPage.isClosed()) {
          await newPage.close();
        }
        await page.bringToFront();
        await expect(statementPage.heading).toBeVisible({ timeout: 10_000 });
      }
    );

    await test.step('Confirming the Learning statement fields survived the alignment PDF tab', async () => {
      await expectLearningStatementFieldsToHaveValues(statementPage, learningStatementText);
    });

    await test.step('Continuing to the Review and download screen', async () => {
      await expect(statementPage.nextButton).toBeVisible();
      await statementPage.nextButton.click();
      // The page title is plain text rather than a heading.
      await expect(page.getByText('Review and download the learning progression statement')).toBeVisible({
        timeout: 10_000,
      });
    });

    const reviewPage = new ReviewDownloadPage(page);

    await verifySelectionsOnReviewScreen(page, selections);

    await test.step('Verifying the Learning statement text is displayed', async () => {
      await expect(page.getByText(learningStatementText.description)).toBeVisible();
      await expect(page.getByText(learningStatementText.professionalReflection)).toBeVisible();
      await expect(page.getByText(learningStatementText.supportLearning)).toBeVisible();
      await expect(page.getByText(learningStatementText.qklgReflection)).toBeVisible();
    });

    const childName = randomChildName();

    await test.step("Entering and verifying the Child's name field", async () => {
      await expect(reviewPage.childNameInput).toBeVisible();
      await reviewPage.childNameInput.fill(childName);
      await expect(reviewPage.childNameInput).toHaveValue(childName);
    });

    // Document generation has no observable response in Test, so verify the buttons only.
    await test.step('Verifying the document-generation buttons are visible and enabled', async () => {
      await expect(reviewPage.generateWordButton).toBeVisible();
      await expect(reviewPage.generateWordButton).toBeEnabled();
      await expect(reviewPage.generatePdfButton).toBeVisible();
      await expect(reviewPage.generatePdfButton).toBeEnabled();
    });
  });
});
