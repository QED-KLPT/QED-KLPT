import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class DomainSelectionPage extends BasePage {
  readonly nextButton: Locator;

  /**
   * Optional intro content ("Select the focus for this observation") shown
   * above the domain list; confirmed on the real site to currently render as
   * a plain heading/paragraph, not a clickable button, on every session
   * observed so far. Kept as a button-scoped locator (and dismissed only if
   * it actually matches) in case a session variant does show it as a real
   * clickable step — dismissLandingCardIfPresent() is a safe no-op otherwise.
   */
  readonly landingCard: Locator;

  /** Domain selection buttons — confirmed real accessible name: "Select domain <name>", e.g. "Select domain Language and literacy". */
  readonly domainButtons: Locator;

  /**
   * Subdomain selection buttons. NOT every domain has subdomains — some go
   * straight from Domain to Key elements (see selectSubdomainIfAvailable).
   */
  readonly subdomainButtons: Locator;

  /** Key element selection buttons, shown either directly after a Domain or after a Subdomain. */
  readonly keyElementButtons: Locator;

  /** Real confirmed heading for the Key elements section: <h3>Key elements</h3>. */
  readonly keyElementsHeading: Locator;

  /**
   * Live selected-count summary, confirmed real visible text, e.g.
   * "Language and literacy, Sounds and Speech: 1 element selected." Matched
   * on the stable "<count> element(s) selected" suffix only, since the
   * Domain/Subdomain name prefix varies per selection.
   */
  readonly elementsSelectedSummary: Locator;

  constructor(page: Page) {
    super(page);

    // NOTE: confirmed on the real site that "Next" renders as a role="link"
    // (navigating straight to the behaviours-selection URL) once enabled, not
    // a role="button" — .or() matches either, so this stays correct whichever
    // element actually renders. exact: true guards against any other control
    // on this screen whose accessible name merely contains "Next".
    this.nextButton = page
      .getByRole('link', { name: 'Next', exact: true })
      .or(page.getByRole('button', { name: 'Next', exact: true }));

    this.landingCard = page.getByRole('button').filter({
      hasText: /Select the focus for this observation|Select the focus/i,
    });

    this.domainButtons = page.getByRole('button', { name: /^Select domain /i });

    // NOTE: matched via accessible name (getByRole's `name` option), not
    // .filter({ hasText }) — confirmed on the real site that these prefixes
    // are only present in each button's aria-label (accessible name), not
    // its rendered text content (a bold element name), so hasText (which
    // checks textContent) silently matched nothing here. Also confirmed: Key
    // element buttons are labelled "Toggle element <name>", not "Key element
    // <name>" — the visible section heading says "Key elements" but the
    // buttons' own accessible names don't repeat that phrase.
    // Each pattern is scoped to this specific wording so it can never match
    // navigation buttons like Back, Continue or Clear session.
    this.subdomainButtons = page.getByRole('button', { name: /^Select subdomain /i });
    this.keyElementButtons = page.getByRole('button', { name: /^Toggle element /i });

    this.keyElementsHeading = page.getByRole('heading', { name: 'Key elements', level: 3 });
    this.elementsSelectedSummary = page.getByText(/\d+ elements? selected\.?/i);
  }

  /** Dismisses the optional landing card, if the current session shows one. */
  async dismissLandingCardIfPresent(): Promise<void> {
    if ((await this.landingCard.count()) > 0) {
      await this.landingCard.first().click();
    }
  }

  /** Selects the first available Domain button. */
  async selectFirstAvailableDomain(): Promise<void> {
    await this.selectFirstAvailableDomainAndGetName();
  }

  /**
   * Selects a Subdomain only if the just-selected Domain actually shows one.
   *
   * Some Domains present Subdomain options next; others skip straight to Key
   * elements. KLPT is client-rendered, so right after selecting a Domain,
   * neither of those two outcomes is guaranteed to have rendered yet — a
   * synchronous count() check here could race the app and produce a false
   * negative. Instead this races the two possible outcomes (the same pattern
   * used for the passkey gate and the welcome video in KlptHomePage), and only
   * clicks a Subdomain if that's the branch that actually appeared. See
   * {@link selectSubdomainIfAvailableAndGetName} for the underlying logic.
   */
  async selectSubdomainIfAvailable(): Promise<void> {
    await this.selectSubdomainIfAvailableAndGetName();
  }

  /**
   * Selects the first available Domain and returns its display name (the
   * card's rendered text, e.g. "Language and literacy") so callers can
   * verify it later — e.g. against the Review and download screen.
   */
  async selectFirstAvailableDomainAndGetName(): Promise<string> {
    await this.dismissLandingCardIfPresent();
    await expect(this.domainButtons.first()).toBeVisible({ timeout: 10_000 });
    const name = (await this.domainButtons.first().innerText()).trim();
    await this.domainButtons.first().click();
    return name;
  }

  /**
   * Selects a Subdomain only if the just-selected Domain shows one, returning
   * its display name, or `null` if this Domain skipped straight to Key
   * elements. See {@link selectSubdomainIfAvailable} for the race-condition
   * rationale.
   */
  async selectSubdomainIfAvailableAndGetName(): Promise<string | null> {
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

  /**
   * Selects the first available Key element and returns its display name
   * (e.g. "Words and sentences") for later verification.
   */
  async selectFirstAvailableKeyElementAndGetName(): Promise<string> {
    await expect(this.keyElementButtons.first()).toBeVisible({ timeout: 10_000 });
    const name = (await this.keyElementButtons.first().innerText()).trim();
    await this.keyElementButtons.first().click();
    return name;
  }

  /**
   * Selects a specific Domain by its exact accessible name (e.g. "Executive
   * function"), rather than always the first available one — used by
   * scenarios that must exercise one particular Domain (e.g. a per-Domain
   * end-to-end spec), so they don't depend on that Domain's position in the
   * list.
   */
  async selectDomainByName(name: string): Promise<void> {
    await this.dismissLandingCardIfPresent();
    const domainButton = this.page.getByRole('button', { name: `Select domain ${name}`, exact: true });
    await expect(domainButton).toBeVisible({ timeout: 10_000 });
    await domainButton.click();
  }

  /**
   * Selects every currently available Key element (rather than just the
   * first) — used by Domains with a fixed, required set of elements to
   * observe, e.g. Executive function's 3 Key elements. Returns each
   * selected element's display name, in the order shown, for later
   * verification.
   */
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
