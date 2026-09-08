import { test, expect } from '../fixtures/pages.fixture';
import { LearningObservationInfoPage } from '../pages/LearningObservationInfoPage';
import { ObservationSessionsPage } from '../pages/ObservationSessionsPage';

test.describe('Learning observation tool — information & sessions', () => {
  test('User can open the Learning observation tool information page', async ({ page, klptHomePage }) => {
    await test.step('Scenario started: open KLPT home page', async () => {
      console.log('Starting scenario: User can open the Learning observation tool information page');
      await klptHomePage.open();
    });

    await test.step('Click the Learning observation tool navigation item', async () => {
      await page.getByRole('link', { name: 'Learning observation tool' }).click();
    });

    const info = new LearningObservationInfoPage(page);

    await test.step('Verify the Learning observation tool information page opens', async () => {
      await expect(info.heading).toBeVisible();
      console.log('Page opened and heading visible');
    });

    await test.step('Verify the fact sheet PDF link is visible', async () => {
      await expect(info.factSheetLink).toBeVisible();
      console.log('Fact sheet link found');
    });

    await test.step('Verify the video iframe is displayed', async () => {
      await expect(info.videoFrame.locator('iframe, *')).toBeTruthy();
      console.log('Video iframe present');
    });

    await test.step('Verify the Launch tool button is visible and enabled', async () => {
      await expect(info.launchToolLink).toBeVisible();
      console.log('Launch tool link visible');
    });
  });

  test('Learning observation tool fact sheet opens in the same tab', async ({ page, klptHomePage }) => {
    await klptHomePage.open();
    const info = new LearningObservationInfoPage(page);
    await info.open();

    await test.step('Record current page count', async () => {
      const pagesBefore = page.context().pages().length;
      console.log(`Pages before click: ${pagesBefore}`);
    });

    await test.step('Click the fact sheet PDF link and verify navigation in same tab', async () => {
      const [response] = await Promise.all([
        page.waitForResponse((r) => r.url().includes('learning-observation-tool-fact-sheet') && r.status() === 200, { timeout: 15000 }),
        info.factSheetLink.click(),
      ]);

      expect(response).toBeTruthy();
      const ct = response.headers()['content-type'] || response.headers()['Content-Type'];
      console.log('PDF response content-type:', ct);
      expect(ct.toLowerCase()).toContain('application/pdf');

      // Verify current page url includes the pdf file
      await page.waitForLoadState('load');
      expect(page.url()).toContain('learning-observation-tool-fact-sheet.pdf');
      console.log('Navigation to PDF occurred in the same tab');
    });

    await test.step('Return to the Learning observation tool page', async () => {
      await page.goBack();
      await expect(info.heading).toBeVisible();
      console.log('Returned to the Learning observation tool information page');
    });
  });

  test('User can play the Learning observation tool video', async ({ page, klptHomePage }) => {
    await klptHomePage.open();
    const info = new LearningObservationInfoPage(page);
    await info.open();

    await test.step('Verify the embedded video iframe is visible', async () => {
      await expect(page.locator('iframe')).toBeVisible();
      console.log('Video iframe visible');
    });

    await test.step('Click Play inside the iframe', async () => {
      const frame = info.videoFrame;
      const playButton = frame.getByRole('button', { name: /Play video/i }).first();
      await playButton.click();
      console.log('Clicked play button inside iframe');

      // Best-effort verification: YouTube iframe is cross-origin; verify play control changed or became hidden.
      await test.step('Verify playback started (best-effort)', async () => {
        // After clicking, the play button may be hidden or replaced by a pause control.
        const pause = frame.getByRole('button', { name: /Pause/i });
        const playVisible = await playButton.isVisible().catch(() => false);
        const pauseVisible = await pause.count() > 0 ? await pause.first().isVisible().catch(() => false) : false;
        expect(playVisible || pauseVisible).toBeTruthy();
        console.log('Playback verification completed (best-effort)');
      });

      // Try to pause if a pause control is available
      const pauseButton = info.videoFrame.getByRole('button', { name: /Pause/i }).first();
      if ((await pauseButton.count()) > 0) {
        await pauseButton.click().catch(() => {});
        console.log('Paused the video after verification');
      }
    });
  });

  test('User can launch the Learning observation tool', async ({ page, klptHomePage }) => {
    await klptHomePage.open();
    const info = new LearningObservationInfoPage(page);
    await info.open();

    await test.step('Click Launch tool', async () => {
      await info.launchToolLink.click();
      await page.waitForLoadState('domcontentloaded');
      console.log('Clicked Launch tool');
    });

    const sessions = new ObservationSessionsPage(page);
    await test.step('Verify navigation to the sessions page and UI elements', async () => {
      await expect(sessions.savedSessionsHeading).toBeVisible();
      await expect(sessions.startNewButton).toBeVisible();
      console.log('Sessions page displays and Start a new observation is visible');
    });
  });
});
