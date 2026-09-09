import { test, expect } from '../fixtures/pages.fixture';
import { DomainSelectionPage } from '../pages/DomainSelectionPage';
import { createNewSession } from './helpers/learningObservationFlow';

test.describe('Domain selection workflow', () => {
  test('User can select a domain, subdomain and multiple key elements', async ({ page, klptHomePage }) => {
    await createNewSession(page, klptHomePage);
    const domainPage = new DomainSelectionPage(page);

    await test.step('Selecting a Domain and a Subdomain if available', async () => {
      await domainPage.selectFirstAvailableDomain();
      await domainPage.selectSubdomainIfAvailable();
    });

    await test.step('Selecting two Key elements and verifying Next becomes available', async () => {
      await expect(domainPage.keyElementsHeading).toBeVisible({ timeout: 10_000 });
      await expect(domainPage.keyElementButtons.first()).toBeVisible({ timeout: 10_000 });

      const keyElementCount = await domainPage.keyElementButtons.count();
      await domainPage.keyElementButtons.nth(0).click();
      if (keyElementCount > 1) {
        await domainPage.keyElementButtons.nth(1).click();
      }

      await expect(domainPage.nextButton).toBeVisible({ timeout: 10_000 });
    });
  });

  test('Key-element cards are accessible and control Next availability', async ({ page, klptHomePage }) => {
    await createNewSession(page, klptHomePage);

    const domainPage = new DomainSelectionPage(page);

    await test.step('Selecting a Domain and a Subdomain if available', async () => {
      await domainPage.selectFirstAvailableDomain();
      await domainPage.selectSubdomainIfAvailable();
    });

    await test.step('Verifying the Key elements section is displayed', async () => {
      await expect(domainPage.keyElementsHeading).toBeVisible({ timeout: 10_000 });
      await expect(domainPage.keyElementButtons.first()).toBeVisible({ timeout: 10_000 });
    });

    const cardCount = await domainPage.keyElementButtons.count();

    await test.step('Verifying every displayed Key-element card is visible, enabled and accessible', async () => {
      expect(cardCount).toBeGreaterThan(0);
      for (let i = 0; i < cardCount; i++) {
        const card = domainPage.keyElementButtons.nth(i);
        await expect(card).toBeVisible();
        await expect(card).toBeEnabled();
        await expect(card).toHaveAccessibleName(/.+/);
      }
    });

    await test.step('Verifying Next is unavailable before any Key element is selected', async () => {
      // Next disappears entirely when disabled, so its absence confirms this.
      await expect(domainPage.nextButton).toHaveCount(0);
    });

    const firstCard = domainPage.keyElementButtons.first();

    await test.step('Selecting a Key-element card and verifying its selected state and count', async () => {
      await firstCard.click();
      await expect(firstCard).toHaveAttribute('aria-pressed', 'true');
      await expect(domainPage.elementsSelectedSummary).toHaveText(/\b1 element selected\b/i);
    });

    await test.step('Verifying Next becomes available once a Key element is selected', async () => {
      await expect(domainPage.nextButton).toBeVisible();
    });

    await test.step('Deselecting the Key-element card and verifying its state, count and Next revert', async () => {
      await firstCard.click();
      await expect(firstCard).not.toHaveAttribute('aria-pressed', 'true');
      await expect(domainPage.elementsSelectedSummary).toHaveText(/\b0 elements selected\b/i);
      await expect(domainPage.nextButton).toHaveCount(0);
    });
  });
});
