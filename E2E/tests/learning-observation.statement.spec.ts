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
      // NOTE: this field has no accessible name at all on the real site (a
      // confirmed accessibility gap — see LearningStatementPage.qklgReflectionInput),
      // so it's located via DOM position relative to its confirmed, unique
      // static label text rather than getByLabel/getByRole(..., { name }).
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
      // Clicking via its accessible name ("View reflective questions") — the
      // chevron icon inside is aria-hidden, so this always targets the real
      // control, never just the icon.
      await statementPage.reflectiveQuestionsToggle.click();
      await expect(statementPage.reflectiveQuestionsToggle).toHaveAttribute('aria-expanded', 'true');
      // CONFIRMED REAL BEHAVIOUR: unlike a typical accordion, this control's
      // content is already visually present (non-zero bounding box) even
      // while aria-expanded="false" — expanding does not actually toggle
      // visibility, only the aria-expanded flag. So this step verifies the
      // state change and content presence, not a hidden->visible transition
      // that doesn't occur in the real app.
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

      // href is site-relative ("/learning-domains/..."), so resolve it
      // against the current origin before comparing to the new tab's URL.
      const expectedUrl = new URL(href!, page.url()).toString();
      await expect(newPage).toHaveURL(expectedUrl);

      await newPage.close();
      await page.bringToFront();
      await expect(statementPage.heading).toBeVisible({ timeout: 10_000 });
    });

    await test.step('Verifying the PDF alignment control opens a new tab without disturbing the original page', async () => {
      // CONFIRMED REAL MARKUP: this control is a <button class="link-button">
      // with NO href attribute (not an <a>) — its own visible text is the
      // only place "opens in a new tab" appears (see
      // LearningStatementPage.alignmentPdfControl for the full accessibility
      // gap this represents). There is therefore no href to read/compare
      // up front, unlike the link above.
      const control = statementPage.alignmentPdfControl;
      await expect(control).toBeVisible();
      await expect(control.getByText(/opens in a new tab/i)).toBeVisible();

      const pageCountBefore = context.pages().length;
      const [newPage] = await Promise.all([context.waitForEvent('page'), control.click()]);

      expect(context.pages().length).toBe(pageCountBefore + 1);
      // Original KLPT page remains open and on the same screen.
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
      // CONFIRMED REAL BEHAVIOUR: the app appears to save field values on
      // blur; navigating away immediately after fill() (with the field still
      // focused) can race that save and lose the last-edited field's value.
      // An explicit blur here mirrors what a real user does before clicking
      // another control, and made this reliably reproducible across repeated runs.
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
      // NOTE: confirmed on the real site that this screen's title renders as
      // a plain paragraph, not a role="heading" element — matched on its
      // real visible text rather than an (absent) heading role.
      await expect(page.getByText('Review and download the learning progression statement')).toBeVisible({
        timeout: 10_000,
      });
    });
  });
});
