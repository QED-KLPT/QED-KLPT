import { test, expect } from '../fixtures/pages.fixture';
import { DomainSelectionPage } from '../pages/DomainSelectionPage';
import { BehaviourSelectionPage } from '../pages/BehaviourSelectionPage';
import { reachBehaviourScreen } from './helpers/learningObservationFlow';

test.describe('Behaviour selection workflow', () => {
  test('User can select a behaviour for each selected key element', async ({ page, klptHomePage }) => {
    await reachBehaviourScreen(page, klptHomePage);

    const behaviourPage = new BehaviourSelectionPage(page);

    await test.step('Verifying the Behaviours screen is displayed', async () => {
      await expect(behaviourPage.heading).toBeVisible({ timeout: 10000 });
    });

    await test.step('Selecting a Behaviour and verifying it is selected', async () => {
      await behaviourPage.selectFirstAvailableBehaviour();
      await expect(behaviourPage.behaviourOptionButtons.first()).toHaveAttribute('aria-pressed', 'true');
    });

    await test.step('Advancing to the Learning progression statement screen', async () => {
      await expect(behaviourPage.nextButton).toBeVisible();
      await behaviourPage.nextButton.click();
      await expect(page.getByRole('heading', { name: /Learning progression statement/i })).toBeVisible();
    });
  });

  test('User can clear the session from the confirmation popup and return to the first screen', async ({ page, klptHomePage }) => {
    await reachBehaviourScreen(page, klptHomePage);

    const behaviourPage = new BehaviourSelectionPage(page);
    const domainPage = new DomainSelectionPage(page);

    await test.step('Verifying the Behaviours screen is displayed', async () => {
      await expect(behaviourPage.heading).toBeVisible({ timeout: 10000 });
    });

    await test.step('Selecting a Behaviour and verifying it is selected', async () => {
      // Select at least one behaviour so there are selections/notes for the
      // Clear session popup to actually clear.
      await behaviourPage.selectFirstAvailableBehaviour();
      await expect(behaviourPage.behaviourOptionButtons.first()).toHaveAttribute('aria-pressed', 'true');
    });

    await test.step('Clicking Clear session and waiting for the confirmation popup', async () => {
      await behaviourPage.clickClearSession();
    });

    await test.step('Verifying the popup heading and message', async () => {
      await expect(behaviourPage.clearSessionDialogHeading).toBeVisible();
      await expect(behaviourPage.clearSessionDialogMessage).toBeVisible();
    });

    await test.step('Verifying Cancel and Clear session buttons are visible and enabled', async () => {
      await expect(behaviourPage.clearSessionCancelButton).toBeVisible();
      await expect(behaviourPage.clearSessionCancelButton).toBeEnabled();
      await expect(behaviourPage.clearSessionConfirmButton).toBeVisible();
      await expect(behaviourPage.clearSessionConfirmButton).toBeEnabled();
    });

    await test.step('Confirming Clear session inside the popup', async () => {
      await behaviourPage.confirmClearSession();
    });

    await test.step('Verifying the session was reset to the first screen', async () => {
      // First Learning Observation screen: domain / key element selection.
      await expect(domainPage.domainButtons.first()).toBeVisible({ timeout: 10000 });
      // Previous Domain/Subdomain/Key element/Behaviour selections and notes
      // are cleared:
      //  - no Domain shows as selected (aria-pressed) any more, and
      //  - Next is back to its disabled state — confirmed on the real site
      //    to render as plain non-interactive text (no link/button role) at
      //    all while disabled, so its absence here is what confirms "cleared".
      await expect(domainPage.domainButtons.first()).not.toHaveAttribute('aria-pressed', 'true');
      await expect(domainPage.nextButton).toHaveCount(0);
    });
  });
});
