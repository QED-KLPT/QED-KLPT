import { Page, Locator, Response, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { KLPT_PASSKEY } from '../test-data/klpt.constants';

export class KlptHomePage extends BasePage {
  readonly heading: Locator;
  readonly passkeyInput: Locator;
  readonly submitPasskeyButton: Locator;

  /** "Acknowledgement of Country" video modal shown the first time a visitor reaches the home page. */
  readonly welcomeVideoDialog: Locator;
  readonly continueButton: Locator;

  /** Not every render shows this — click it only if present. */
  readonly playButton: Locator;

  constructor(page: Page) {
    super(page);

    this.heading = page.getByRole('heading', {
      name: 'Kindergarten Learning Progression Toolkit',
      level: 1,
    });

    // getByLabel also matches the "Show passkey" toggle button, so use the role instead.
    this.passkeyInput = page.getByRole('textbox', { name: 'Passkey', exact: true });
    this.submitPasskeyButton = page.getByRole('button', { name: 'Access site' });

    this.welcomeVideoDialog = page.getByRole('dialog').filter({ hasText: 'Acknowledgement of Country' });
    this.continueButton = this.welcomeVideoDialog.getByRole('button', { name: 'Continue', exact: true });
    this.playButton = this.welcomeVideoDialog.getByRole('button', { name: /play/i });
  }

  async open(): Promise<Response | null> {
    const response = await this.goto('/');
    await this.ensureKlptAccess();
    await this.handleVideoPopupIfDisplayed();
    return response;
  }

  async ensureKlptAccess(passkey: string = KLPT_PASSKEY): Promise<void> {
    console.log('Checking for the passkey screen');

    // The app is client-rendered, so right after navigation neither the passkey
    // form nor the home page has necessarily rendered yet — race both instead
    // of a single isVisible() check.
    const passkeyScreenVisible = await Promise.race([
      this.passkeyInput.waitFor({ state: 'visible', timeout: 15_000 }).then(() => true).catch(() => false),
      this.heading.waitFor({ state: 'visible', timeout: 15_000 }).then(() => false).catch(() => false),
    ]);

    if (passkeyScreenVisible) {
      console.log('Passkey screen detected');
      console.log('Submitting the standard KLPT passkey');
      await this.passkeyInput.fill(passkey);
      await this.submitPasskeyButton.click();
    } else {
      console.log('Passkey screen not displayed — continuing with the existing active session');
    }

    await expect(this.heading).toBeVisible({ timeout: 15_000 });

    if (passkeyScreenVisible) {
      console.log('KLPT access granted');
    }
    console.log('KLPT home page displayed');
  }

  async isWelcomeVideoDisplayed(): Promise<boolean> {
    return this.welcomeVideoDialog.isVisible();
  }

  async closeWelcomeVideo(): Promise<void> {
    await this.continueButton.click();
    await expect(this.welcomeVideoDialog).toBeHidden();
  }

  /** Only appears on a genuine first visit — a repeat run in the same browser context skips straight to the home page. */
  async handleVideoPopupIfDisplayed(): Promise<void> {
    console.log('Checking for the welcome video popup');

    const videoPopupVisible = await Promise.race([
      this.welcomeVideoDialog.waitFor({ state: 'visible', timeout: 5_000 }).then(() => true).catch(() => false),
      this.heading.waitFor({ state: 'visible', timeout: 5_000 }).then(() => false).catch(() => false),
    ]);

    if (videoPopupVisible) {
      console.log('Welcome video popup displayed');
      await expect(this.welcomeVideoDialog).toBeVisible();

      if (await this.playButton.isVisible()) {
        console.log('Clicking the Play button');
        await this.playButton.click();
      }

      await expect(this.continueButton).toBeVisible();
      await expect(this.continueButton).toBeEnabled();
      console.log('Clicking the Continue button');
      await this.closeWelcomeVideo();
    } else {
      console.log('Welcome video popup not displayed — already viewed in this browser session');
    }

    await expect(this.heading).toBeVisible({ timeout: 15_000 });
    console.log('KLPT home page displayed');
  }
}
