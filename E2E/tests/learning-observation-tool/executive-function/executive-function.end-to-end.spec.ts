import { test, expect } from '../../../fixtures/pages.fixture';
import { LearningStatementPage } from '../../../pages/LearningStatementPage';
import { ReviewDownloadPage } from '../../../pages/ReviewDownloadPage';
import {
  reachStatementScreenWithSelections,
  fillLearningStatementFields,
  verifySelectionsOnReviewScreen,
} from '../../helpers/learningObservationFlow';
import { randomChildName, randomObserverName, learningStatementText } from '../../../test-data/learningObservation.data';

/**
 * Full end-to-end Learning Observation Toolkit scenario for the Executive
 * function Domain: from launching a new observation session, through
 * selecting ALL 3 of its Key elements (Persistence, Adaptability, Problem
 * solving — confirmed real, fixed set on the KLPT Test environment) and a
 * non-first Behaviour card for each, to the Learning progression statement
 * and Review and download screens — verifying every selected/entered value
 * is reflected correctly on the final screen.
 *
 * Unlike the Language and literacy scenario
 * (tests/learning-observation-tool/language-and-literacy/language-and-literacy.end-to-end.spec.ts),
 * which follows the default single-Key-element / first-Behaviour-card
 * workflow, this scenario deliberately exercises the shared flow helpers'
 * multi-Key-element path:
 *  - selects every available Key element (not just the first), and
 *  - selects the SECOND Behaviour card in every Key element's section (not
 *    the first), per project requirement.
 *
 * Session creation and Domain/Behaviour selection are delegated to
 * reachStatementScreenWithSelections() (tests/helpers/learningObservationFlow.ts)
 * — the same helper the Language and literacy scenario uses — which captures
 * every selected value (Domain, Key elements, Behaviours) as it goes, so this
 * spec can verify them later without re-querying the earlier screens. The
 * Statement screen's link-opening behaviour (practice supports / alignment
 * PDF) is Domain-agnostic and already covered by
 * tests/learning-observation.statement.spec.ts, so it isn't repeated here.
 */
test.describe('Learning observation toolkit — Executive function end-to-end scenario', () => {
  test('Launch session through to Review and download, selecting all Key elements and a non-first Behaviour card for each', async ({
    page,
    klptHomePage,
  }) => {
    const observerName = randomObserverName();

    // Steps 1-6: launch a session (random Learner code + Observer name),
    // select the Executive function Domain and ALL 3 of its Key elements,
    // then select the SECOND Behaviour card (index 1) for each Key element,
    // landing on the Learning progression statement screen. Every selected
    // value is captured for verification on the Review and download screen.
    const selections = await reachStatementScreenWithSelections(
      page,
      klptHomePage,
      observerName,
      { domainName: 'Executive function', selectAllKeyElements: true },
      1
    );

    expect(selections.keyElementNames).toHaveLength(3);
    expect(selections.behaviourDescriptions).toHaveLength(3);
    // No Subdomain step exists for Executive function on the real site.
    expect(selections.subdomainName).toBeNull();

    const statementPage = new LearningStatementPage(page);
    await expect(statementPage.heading).toBeVisible({ timeout: 10_000 });

    await test.step('Filling in the Learning statement fields', async () => {
      await fillLearningStatementFields(statementPage, learningStatementText);
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
    // via full event/network logging). See also
    // tests/learning-observation.review.spec.ts.
    await test.step('Verifying the document-generation buttons are visible and enabled', async () => {
      await expect(reviewPage.generateWordButton).toBeVisible();
      await expect(reviewPage.generateWordButton).toBeEnabled();
      await expect(reviewPage.generatePdfButton).toBeVisible();
      await expect(reviewPage.generatePdfButton).toBeEnabled();
    });
  });
});
