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

/**
 * Full end-to-end Learning Observation Toolkit scenario for the Language and
 * literacy Domain: from launching a new observation session, through
 * Domain/Subdomain/Key element/Behaviour selection and the Learning
 * progression statement, to the Review and download screen — verifying every
 * selected/entered value is reflected correctly on the final screen.
 *
 * This follows the same valid Learning Observation Tool workflow as every
 * other spec in this project (one Key element, one Behaviour — the default
 * behaviour of the shared flow helpers), explicitly naming "Language and
 * literacy" as the Domain to select rather than relying on it being first in
 * the list. Compare with the Executive function scenario
 * (tests/learning-observation-tool/executive-function/executive-function.end-to-end.spec.ts),
 * which exercises the same shared helpers with a Domain that has multiple
 * Key elements and a required non-first Behaviour card selection.
 *
 * Session creation and Domain/Behaviour selection are delegated to
 * reachStatementScreenWithSelections() (tests/helpers/learningObservationFlow.ts),
 * which captures each selected value (Domain, Subdomain, Key element,
 * Behaviour) as it goes, so this spec can verify them later without
 * re-querying the earlier screens.
 */
test.describe('Learning observation toolkit — Language and literacy end-to-end scenario', () => {
  test('Launch session through to Review and download, with all selections and entries verified', async ({
    page,
    klptHomePage,
    context,
  }) => {
    const observerName = randomObserverName();

    // Steps 1-6: launch a session (random Learner code + Observer name), then
    // the Language and literacy Domain, Subdomain (if available), Key
    // element and Behaviour selection, landing on the Learning progression
    // statement screen. Every selected value is captured for verification on
    // the Review and download screen.
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

      // href is site-relative, so resolve it against the current origin
      // before comparing to the new tab's URL.
      const expectedUrl = new URL(href!, page.url()).toString();
      await expect(newPage).toHaveURL(expectedUrl);

      // The destination page's heading names the same Domain that was
      // selected earlier — confirms the new tab loaded the right content.
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
        // CONFIRMED REAL BEHAVIOUR: this control opens the external QKLG/EYLF
        // alignment PDF (qcaa.qld.edu.au) in a new tab, but which of two
        // outcomes actually happens depends on the browser's PDF handling:
        //  - headed Chromium (has a built-in PDF viewer): the new tab
        //    navigates to and renders the PDF directly — no 'download' event.
        //  - headless Chromium (no PDF viewer): the new tab stays blank and
        //    the PDF is downloaded instead — a 'download' event fires and the
        //    tab's own URL never changes.
        // Both are handled here rather than assuming one.
        const control = statementPage.alignmentPdfControl;
        await expect(control).toBeVisible();

        const pageCountBefore = context.pages().length;
        let download: Download | null = null;
        context.once('download', (d) => {
          download = d;
        });

        const [newPage] = await Promise.all([context.waitForEvent('page'), control.click()]);
        expect(context.pages().length).toBe(pageCountBefore + 1);

        // Wait for whichever outcome actually occurs: the new tab navigates
        // to the PDF (rendered inline), or the download completes (the tab
        // itself may stay blank or close automatically once it has).
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
      // NOTE: confirmed on the real site that this screen's title renders as
      // a plain paragraph, not a role="heading" element.
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

    // Download verification is intentionally excluded: clicking either button
    // produces no observable response in the KLPT Test environment (no
    // network request, download, new tab, or console/page error — confirmed
    // via full event/network logging). Asserting on a download that never
    // fires would require a hard-coded wait rather than a reliable check, so
    // this scenario is scoped to what IS reliably verifiable — see also
    // tests/learning-observation.review.spec.ts.
    await test.step('Verifying the document-generation buttons are visible and enabled', async () => {
      await expect(reviewPage.generateWordButton).toBeVisible();
      await expect(reviewPage.generateWordButton).toBeEnabled();
      await expect(reviewPage.generatePdfButton).toBeVisible();
      await expect(reviewPage.generatePdfButton).toBeEnabled();
    });
  });
});
