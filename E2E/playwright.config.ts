import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// quiet: true suppresses dotenv's promotional console output.
dotenv.config({ path: path.resolve(__dirname, '.env'), quiet: true });

const ARTIFACTS_DIR = path.resolve(__dirname, 'artifacts');

// Overridable via KLPT_BASE_URL in .env, to point the suite at a different KLPT environment.
const KLPT_TEST_URL = 'https://kind-moss-02a151300-test.eastasia.7.azurestaticapps.net/';

export default defineConfig({
  testDir: './tests',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },

  use: {
    headless: true,
    baseURL: process.env.KLPT_BASE_URL || KLPT_TEST_URL,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: 'retain-on-failure',

    actionTimeout: 10_000,
    // With several workers hitting the first page load at once locally, the
    // very first navigation can occasionally need more than 15s purely from
    // that contention — bumped to 20s to absorb it.
    navigationTimeout: 20_000,
  },

  outputDir: path.join(ARTIFACTS_DIR, 'test-results'),

  reporter: [
    ['html', { outputFolder: path.join(ARTIFACTS_DIR, 'html-report'), open: 'never' }],
    ['list'],
  ],

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // Runs against the real, installed Google Chrome instead of Playwright's bundled Chromium.
    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

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
