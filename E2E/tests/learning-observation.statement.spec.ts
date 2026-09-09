import { test, expect } from '../fixtures/pages.fixture';
import { LearningStatementPage } from '../pages/LearningStatementPage';
import { BehaviourSelectionPage } from '../pages/BehaviourSelectionPage';
import { reachStatementScreen } from './helpers/learningObservationFlow';

test.describe('Learning progression statement', () => {
  test('Learning progression statement displays the observation summary and accepts a Description', async ({
    page,
    klptHomePage,
  }) => {
    await reachStatementScreen(page, klptHomePage);
    const statementPage = new LearningStatementPage(page);

    await test.step('Verifying the Learning progression statement screen and observation summary are displayed', async () => {
      await expect(statementPage.heading).toBeVisible({ timeout: 10_000 });
      await expect(statementPage.whatYouObserved).toBeVisible();
      await expect(
        page.getByRole('heading', { name: 'What is likely to be the next step in learning progression', level: 3 })
      ).toBeVisible();
    });

    await test.step('Filling and verifying the Description field', async () => {
      const descriptionText = 'Observed child interacting with peers during free play.';
      await statementPage.descriptionInput.fill(descriptionText);
      await expect(statementPage.descriptionInput).toHaveValue(descriptionText);
    });
  });

  test('Reflection fields are visible and editable', async ({ page, klptHomePage }) => {
    await reachStatementScreen(page, klptHomePage);
    const statementPage = new LearningStatementPage(page);

    await test.step('Verifying the Learning progression statement screen is displayed', async () => {
      await expect(statementPage.heading).toBeVisible({ timeout: 10_000 });
    });

    const suffix = Math.random().toString(36).slice(2, 8);
    const professionalReflectionText = `Professional reflection notes ${suffix}`;
    const supportLearningText = `Support actions ${suffix}`;
    const qklgReflectionText = `QKLG reflection ${suffix}`;

    await test.step('Filling and verifying the Professional reflection field', async () => {
      await statementPage.professionalReflectionInput.click();
      await statementPage.professionalReflectionInput.fill(professionalReflectionText);
      await expect(statementPage.professionalReflectionInput).toHaveValue(professionalReflectionText);
    });

    await test.step('Filling and verifying the How can you support this learning? field', async () => {
      await statementPage.supportLearningInput.click();
      await statementPage.supportLearningInput.fill(supportLearningText);
      await expect(statementPage.supportLearningInput).toHaveValue(supportLearningText);
    });

    await test.step('Filling and verifying the QKLG/EYLF reflection field', async () => {
      // This field has no accessible name, so it's located by DOM position (see the page object).
      await statementPage.qklgReflectionInput.click();
      await statementPage.qklgReflectionInput.fill(qklgReflectionText);
      await expect(statementPage.qklgReflectionInput).toHaveValue(qklgReflectionText);
    });
  });

  test('View reflective questions control expands and collapses', async ({ page, klptHomePage }) => {
    await reachStatementScreen(page, klptHomePage);
    const statementPage = new LearningStatementPage(page);
    await expect(statementPage.heading).toBeVisible({ timeout: 10_000 });

    await test.step('Verifying the accordion starts collapsed (aria-expanded="false")', async () => {
      await expect(statementPage.reflectiveQuestionsToggle).toHaveAttribute('aria-expanded', 'false');
    });

    await test.step('Verifying the reflective questions have real, non-empty content', async () => {
      const count = await statementPage.reflectiveQuestionsListItems.count();
      expect(count).toBeGreaterThan(0);
      for (let i = 0; i < count; i++) {
        const text = await statementPage.reflectiveQuestionsListItems.nth(i).innerText();
        expect(text.trim().length).toBeGreaterThan(0);
      }
    });

    await test.step('Clicking the control by its accessible name and verifying it expands', async () => {
      await statementPage.reflectiveQuestionsToggle.click();
      await expect(statementPage.reflectiveQuestionsToggle).toHaveAttribute('aria-expanded', 'true');
      // The content stays visible even when collapsed — only aria-expanded actually toggles.
      await expect(statementPage.reflectiveQuestionsListItems.first()).toBeVisible();
    });

    await test.step('Clicking the control again and verifying it collapses', async () => {
      await statementPage.reflectiveQuestionsToggle.click();
      await expect(statementPage.reflectiveQuestionsToggle).toHaveAttribute('aria-expanded', 'false');
    });
  });

  test('Support links open their destination in a new tab', async ({ page, klptHomePage, context }) => {
    await reachStatementScreen(page, klptHomePage);
    const statementPage = new LearningStatementPage(page);
    await expect(statementPage.heading).toBeVisible({ timeout: 10_000 });

    await test.step('Verifying the practice supports link and opening it in a new tab', async () => {
      const link = statementPage.practiceSupportsLink;
      await expect(link).toBeVisible();
      await expect(link).toHaveAccessibleName(/opens in a new tab/i);

      const href = await link.getAttribute('href');
      expect(href).toBeTruthy();

      const [newPage] = await Promise.all([context.waitForEvent('page'), link.click()]);
      await newPage.waitForLoadState();

      // Resolve the relative link before comparing URLs.
      const expectedUrl = new URL(href!, page.url()).toString();
      await expect(newPage).toHaveURL(expectedUrl);

      await newPage.close();
      await page.bringToFront();
      await expect(statementPage.heading).toBeVisible({ timeout: 10_000 });
    });

    await test.step('Verifying the PDF alignment control opens a new tab without disturbing the original page', async () => {
      // This control is a button, not a link, so there's no href to check up front.
      const control = statementPage.alignmentPdfControl;
      await expect(control).toBeVisible();
      await expect(control.getByText(/opens in a new tab/i)).toBeVisible();

      const pageCountBefore = context.pages().length;
      const [newPage] = await Promise.all([context.waitForEvent('page'), control.click()]);

      expect(context.pages().length).toBe(pageCountBefore + 1);
      await expect(statementPage.heading).toBeVisible({ timeout: 10_000 });

      await newPage.close();
      await page.bringToFront();
    });
  });

  test('Previously entered reflection values persist across Previous and Next', async ({ page, klptHomePage }) => {
    await reachStatementScreen(page, klptHomePage);
    const statementPage = new LearningStatementPage(page);
    await expect(statementPage.heading).toBeVisible({ timeout: 10_000 });

    const professionalReflectionText = 'Persisted professional reflection';
    const supportLearningText = 'Persisted support learning';
    const qklgReflectionText = 'Persisted QKLG reflection';

    await test.step('Entering text in all three reflection fields', async () => {
      await statementPage.professionalReflectionInput.fill(professionalReflectionText);
      await statementPage.supportLearningInput.fill(supportLearningText);
      await statementPage.qklgReflectionInput.fill(qklgReflectionText);
      // Blur before navigating — the app saves on blur, and leaving the field focused can race that save.
      await statementPage.qklgReflectionInput.blur();
    });

    const behaviourPage = new BehaviourSelectionPage(page);

    await test.step('Clicking Previous and verifying the user returns to the Behaviours screen', async () => {
      await statementPage.previousLink.click();
      await expect(behaviourPage.heading).toBeVisible({ timeout: 10_000 });
    });

    await test.step('Clicking Next again and verifying the reflection values were preserved', async () => {
      await behaviourPage.nextButton.click();
      await expect(statementPage.heading).toBeVisible({ timeout: 10_000 });

      await expect(statementPage.professionalReflectionInput).toHaveValue(professionalReflectionText);
      await expect(statementPage.supportLearningInput).toHaveValue(supportLearningText);
      await expect(statementPage.qklgReflectionInput).toHaveValue(qklgReflectionText);
    });

    await test.step("Verifying Next navigates to the Review and download screen", async () => {
      await statementPage.nextButton.click();
      // The page title is plain text rather than a heading.
      await expect(page.getByText('Review and download the learning progression statement')).toBeVisible({
        timeout: 10_000,
      });
    });
  });
});
