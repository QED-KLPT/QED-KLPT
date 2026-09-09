import { test, expect } from '../../../fixtures/pages.fixture';
import { LearningStatementPage } from '../../../pages/LearningStatementPage';
import { ReviewDownloadPage } from '../../../pages/ReviewDownloadPage';
import {
  reachStatementScreenWithSelections,
  fillLearningStatementFields,
  verifySelectionsOnReviewScreen,
} from '../../helpers/learningObservationFlow';
import { randomChildName, randomObserverName, learningStatementText } from '../../../test-data/learningObservation.data';

// Full end-to-end scenario for the Executive function domain: selects all 3 key
// elements (Persistence, Adaptability, Problem solving) and the second behaviour
// card for each, then completes the statement and verifies the Review screen.
// The statement screen's link-opening behaviour is domain-agnostic and already
// covered in learning-observation.statement.spec.ts, so it isn't repeated here.
test.describe('Learning observation toolkit — Executive function end-to-end scenario', () => {
  test('Launch session through to Review and download, selecting all Key elements and a non-first Behaviour card for each', async ({
    page,
    klptHomePage,
  }) => {
    const observerName = randomObserverName();

    const selections = await reachStatementScreenWithSelections(
      page,
      klptHomePage,
      observerName,
      { domainName: 'Executive function', selectAllKeyElements: true },
      1
    );

    expect(selections.keyElementNames).toHaveLength(3);
    expect(selections.behaviourDescriptions).toHaveLength(3);
    expect(selections.subdomainName).toBeNull();

    const statementPage = new LearningStatementPage(page);
    await expect(statementPage.heading).toBeVisible({ timeout: 10_000 });

    await test.step('Filling in the Learning statement fields', async () => {
      await fillLearningStatementFields(statementPage, learningStatementText);
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
