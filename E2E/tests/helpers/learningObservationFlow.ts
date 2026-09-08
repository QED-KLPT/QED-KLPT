import { test, expect, type Page } from '@playwright/test';
import type { KlptHomePage } from '../../pages/KlptHomePage';
import { ObservationSessionsPage } from '../../pages/ObservationSessionsPage';
import { DomainSelectionPage } from '../../pages/DomainSelectionPage';
import { BehaviourSelectionPage } from '../../pages/BehaviourSelectionPage';
import { LearningStatementPage } from '../../pages/LearningStatementPage';
import { randomLearnerCode } from '../../test-data/learningObservation.data';

/**
 * Shared observation-session flow, reused across every learning-observation
 * spec file so the session-creation and step-navigation workflow is defined
 * once, not duplicated per test file. Each function wraps itself in a
 * test.step() so the execution order is visible in the report regardless of
 * which spec calls it. Later helpers build on earlier ones (reachReviewScreen
 * -> reachStatementScreen -> reachBehaviourScreen -> createNewSession) so the
 * selection logic itself is defined exactly once.
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
 * Selects a Domain, then a Subdomain only if the chosen Domain actually shows
 * one, then a Key element — capturing each selected display name along the
 * way, for specs that need to verify them later (e.g. on the Review and
 * download screen). Does NOT click Next — callers decide when to advance,
 * since some tests (e.g. Key-element card coverage) need to interact with the
 * Key elements step itself before moving on.
 */
export async function selectDomainSubdomainAndKeyElement(page: Page): Promise<{
  domainPage: DomainSelectionPage;
  domainName: string;
  subdomainName: string | null;
  keyElementName: string;
}> {
  return test.step('Selecting a Domain, Subdomain (if available) and Key element', async () => {
    const domainPage = new DomainSelectionPage(page);
    const domainName = await domainPage.selectFirstAvailableDomainAndGetName();
    const subdomainName = await domainPage.selectSubdomainIfAvailableAndGetName();
    const keyElementName = await domainPage.selectFirstAvailableKeyElementAndGetName();
    return { domainPage, domainName, subdomainName, keyElementName };
  });
}

/** Creates a session and advances all the way to the Behaviours screen, capturing every selected value along the way. */
export async function reachBehaviourScreen(
  page: Page,
  klptHomePage: KlptHomePage,
  observerName: string = 'Playwright Tester'
): Promise<{
  learnerCode: string;
  domainPage: DomainSelectionPage;
  domainName: string;
  subdomainName: string | null;
  keyElementName: string;
}> {
  const { learnerCode } = await createNewSession(page, klptHomePage, observerName);
  const { domainPage, domainName, subdomainName, keyElementName } = await selectDomainSubdomainAndKeyElement(page);
  await domainPage.nextButton.click();
  return { learnerCode, domainPage, domainName, subdomainName, keyElementName };
}

/** Creates a session, advances through Behaviours (selecting one), and lands on the Learning progression statement screen, capturing every selected value along the way. */
export async function reachStatementScreen(
  page: Page,
  klptHomePage: KlptHomePage,
  observerName: string = 'Playwright Tester'
): Promise<{
  learnerCode: string;
  domainPage: DomainSelectionPage;
  behaviourPage: BehaviourSelectionPage;
  domainName: string;
  subdomainName: string | null;
  keyElementName: string;
  behaviourDescription: string;
}> {
  const { learnerCode, domainPage, domainName, subdomainName, keyElementName } = await reachBehaviourScreen(
    page,
    klptHomePage,
    observerName
  );
  const behaviourPage = new BehaviourSelectionPage(page);

  const behaviourDescription = await test.step(
    'Selecting a Behaviour and advancing to the Learning progression statement screen',
    async () => {
      const description = await behaviourPage.selectFirstAvailableBehaviourAndGetDescription();
      await expect(behaviourPage.nextButton).toBeVisible();
      await behaviourPage.nextButton.click();
      return description;
    }
  );

  return { learnerCode, domainPage, behaviourPage, domainName, subdomainName, keyElementName, behaviourDescription };
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

/** Every value selected while walking through Domains/Behaviours, captured for later verification (e.g. on the Review and download screen). */
export interface ObservationSelections {
  learnerCode: string;
  observerName: string;
  domainName: string;
  subdomainName: string | null;
  keyElementName: string;
  behaviourDescription: string;
}

/**
 * Creates a session with the given Observer name and advances to the
 * Learning progression statement screen, returning every value selected
 * along the way (Learner code, Observer name, Domain, Subdomain, Key element
 * and Behaviour) — for specs that need to verify them later, most importantly
 * a full end-to-end scenario checking the Review and download screen.
 */
export async function reachStatementScreenWithSelections(
  page: Page,
  klptHomePage: KlptHomePage,
  observerName: string
): Promise<ObservationSelections> {
  const { learnerCode, domainName, subdomainName, keyElementName, behaviourDescription } = await reachStatementScreen(
    page,
    klptHomePage,
    observerName
  );

  return { learnerCode, observerName, domainName, subdomainName, keyElementName, behaviourDescription };
}
