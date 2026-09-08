import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ObservationSessionsPage extends BasePage {
  readonly startNewButton: Locator;
  readonly learnerCodeInput: Locator;
  readonly observerNameInput: Locator;
  readonly createButton: Locator;
  readonly cancelButton: Locator;
  readonly savedSessionsHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.startNewButton = page.getByRole('button').filter({ hasText: /Start a new observation/i }).first();
    // Use the placeholder to avoid collision with the help button which has an
    // aria-label containing the same text (strict-mode collisions). The input
    // also has id="learner-code" and placeholder "e.g. 123".
    this.learnerCodeInput = page.getByPlaceholder('e.g. 123');
    this.observerNameInput = page.getByLabel("Observer's name");
    this.createButton = page.getByRole('button', { name: /Create session/i });
    this.cancelButton = page.getByRole('button', { name: /Cancel/i });
    this.savedSessionsHeading = page.getByRole('heading', { name: /Saved sessions/i });
  }

  async open(): Promise<void> {
    await this.goto('/learning-observation-tool/sessions');
    await this.savedSessionsHeading.waitFor({ state: 'visible', timeout: 10000 });
  }

  async startNew(): Promise<void> {
    await this.startNewButton.click();
    await expect(this.learnerCodeInput).toBeVisible();
    await expect(this.observerNameInput).toBeVisible();
  }

  async cancelNew(): Promise<void> {
    await this.cancelButton.click();
    await expect(this.learnerCodeInput).toBeHidden();
    await expect(this.createButton).toBeHidden();
  }

  async createSession(learnerCode: string, observerName: string): Promise<void> {
    await this.learnerCodeInput.fill(learnerCode);
    await this.observerNameInput.fill(observerName);
    await this.createButton.click();
  }
}
