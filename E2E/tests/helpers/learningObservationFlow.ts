import { test, expect, type Page } from '@playwright/test';
import type { KlptHomePage } from '../../pages/KlptHomePage';
import { ObservationSessionsPage } from '../../pages/ObservationSessionsPage';
import { DomainSelectionPage } from '../../pages/DomainSelectionPage';
import { BehaviourSelectionPage } from '../../pages/BehaviourSelectionPage';
import { LearningStatementPage } from '../../pages/LearningStatementPage';
import { randomLearnerCode, type LearningStatementText } from '../../test-data/learningObservation.data';

/**
 * Shared observation-session flow, reused across every learning-observation
 * spec file (including the per-Domain end-to-end scenarios under
 * tests/learning-observation-tool/) so the session-creation and
 * step-navigation workflow is defined once, not duplicated per test file.
 * Each function wraps itself in a test.step() so the execution order is
 * visible in the report regardless of which spec calls it. Later helpers
 * build on earlier ones (reachReviewScreen -> reachStatementScreen ->
 * reachBehaviourScreen -> createNewSession) so the selection logic itself is
 * defined exactly once.
 */

/**
 * Creates a new observation session and returns the learner code used, for
 * specs that need to assert on it later. `observerName` defaults to
 * 'Playwright Tester' to preserve existing callers' behaviour — pass an
 * explicit value (e.g. a randomly generated name) when the spec needs to
 * verify the Observer name later, such as on the Review and download screen.
 */
export async function createNewSession(
  page: Page,
  klptHomePage: KlptHomePage,
  observerName: string = 'Playwright Tester'
): Promise<{ learnerCode: string }> {
  return test.step('Creating a new observation session', async () => {
    await klptHomePage.open();
    const sessions = new ObservationSessionsPage(page);
    await sessions.open();
    await sessions.startNew();
    const learnerCode = randomLearnerCode();
    await sessions.createSession(learnerCode, observerName);
    return { learnerCode };
  });
}

/**
 * Options controlling how {@link selectDomainSubdomainAndKeyElements} (and
 * every helper built on it) picks its Domain and Key element(s). Omit
 * entirely to keep the original default behaviour (first available Domain,
 * first available Key element only) that every existing spec relies on.
 */
export interface DomainSelectionOptions {
  /**
   * Selects this specific Domain by its exact accessible name (e.g.
   * "Executive function"), instead of always the first available one — used
   * by scenarios that must exercise one particular Domain regardless of its
   * position in the list.
   */
  domainName?: string;
  /**
   * Selects every available Key element instead of just the first — used by
   * Domains with a fixed, required set of elements to observe (e.g.
   * Executive function's 3 Key elements).
   */
  selectAllKeyElements?: boolean;
}

/**
 * Selects a Domain, then a Subdomain only if the chosen Domain actually shows
 * one, then one or every Key element (per `options`) — capturing each
 * selected display name along the way, for specs that need to verify them
 * later (e.g. on the Review and download screen). Does NOT click Next —
 * callers decide when to advance, since some tests (e.g. Key-element card
 * coverage) need to interact with the Key elements step itself before moving
 * on.
 */
export async function selectDomainSubdomainAndKeyElements(
  page: Page,
  options: DomainSelectionOptions = {}
): Promise<{
  domainPage: DomainSelectionPage;
  domainName: string;
  subdomainName: string | null;
  keyElementNames: string[];
}> {
  return test.step('Selecting a Domain, Subdomain (if available) and Key element(s)', async () => {
    const domainPage = new DomainSelectionPage(page);

    let domainName: string;
    if (options.domainName) {
      await domainPage.selectDomainByName(options.domainName);
      domainName = options.domainName;
    } else {
      domainName = await domainPage.selectFirstAvailableDomainAndGetName();
    }

    const subdomainName = await domainPage.selectSubdomainIfAvailableAndGetName();

    const keyElementNames = options.selectAllKeyElements
      ? await domainPage.selectAllAvailableKeyElementsAndGetNames()
      : [await domainPage.selectFirstAvailableKeyElementAndGetName()];

    return { domainPage, domainName, subdomainName, keyElementNames };
  });
}

/**
 * Creates a session and advances all the way to the Behaviours screen,
 * capturing every selected value along the way. `domainOptions` defaults to
 * the original behaviour (first available Domain, first Key element only).
 */
export async function reachBehaviourScreen(
  page: Page,
  klptHomePage: KlptHomePage,
  observerName: string = 'Playwright Tester',
  domainOptions: DomainSelectionOptions = {}
): Promise<{
  learnerCode: string;
  domainPage: DomainSelectionPage;
  domainName: string;
  subdomainName: string | null;
  keyElementNames: string[];
}> {
  const { learnerCode } = await createNewSession(page, klptHomePage, observerName);
  const { domainPage, domainName, subdomainName, keyElementNames } = await selectDomainSubdomainAndKeyElements(
    page,
    domainOptions
  );
  await domainPage.nextButton.click();
  return { learnerCode, domainPage, domainName, subdomainName, keyElementNames };
}

/**
 * Creates a session, advances through Behaviours (selecting one card per Key
 * element, at `behaviourCardIndex` — default 0, the first), and lands on the
 * Learning progression statement screen, capturing every selected value
 * along the way. `domainOptions`/`behaviourCardIndex` default to the
 * original single-Key-element, first-card behaviour that every existing spec
 * relies on.
 */
export async function reachStatementScreen(
  page: Page,
  klptHomePage: KlptHomePage,
  observerName: string = 'Playwright Tester',
  domainOptions: DomainSelectionOptions = {},
  behaviourCardIndex: number = 0
): Promise<{
  learnerCode: string;
  domainPage: DomainSelectionPage;
  behaviourPage: BehaviourSelectionPage;
  domainName: string;
  subdomainName: string | null;
  keyElementNames: string[];
  behaviourDescriptions: string[];
}> {
  const { learnerCode, domainPage, domainName, subdomainName, keyElementNames } = await reachBehaviourScreen(
    page,
    klptHomePage,
    observerName,
    domainOptions
  );
  const behaviourPage = new BehaviourSelectionPage(page);

  const behaviourDescriptions = await test.step(
    'Selecting a Behaviour for each Key element and advancing to the Learning progression statement screen',
    async () => {
      const descriptions = await behaviourPage.selectBehaviourInEachSectionAndGetDescriptions(behaviourCardIndex);
      await expect(behaviourPage.nextButton).toBeVisible();
      await behaviourPage.nextButton.click();
      return descriptions;
    }
  );

  return { learnerCode, domainPage, behaviourPage, domainName, subdomainName, keyElementNames, behaviourDescriptions };
}

/**
 * Creates a session, fills the minimum required Learning statement field
 * (Description), and advances to the Review and download screen — for specs
 * that only need to reach Review and download without asserting on the
 * intermediate selections themselves.
 */
export async function reachReviewScreen(
  page: Page,
  klptHomePage: KlptHomePage,
  observerName: string = 'Playwright Tester'
): Promise<{ learnerCode: string }> {
  const { learnerCode } = await reachStatementScreen(page, klptHomePage, observerName);
  const statementPage = new LearningStatementPage(page);

  await test.step('Filling the required Description field and advancing to the Review and download screen', async () => {
    await statementPage.descriptionInput.fill('Automated test observation context.');
    await expect(statementPage.nextButton).toBeVisible();
    await statementPage.nextButton.click();
  });

  return { learnerCode };
}

/**
 * Every value selected while walking through Domains/Behaviours, captured
 * for later verification (e.g. on the Review and download screen).
 * `keyElementNames`/`behaviourDescriptions` are arrays so the same shape
 * covers both a single-Key-element Domain (a 1-item array) and a
 * multi-Key-element Domain (e.g. Executive function's 3).
 */
export interface ObservationSelections {
  learnerCode: string;
  observerName: string;
  domainName: string;
  subdomainName: string | null;
  keyElementNames: string[];
  behaviourDescriptions: string[];
}

/**
 * Creates a session with the given Observer name and advances to the
 * Learning progression statement screen, returning every value selected
 * along the way (Learner code, Observer name, Domain, Subdomain, Key
 * element(s) and Behaviour(s)) — for specs that need to verify them later,
 * most importantly a full end-to-end scenario checking the Review and
 * download screen.
 */
export async function reachStatementScreenWithSelections(
  page: Page,
  klptHomePage: KlptHomePage,
  observerName: string,
  domainOptions: DomainSelectionOptions = {},
  behaviourCardIndex: number = 0
): Promise<ObservationSelections> {
  const { learnerCode, domainName, subdomainName, keyElementNames, behaviourDescriptions } = await reachStatementScreen(
    page,
    klptHomePage,
    observerName,
    domainOptions,
    behaviourCardIndex
  );

  return { learnerCode, observerName, domainName, subdomainName, keyElementNames, behaviourDescriptions };
}

/**
 * Fills every Learning statement field with the given text and verifies each
 * value was accepted — shared by every per-Domain end-to-end scenario spec so
 * the fill-and-verify pattern is defined exactly once.
 */
export async function fillLearningStatementFields(
  statementPage: LearningStatementPage,
  text: LearningStatementText
): Promise<void> {
  await statementPage.descriptionInput.fill(text.description);
  await statementPage.professionalReflectionInput.fill(text.professionalReflection);
  await statementPage.supportLearningInput.fill(text.supportLearning);
  await statementPage.qklgReflectionInput.fill(text.qklgReflection);

  await expectLearningStatementFieldsToHaveValues(statementPage, text);
}

/**
 * Verifies every Learning statement field currently holds the given text —
 * used both right after filling and again after an interruption (e.g.
 * opening a support link in a new tab) to confirm the values survived.
 */
export async function expectLearningStatementFieldsToHaveValues(
  statementPage: LearningStatementPage,
  text: LearningStatementText
): Promise<void> {
  await expect(statementPage.descriptionInput).toHaveValue(text.description);
  await expect(statementPage.professionalReflectionInput).toHaveValue(text.professionalReflection);
  await expect(statementPage.supportLearningInput).toHaveValue(text.supportLearning);
  await expect(statementPage.qklgReflectionInput).toHaveValue(text.qklgReflection);
}

/**
 * Verifies every value captured in `selections` (Learner code, Observer
 * name, Domain, Subdomain if any, every Key element and every Behaviour
 * description) is reflected correctly on the Review and download screen —
 * shared by every per-Domain end-to-end scenario spec so this verification
 * is defined exactly once.
 */
export async function verifySelectionsOnReviewScreen(page: Page, selections: ObservationSelections): Promise<void> {
  await test.step('Verifying the Learner code and Observer name are displayed', async () => {
    await expect(page.getByText(selections.learnerCode).first()).toBeVisible();
    await expect(page.getByText(selections.observerName).first()).toBeVisible();
  });

  await test.step('Verifying the selected Domain, Subdomain, Key element(s) and Behaviour(s) are displayed', async () => {
    await expect(page.getByText(selections.domainName).first()).toBeVisible();

    if (selections.subdomainName) {
      await expect(page.getByText(selections.subdomainName).first()).toBeVisible();
    }

    for (const keyElementName of selections.keyElementNames) {
      await expect(page.getByText(`Key element: ${keyElementName}`)).toBeVisible();
    }

    // Each Behaviour's "What you observed" description is reproduced
    // verbatim on the Review page, one line per list item.
    for (const behaviourDescription of selections.behaviourDescriptions) {
      for (const line of behaviourDescription.split('\n').filter(Boolean)) {
        await expect(page.getByText(line, { exact: true }).first()).toBeVisible();
      }
    }
  });
}
