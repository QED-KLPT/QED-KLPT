# Kindergarten Learning Progression Toolkit

End-to-end test automation for **KLPT** (Kindergarten Learning Progression Toolkit), built with [Playwright Test](https://playwright.dev/), TypeScript, and the Page Object Model.

This suite targets the real **KLPT Test environment**:
`https://kind-moss-02a151300-test.eastasia.7.azurestaticapps.net/`

## Prerequisites

- [Node.js](https://nodejs.org/) 18+ (verified with v22 at setup time) and npm
- Git (only needed if you plan to put this project under version control)
- Visual Studio Code (recommended — install the [Playwright Test for VSCode](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) extension for inline test running/debugging)

Check what you have installed:

```bash
node --version
npm --version
git --version
```

## Installation

From the project root:

```bash
npm install
npx playwright install chromium
```

`npx playwright install chromium` downloads the Chromium browser binary Playwright drives. Re-run it whenever `@playwright/test` is upgraded to a version that bundles a newer browser.

## Environment setup

A local `.env` file is **optional** for this project.

The suite targets the KLPT Test environment by default — the URL is defined centrally as `KLPT_TEST_URL` in [playwright.config.ts](playwright.config.ts). Create a `.env` (copy `.env.example`) only if you need to point the suite at a **different** KLPT environment:

```bash
cp .env.example .env
```

(PowerShell: `Copy-Item .env.example .env`)

| Variable         | Required | Description                                                        |
|------------------|----------|---------------------------------------------------------------------|
| `KLPT_BASE_URL`  | No       | Overrides the default KLPT Test URL hardcoded in `playwright.config.ts` |

`.env` is listed in `.gitignore` and must never be committed. `.env.example` contains placeholder values only and is safe to commit.

### About the KLPT passkey

KLPT is gated behind a **passkey ("Site access") screen** the first time a browser context visits it, and again after the access window (~1 hour) expires. This passkey is a **standard, shared value used by everyone** accessing the KLPT Test environment — not a per-user secret — so, per the project owner's explicit direction, it is defined **once** as a plain constant in [test-data/klpt.constants.ts](test-data/klpt.constants.ts) rather than sourced from `.env`:

```ts
export const KLPT_PASSKEY = 'klpt';
```

Every Page Object and test imports this single constant — it is never duplicated elsewhere. See [Security guidance](#security-guidance-for-credentials) below for what this trade-off means in practice.

## How KLPT access is handled automatically

`KlptHomePage.open()` (in [pages/KlptHomePage.ts](pages/KlptHomePage.ts)) navigates to the home page and then calls `ensureKlptAccess()`, which:

1. Checks whether the passkey field is visible (`isVisible()` — an immediate check, no fixed wait).
2. If visible, fills in the shared `KLPT_PASSKEY` and submits it.
3. If not visible, an active session already exists — continues without re-entering it.
4. Either way, waits for the real home-page heading to appear before proceeding (an auto-retrying assertion, not a fixed wait) — this is what lets the suite recover automatically if the ~1 hour access window has expired mid-run.

Call `ensureKlptAccess()` again (it's public) after any other navigation that could land back on the home page — e.g. after `page.reload()` — so the same recovery applies there too. This logic lives entirely inside the Page Object; tests never duplicate it.

## Running tests

```bash
npm test
```

Runs the full suite headlessly against Chromium (the only configured project right now).

### Headed mode

```bash
npm run test:headed
```

Runs the same suite with a visible browser window — useful for watching the passkey and home-page flow.

### UI mode

```bash
npm run test:ui
```

Opens Playwright's interactive UI mode: a timeline of each test, pick-and-run individual tests, time-travel through steps, and inspect DOM snapshots.

### Debug mode

```bash
npm run test:debug
```

Runs tests with the Playwright Inspector attached, so you can step through actions, set breakpoints, and inspect locators live.

### Chromium only

```bash
npm run test:chromium
```

Equivalent to `npm test` today (Chromium is the only project), but keeps the same script name stable once Firefox/WebKit projects are added (see below).

## Viewing the HTML report

```bash
npm run test:report
```

Opens the most recent HTML report from `artifacts/html-report`. The report is also generated automatically after every `npm test` run (the `list` reporter is enabled alongside it, so progress and pass/fail is also visible directly in the terminal).

## Using Playwright Codegen

```bash
npm run codegen
```

Launches Playwright's code generator against the configured KLPT base URL, recording your clicks/inputs as Playwright locator code you can paste into a Page Object or spec.

## Project structure

```
.
├── tests/                  # Test specs (*.spec.ts)
│   ├── klpt-home.smoke.spec.ts       # Smoke test: home page loads, real heading visible
│   └── klpt-welcome-video.spec.ts    # First-time-visitor welcome video popup scenario
├── pages/                  # Page Object classes (BasePage, KlptHomePage, ...)
├── fixtures/               # Reusable Playwright fixtures (wire Page Objects into tests)
├── utils/                  # Reusable helpers (codegen launcher, ...)
├── test-data/              # Static test data + centrally defined constants (KLPT_PASSKEY)
├── artifacts/              # Generated at test-run time — reports, screenshots, videos, traces
│   ├── html-report/
│   ├── screenshots/
│   ├── videos/
│   └── test-results/       # Raw per-test output (traces, retained screenshots/videos)
├── .env.example            # Optional override placeholder — safe to commit
├── .env                    # Optional local override — created locally, never committed
├── playwright.config.ts    # Playwright configuration (incl. the KLPT Test URL)
├── tsconfig.json           # TypeScript configuration
└── package.json
```

### Adding Page Objects

Extend `BasePage` (in `pages/BasePage.ts`) for any new page, following the pattern in `pages/KlptHomePage.ts`. Register the new Page Object as a fixture in `fixtures/pages.fixture.ts` so specs can consume it via dependency injection (e.g. `async ({ klptHomePage }) => {...}`).

### Locator strategy

Use stable, user-facing locators:

- `page.getByRole(...)`
- `page.getByLabel(...)`
- `page.getByText(...)`
- `page.getByTestId(...)` (requires `data-testid` attributes in the app)

Avoid XPath and avoid fixed waits like `page.waitForTimeout(...)`. Prefer Playwright's built-in auto-waiting assertions (`expect(locator).toBeVisible()`, etc.) or explicit `waitForLoadState`/`waitForResponse` calls tied to a real condition. All locators currently in this project were captured by inspecting the real KLPT Test environment with Playwright — none are guessed.

## Extending to Firefox and WebKit

`playwright.config.ts` already has commented-out `firefox` and `webkit` projects. To enable cross-browser testing, uncomment them:

```ts
projects: [
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  { name: 'webkit', use: { ...devices['Desktop Safari'] } },
],
```

Then install the extra browsers:

```bash
npx playwright install firefox webkit
```

## Security guidance for credentials

- **Never** hard-code a per-user secret (a real username/password, a personal API key, etc.) in test code, Page Objects, or test data files.
- The one exception in this project is `KLPT_PASSKEY` — a standard passkey shared by everyone who accesses the KLPT Test environment, not a per-user credential. The project owner explicitly approved hardcoding it, on the condition it is defined exactly once, in [test-data/klpt.constants.ts](test-data/klpt.constants.ts), and imported everywhere else it's needed rather than repeated.
- No test in this project prints the passkey value to the terminal or embeds it in a report/step title. Screenshots can't expose it either, since the real field is a native `type="password"` input (masked). One residual, low-risk gap: if a test is ever retried under `trace: 'on-first-retry'`, the recorded trace could include the literal value passed to `.fill()` in its action log — acceptable here only because the value itself is non-sensitive by the project owner's own classification.
- If the shared passkey is ever rotated to something more sensitive, revert to reading it from `.env` (excluded via `.gitignore`) instead of a committed constant.
- `.env` is excluded via `.gitignore` — verify `git status` never shows it as a tracked/staged file. Only commit `.env.example`.
- Prefer short-lived or test-only credentials for automation where possible, and store any real secrets for CI in your CI provider's secret manager, not in the repository.
