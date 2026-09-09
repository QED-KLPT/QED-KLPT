import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class BehaviourSelectionPage extends BasePage {
  readonly heading: Locator;
  readonly behaviourSections: Locator;
  readonly behaviourOptionButtons: Locator;
  readonly nextButton: Locator;
  readonly clearSessionButton: Locator;

  // Everything below is scoped under clearSessionDialog — the popup's confirm
  // button shares its accessible name with the button that opens it.
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

    // exact: true avoids matching the carousel's "Next behaviour for <element>" control.
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

  async selectFirstAvailableBehaviour(): Promise<void> {
    await this.selectFirstAvailableBehaviourAndGetDescription();
  }

  /** Returns the "What you observed" text, reproduced verbatim on the Review screen. */
  async selectFirstAvailableBehaviourAndGetDescription(): Promise<string> {
    await expect(this.heading).toBeVisible({ timeout: 10_000 });
    await expect(this.behaviourOptionButtons.first()).toBeVisible({ timeout: 10_000 });
    const description = (await this.behaviourOptionButtons.first().innerText()).trim();
    await this.behaviourOptionButtons.first().click();
    return description;
  }

  async clickClearSession(): Promise<void> {
    await this.clearSessionButton.click();
    await expect(this.clearSessionDialog).toBeVisible();
  }

  async confirmClearSession(): Promise<void> {
    await this.clearSessionConfirmButton.click();
    await expect(this.clearSessionDialog).toBeHidden();
  }

  /** Selects the card at cardIndex (e.g. 1 for the second) in every section, falling back to the last card if a section has fewer. */
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
