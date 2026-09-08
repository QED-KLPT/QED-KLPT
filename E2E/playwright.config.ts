import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env, if present (optional — see KLPT_TEST_URL below).
// `quiet: true` suppresses dotenv's console "tips" output (including promotional
// messages for third-party services) so test output stays clean and predictable.
dotenv.config({ path: path.resolve(__dirname, '.env'), quiet: true });

/**
 * Central place where all "where do artifacts live" paths are defined,
 * so the folder structure described in the README stays in sync with reality.
 */
const ARTIFACTS_DIR = path.resolve(__dirname, 'artifacts');

/**
 * KLPT Test environment base URL, defined centrally here per project decision
 * (this suite currently targets a single KLPT Test environment). Can still be
 * overridden via KLPT_BASE_URL in a local .env file, e.g. to point the suite
 * at a different KLPT environment without editing this file.
 */
const KLPT_TEST_URL = 'https://kind-moss-02a151300-test.eastasia.7.azurestaticapps.net/';

export default defineConfig({
  testDir: './tests',

  // Fail the build on CI if someone accidentally leaves test.only in the source.
  forbidOnly: !!process.env.CI,

  // Sensible retry policy: no retries locally, a couple of retries on CI to absorb flakiness.
  retries: process.env.CI ? 2 : 0,

  // Reasonable local parallelism; CI runners often only get 1 worker unless configured otherwise.
  workers: process.env.CI ? 1 : undefined,

  // Sensible default timeouts.
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },

  // Headless by default, per project requirements.
  use: {
    headless: true,

    // Base URL for the app under test: defaults to the KLPT Test environment
    // defined above, overridable via KLPT_BASE_URL in .env.
    baseURL: process.env.KLPT_BASE_URL || KLPT_TEST_URL,

    // Screenshot only on failure.
    screenshot: 'only-on-failure',

    // Trace only on first retry (useful for diagnosing flaky failures without bloating storage).
    trace: 'on-first-retry',

    // Video only on failure.
    video: 'retain-on-failure',

    actionTimeout: 10_000,
    navigationTimeout: 15_000,
  },

  // Where Playwright writes traces/screenshots/videos collected during a run.
  outputDir: path.join(ARTIFACTS_DIR, 'test-results'),

  reporter: [
    ['html', { outputFolder: path.join(ARTIFACTS_DIR, 'html-report'), open: 'never' }],
    ['list'],
  ],

  // Cross-browser desktop projects, plus tablet projects (latest iPad and Android tablet)
  // for responsive/touch coverage.
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // Tablets — iPad (gen 11) is the latest standard iPad; iPad Pro 11 covers the
    // larger Pro form factor; Galaxy Tab S9 covers the latest Android tablet.
    {
      name: 'iPad',
      use: { ...devices['iPad (gen 11)'] },
    },

    {
      name: 'iPad Pro',
      use: { ...devices['iPad Pro 11'] },
    },

    {
      name: 'Galaxy Tab S9',
      use: { ...devices['Galaxy Tab S9'] },
    },
  ],
});
