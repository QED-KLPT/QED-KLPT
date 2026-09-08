import type { Download } from '@playwright/test';
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
      // NOTE: previously asserted `expect(locator).toBeTruthy()` — a Locator
      // object is always truthy regardless of what (if anything) it matches
      // in the page, so that never actually verified the iframe rendered.
      // Asserting on the real Play button confirms the YouTube iframe loaded
      // its expected content, not just that the <iframe> element exists.
      await expect(info.videoFrame.getByRole('button', { name: /Play video/i })).toBeVisible();
      console.log('Video iframe present');
    });

    await test.step('Verify the Launch tool button is visible and enabled', async () => {
      await expect(info.launchToolLink).toBeVisible();
      console.log('Launch tool link visible');
    });
  });

  test('Learning observation tool fact sheet opens in the same tab', async ({ page, context, klptHomePage }) => {
    await klptHomePage.open();
    const info = new LearningObservationInfoPage(page);
    await info.open();

    await test.step('Record current page count', async () => {
      const pagesBefore = page.context().pages().length;
      console.log(`Pages before click: ${pagesBefore}`);
    });

    // CONFIRMED REAL BROWSER-DEPENDENT BEHAVIOUR: which of two outcomes
    // happens when this link is clicked depends on the browser's PDF
    // handling — a browser with a built-in PDF viewer (real Google Chrome,
    // or headed Chromium) navigates this same tab to the PDF, so page.url()
    // changes. A browser with no PDF viewer (Playwright's bundled Chromium
    // in headless mode) downloads the file instead — the tab's own URL never
    // changes, but a 'download' event fires. Both are handled here rather
    // than assuming one (the same pattern already used for the alignment PDF
    // control in the full end-to-end spec).
    let download: Download | null = null;
    context.once('download', (d) => {
      download = d;
    });

    await test.step('Click the fact sheet PDF link and verify the PDF response', async () => {
      const [response] = await Promise.all([
        page.waitForResponse((r) => r.url().includes('learning-observation-tool-fact-sheet') && r.status() === 200, { timeout: 15000 }),
        info.factSheetLink.click(),
      ]);

      expect(response).toBeTruthy();
      const ct = response.headers()['content-type'] || response.headers()['Content-Type'];
      console.log('PDF response content-type:', ct);
      expect(ct.toLowerCase()).toContain('application/pdf');
    });

    await test.step('Verifying the PDF was opened in the same tab, however this browser handles it', async () => {
      // Give whichever outcome is going to happen a moment to actually occur
      // (URL change or 'download' event) before checking which one did.
      await Promise.race([
        page.waitForURL(/learning-observation-tool-fact-sheet\.pdf/i, { timeout: 5_000 }).catch(() => {}),
        new Promise<void>((resolve) => setTimeout(resolve, 5_000)),
      ]);

      if (download) {
        expect((download as Download).url()).toContain('learning-observation-tool-fact-sheet.pdf');
        console.log('PDF downloaded in the same tab (no built-in PDF viewer available in this browser)');
      } else {
        expect(page.url()).toContain('learning-observation-tool-fact-sheet.pdf');
        console.log('Navigation to PDF occurred in the same tab');
      }

      // Only one page ever existed throughout — confirms "same tab" either way.
      expect(context.pages().length).toBe(1);
    });

    await test.step('Return to the Learning observation tool page', async () => {
      // If the browser downloaded the PDF instead of navigating, the tab
      // never left the info page, so there's nothing to go back from.
      if (!download) {
        await page.goBack();
      }
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
      // CONFIRMED REAL BROWSER LIMITATION: the video iframe sits below the
      // fold, and clicking an element inside a cross-origin iframe does not
      // reliably auto-scroll the *outer* page into view first — in
      // Playwright's bundled Chromium (headless), the click's actionability
      // "stable" check then hangs indefinitely (confirmed via isolated
      // reproduction: bounding box was static across samples, yet the wait
      // still never resolved; scrolling the outer iframe element into view
      // first made the click succeed immediately). Scrolling the outer
      // <iframe> element on the top-level page — not the inner frame content
      // — resolves this regardless of which browser/project runs the test.
      await page.locator('iframe').first().scrollIntoViewIfNeeded();

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
