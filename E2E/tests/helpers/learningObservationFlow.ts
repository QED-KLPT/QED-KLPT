import { test, expect, type Page } from '@playwright/test';
import type { KlptHomePage } from '../../pages/KlptHomePage';
import { ObservationSessionsPage } from '../../pages/ObservationSessionsPage';
import { DomainSelectionPage } from '../../pages/DomainSelectionPage';
import { BehaviourSelectionPage } from '../../pages/BehaviourSelectionPage';
import { LearningStatementPage } from '../../pages/LearningStatementPage';
import { randomLearnerCode, type LearningStatementText } from '../../test-data/learningObservation.data';

// Shared observation-session flow, reused across every learning-observation spec.
// Each helper builds on the one before it: reachReviewScreen -> reachStatementScreen
// -> reachBehaviourScreen -> createNewSession.

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

/** Omit to keep the default: first available domain, first key element only. */
export interface DomainSelectionOptions {
  /** Selects this domain by name instead of the first available one. */
  domainName?: string;
  /** Selects every key element instead of just the first. */
  selectAllKeyElements?: boolean;
}

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
    'Selecting a Behaviour for each Key element and advancing to the statement screen',
    async () => {
      const descriptions = await behaviourPage.selectBehaviourInEachSectionAndGetDescriptions(behaviourCardIndex);
      await expect(behaviourPage.nextButton).toBeVisible();
      await behaviourPage.nextButton.click();
      return descriptions;
    }
  );

  return { learnerCode, domainPage, behaviourPage, domainName, subdomainName, keyElementNames, behaviourDescriptions };
}

export async function reachReviewScreen(
  page: Page,
  klptHomePage: KlptHomePage,
  observerName: string = 'Playwright Tester'
): Promise<{ learnerCode: string }> {
  const { learnerCode } = await reachStatementScreen(page, klptHomePage, observerName);
  const statementPage = new LearningStatementPage(page);

  await test.step('Filling the required Description field and advancing to Review and download', async () => {
    await statementPage.descriptionInput.fill('Automated test observation context.');
    await expect(statementPage.nextButton).toBeVisible();
    await statementPage.nextButton.click();
  });

  return { learnerCode };
}

/** Arrays cover both a single-element domain and a multi-element one (e.g. Executive function's 3). */
export interface ObservationSelections {
  learnerCode: string;
  observerName: string;
  domainName: string;
  subdomainName: string | null;
  keyElementNames: string[];
  behaviourDescriptions: string[];
}

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

export async function expectLearningStatementFieldsToHaveValues(
  statementPage: LearningStatementPage,
  text: LearningStatementText
): Promise<void> {
  await expect(statementPage.descriptionInput).toHaveValue(text.description);
  await expect(statementPage.professionalReflectionInput).toHaveValue(text.professionalReflection);
  await expect(statementPage.supportLearningInput).toHaveValue(text.supportLearning);
  await expect(statementPage.qklgReflectionInput).toHaveValue(text.qklgReflection);
}

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

    // Each behaviour's "What you observed" text is reproduced verbatim, one line per list item.
    for (const behaviourDescription of selections.behaviourDescriptions) {
      for (const line of behaviourDescription.split('\n').filter(Boolean)) {
        await expect(page.getByText(line, { exact: true }).first()).toBeVisible();
      }
    }
  });
}
