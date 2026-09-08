import { Page, Locator, Response, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { KLPT_PASSKEY } from '../test-data/klpt.constants';

/**
 * Page Object for the KLPT home page, covering:
 *  - the passkey ("Site access") gate KLPT shows on first visit, and again once
 *    the ~1 hour access window expires, and
 *  - the "Acknowledgement of Country" welcome video modal shown the first time
 *    a visitor reaches the home page in a browser context.
 *
 * All locators below were captured by inspecting the real KLPT Test environment
 * (https://kind-moss-02a151300-test.eastasia.7.azurestaticapps.net/) with
 * Playwright — none are guessed placeholders.
 */
export class KlptHomePage extends BasePage {
  /** Real home page heading: <h1>Kindergarten Learning Progression Toolkit</h1>. */
  readonly heading: Locator;

  /** "Site access" passkey gate: a labelled password field + "Access site" submit button. */
  readonly passkeyInput: Locator;
  readonly submitPasskeyButton: Locator;

  /**
   * "Acknowledgement of Country" welcome video modal — a role="dialog" panel
   * containing a YouTube embed and a "Continue" button. Shown the first time a
   * visitor reaches the home page in a given browser context.
   */
  readonly welcomeVideoDialog: Locator;
  readonly continueButton: Locator;

  /**
   * Optional "Play" control on the video thumbnail. Some renders of the dialog
   * require it to start playback, others don't show it at all — it is handled
   * as optional (see {@link handleVideoPopupIfDisplayed}), never assumed present.
   */
  readonly playButton: Locator;

  constructor(page: Page) {
    super(page);

    this.heading = page.getByRole('heading', {
      name: 'Kindergarten Learning Progression Toolkit',
      level: 1,
    });

    // NOTE: getByLabel('Passkey') is deliberately avoided here — it does a
    // case-insensitive substring match by default, which also matches the
    // adjacent "Show passkey" visibility-toggle button's aria-label, causing a
    // strict-mode (2-element) collision. getByRole('textbox', ...) targets the
    // real input unambiguously (confirmed: exactly 1 match).
    this.passkeyInput = page.getByRole('textbox', { name: 'Passkey', exact: true });
    this.submitPasskeyButton = page.getByRole('button', { name: 'Access site' });

    this.welcomeVideoDialog = page.getByRole('dialog').filter({ hasText: 'Acknowledgement of Country' });
    this.continueButton = this.welcomeVideoDialog.getByRole('button', { name: 'Continue', exact: true });
    this.playButton = this.welcomeVideoDialog.getByRole('button', { name: /play/i });
  }

  /**
   * Navigate to the KLPT home page and ensure access is granted, handling the
   * passkey gate automatically via {@link ensureKlptAccess} if it appears.
   */
  async open(): Promise<Response | null> {
    const response = await this.goto('/');
    await this.ensureKlptAccess();

    // Handles the first-visit welcome video, if shown — see method doc for why
    // this must be a race rather than a synchronous visibility check.
    await this.handleVideoPopupIfDisplayed();

    return response;
  }

  /**
   * Handles the KLPT passkey ("Site access") gate:
   *  - if the passkey field is visible, enters the shared KLPT passkey and submits it
   *  - if it is not visible, access is already active — continues without re-entering it
   *
   * Reuse this (or call {@link open}, which calls it internally) after any
   * navigation that could land on the home page, including page reloads, so the
   * automation can recover automatically if the ~1 hour access window has
   * expired mid-run. Never logs the passkey value itself.
   */
  async ensureKlptAccess(passkey: string = KLPT_PASSKEY): Promise<void> {
    console.log('Checking for the passkey screen');

    // KLPT is a client-rendered (Angular) app: right after navigation, neither the
    // passkey form nor the home page content has necessarily rendered yet, so a
    // synchronous isVisible() check can race the app and produce a false negative.
    // Instead, wait for whichever of the two actually appears first — this is a
    // conditional, event-driven wait (not a fixed sleep like waitForTimeout).
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

    // Whichever path was taken, wait for a real, meaningful home-page element
    // before proceeding. This also confirms the passkey (if entered) was accepted.
    await expect(this.heading).toBeVisible({ timeout: 15_000 });

    if (passkeyScreenVisible) {
      console.log('KLPT access granted');
    }
    console.log('KLPT home page displayed');
  }

  /** Whether the first-visit "Acknowledgement of Country" welcome video modal is currently shown. */
  async isWelcomeVideoDisplayed(): Promise<boolean> {
    return this.welcomeVideoDialog.isVisible();
  }

  /** Dismisses the welcome video modal via its "Continue" button and waits for it to fully close. */
  async closeWelcomeVideo(): Promise<void> {
    await this.continueButton.click();
    await expect(this.welcomeVideoDialog).toBeHidden();
  }

  /**
   * Treats the first-visit welcome video modal as optional and handles it if shown:
   *  - On a genuine first visit in this browser context, the modal appears after
   *    the passkey step.
   *  - On a repeat run in the same context (e.g. re-running a test immediately),
   *    KLPT remembers it was already viewed and navigates straight to the home
   *    page, with no modal at all.
   *
   * KLPT is a client-rendered (Angular) app, so right after the passkey step
   * neither the modal nor the home page content is guaranteed to have rendered
   * yet — a synchronous isVisible() check here could race the app and produce a
   * false negative. Instead, this races the two possible outcomes, the same
   * pattern used in {@link ensureKlptAccess}.
   */
  async handleVideoPopupIfDisplayed(): Promise<void> {
    console.log('Checking for the welcome video popup');

    const videoPopupVisible = await Promise.race([
      this.welcomeVideoDialog.waitFor({ state: 'visible', timeout: 5_000 }).then(() => true).catch(() => false),
      this.heading.waitFor({ state: 'visible', timeout: 5_000 }).then(() => false).catch(() => false),
    ]);

    if (videoPopupVisible) {
      console.log('Welcome video popup displayed');
      await expect(this.welcomeVideoDialog).toBeVisible();

      // The play control is optional — some renders require it to start
      // playback, others don't show it. Click it only if present, rather than
      // assuming it's always there.
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
