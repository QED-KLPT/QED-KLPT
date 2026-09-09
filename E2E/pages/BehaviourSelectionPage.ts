import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class BehaviourSelectionPage extends BasePage {
  /** Real page heading confirmed on the Behaviours screen: <h2>Select a behaviour for each element</h2>. */
  readonly heading: Locator;

  /**
   * One region per selected Key element, confirmed real accessible name
   * "<Key element> behaviours" (e.g. "Words and sentences behaviours").
   * Anchored to the end so it can't match unrelated regions elsewhere on the
   * page (e.g. "Contact us", "Acknowledgement").
   */
  readonly behaviourSections: Locator;

  /**
   * The actual selectable behaviour-level cards. Confirmed real accessible
   * name: "Select behaviour for <Key element>: <Level>", e.g. "Select
   * behaviour for Words and sentences: Single Words & Gestures". Anchored so
   * it can never match the carousel's "Show behaviours for "/"Previous
   * behaviour for "/"Next behaviour for " controls, or the plain "Select
   * <Level>" pagination shortcuts that sit alongside them.
   */
  readonly behaviourOptionButtons: Locator;

  readonly nextButton: Locator;

  /** Main "Clear session" action on this screen (opens the confirmation popup below). */
  readonly clearSessionButton: Locator;

  /**
   * "Start this session again?" confirmation popup shown after clicking the
   * main Clear session button above.
   *
   * NOTE: the popup's own confirm button has the *same* accessible name
   * ("Clear session") as the main trigger button behind it, so every locator
   * below is deliberately scoped under clearSessionDialog — never queried
   * directly on `page` — to avoid a strict-mode (2-element) collision, the
   * same pattern already used for Learner code / Passkey elsewhere in this project.
   */
  readonly clearSessionDialog: Locator;
  readonly clearSessionDialogHeading: Locator;
  readonly clearSessionDialogMessage: Locator;
  readonly clearSessionCancelButton: Locator;
  readonly clearSessionConfirmButton: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Select a behaviour for each element', level: 2 });
    this.behaviourSections = page.getByRole('region', { name: /behaviours$/i });
    this.behaviourOptionButtons = page.getByRole('button', { name: /^Select behaviour for /i });

    // NOTE: confirmed on the real site that "Next" renders as plain
    // (non-interactive) text while disabled, and as a role="link" once
    // enabled — the same pattern already confirmed on the Domains screen.
    // exact: true is required here: the behaviour carousel's own "Next
    // behaviour for <element>" control also has "Next" as a substring of its
    // accessible name, causing a strict-mode collision without it.
    this.nextButton = page
      .getByRole('link', { name: 'Next', exact: true })
      .or(page.getByRole('button', { name: 'Next', exact: true }));

    this.clearSessionButton = page.getByRole('button', { name: 'Clear session', exact: true });

    this.clearSessionDialog = page.getByRole('dialog').filter({ hasText: 'Start this session again?' });
    this.clearSessionDialogHeading = this.clearSessionDialog.getByRole('heading', {
      name: 'Start this session again?',
    });
    this.clearSessionDialogMessage = this.clearSessionDialog.getByText(
      'This will clear the current selections and notes for this session, then return you to the first screen.'
    );
    this.clearSessionCancelButton = this.clearSessionDialog.getByRole('button', { name: 'Cancel', exact: true });
    this.clearSessionConfirmButton = this.clearSessionDialog.getByRole('button', {
      name: 'Clear session',
      exact: true,
    });
  }

  /**
   * Selects the first available Behaviour option for the first Key element
   * shown, waiting for the Behaviours screen to actually be ready first.
   */
  async selectFirstAvailableBehaviour(): Promise<void> {
    await this.selectFirstAvailableBehaviourAndGetDescription();
  }

  /**
   * Selects the first available Behaviour option and returns its description
   * text (the card's rendered "What you observed" content, e.g. "Speaks
   * (communicates) using a very limited range of single words.\nMay gesture
   * instead of, or as well as, speaking.") — this text is confirmed to be
   * reproduced verbatim under "What you observed" on the Review and download
   * screen, so callers can use it to verify the selection later.
   */
  async selectFirstAvailableBehaviourAndGetDescription(): Promise<string> {
    await expect(this.heading).toBeVisible({ timeout: 10_000 });
    await expect(this.behaviourOptionButtons.first()).toBeVisible({ timeout: 10_000 });
    const description = (await this.behaviourOptionButtons.first().innerText()).trim();
    await this.behaviourOptionButtons.first().click();
    return description;
  }

  /** Clicks the main "Clear session" button and waits for the confirmation popup to appear. */
  async clickClearSession(): Promise<void> {
    await this.clearSessionButton.click();
    await expect(this.clearSessionDialog).toBeVisible();
  }

  /** Confirms "Clear session" inside the popup and waits for it to fully close. */
  async confirmClearSession(): Promise<void> {
    await this.clearSessionConfirmButton.click();
    await expect(this.clearSessionDialog).toBeHidden();
  }

  /**
   * Selects one Behaviour option in EVERY section (one per selected Key
   * element) at the given zero-based card index within each section (e.g.
   * index 1 selects the second card) — used by scenarios that must select a
   * specific, non-first card (e.g. the Executive function end-to-end spec,
   * which must avoid the first card in each section). Falls back to the
   * last available option in any section that has fewer than
   * `cardIndex + 1` cards, so a domain with only 1 or 2 behaviour levels
   * still gets a valid selection rather than an out-of-range click. Returns
   * each selected option's description text, in section order, for later
   * verification.
   */
  async selectBehaviourInEachSectionAndGetDescriptions(cardIndex: number): Promise<string[]> {
    await expect(this.heading).toBeVisible({ timeout: 10_000 });
    await expect(this.behaviourSections.first()).toBeVisible({ timeout: 10_000 });

    const sectionCount = await this.behaviourSections.count();
    const descriptions: string[] = [];

    for (let i = 0; i < sectionCount; i++) {
      const options = this.behaviourSections.nth(i).getByRole('button', { name: /^Select behaviour for /i });
      const optionCount = await options.count();
      const option = options.nth(Math.min(cardIndex, optionCount - 1));
      await expect(option).toBeVisible({ timeout: 10_000 });
      descriptions.push((await option.innerText()).trim());
      await option.click();
    }

    return descriptions;
  }
}
