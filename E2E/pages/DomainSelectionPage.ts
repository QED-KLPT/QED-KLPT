import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class DomainSelectionPage extends BasePage {
  readonly nextButton: Locator;

  /** Optional intro card some sessions show before the domain list; dismissLandingCardIfPresent() is a no-op if it's not there. */
  readonly landingCard: Locator;

  readonly domainButtons: Locator;

  /** Not every domain has subdomains — some go straight to Key elements. */
  readonly subdomainButtons: Locator;

  readonly keyElementButtons: Locator;
  readonly keyElementsHeading: Locator;

  /** e.g. "Language and literacy, Sounds and Speech: 1 element selected." Matched on the count suffix only, since the prefix varies. */
  readonly elementsSelectedSummary: Locator;

  constructor(page: Page) {
    super(page);

    // Next renders as a link once enabled, not a button — match either.
    this.nextButton = page
      .getByRole('link', { name: 'Next', exact: true })
      .or(page.getByRole('button', { name: 'Next', exact: true }));

    this.landingCard = page.getByRole('button').filter({
      hasText: /Select the focus for this observation|Select the focus/i,
    });

    this.domainButtons = page.getByRole('button', { name: /^Select domain /i });

    // Matched by accessible name, not text content — these buttons carry the
    // name via aria-label only, so hasText finds nothing.
    this.subdomainButtons = page.getByRole('button', { name: /^Select subdomain /i });
    this.keyElementButtons = page.getByRole('button', { name: /^Toggle element /i });

    this.keyElementsHeading = page.getByRole('heading', { name: 'Key elements', level: 3 });
    this.elementsSelectedSummary = page.getByText(/\d+ elements? selected\.?/i);
  }

  async dismissLandingCardIfPresent(): Promise<void> {
    if ((await this.landingCard.count()) > 0) {
      await this.landingCard.first().click();
    }
  }

  async selectFirstAvailableDomain(): Promise<void> {
    await this.selectFirstAvailableDomainAndGetName();
  }

  async selectSubdomainIfAvailable(): Promise<void> {
    await this.selectSubdomainIfAvailableAndGetName();
  }

  async selectFirstAvailableDomainAndGetName(): Promise<string> {
    await this.dismissLandingCardIfPresent();
    await expect(this.domainButtons.first()).toBeVisible({ timeout: 10_000 });
    const name = (await this.domainButtons.first().innerText()).trim();
    await this.domainButtons.first().click();
    return name;
  }

  /** Returns the subdomain's name, or null if this domain skips straight to Key elements. */
  async selectSubdomainIfAvailableAndGetName(): Promise<string | null> {
    // Race both outcomes — a plain count() right after selecting the domain
    // could catch it before either has rendered.
    const subdomainsAppeared = await Promise.race([
      this.subdomainButtons.first().waitFor({ state: 'visible', timeout: 10_000 }).then(() => true).catch(() => false),
      this.keyElementButtons.first().waitFor({ state: 'visible', timeout: 10_000 }).then(() => false).catch(() => false),
    ]);

    if (!subdomainsAppeared) {
      return null;
    }

    const name = (await this.subdomainButtons.first().innerText()).trim();
    await this.subdomainButtons.first().click();
    return name;
  }

  async selectFirstAvailableKeyElementAndGetName(): Promise<string> {
    await expect(this.keyElementButtons.first()).toBeVisible({ timeout: 10_000 });
    const name = (await this.keyElementButtons.first().innerText()).trim();
    await this.keyElementButtons.first().click();
    return name;
  }

  /** Selects a specific domain by name instead of always the first — used by per-domain scenarios. */
  async selectDomainByName(name: string): Promise<void> {
    await this.dismissLandingCardIfPresent();
    const domainButton = this.page.getByRole('button', { name: `Select domain ${name}`, exact: true });
    await expect(domainButton).toBeVisible({ timeout: 10_000 });
    await domainButton.click();
  }

  /** Selects every available key element — used for domains like Executive function where all are required. */
  async selectAllAvailableKeyElementsAndGetNames(): Promise<string[]> {
    await expect(this.keyElementButtons.first()).toBeVisible({ timeout: 10_000 });
    const count = await this.keyElementButtons.count();
    const names: string[] = [];
    for (let i = 0; i < count; i++) {
      const button = this.keyElementButtons.nth(i);
      names.push((await button.innerText()).trim());
      await button.click();
    }
    return names;
  }
}
