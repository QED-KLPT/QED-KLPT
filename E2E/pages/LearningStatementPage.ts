import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LearningStatementPage extends BasePage {
  readonly heading: Locator;
  readonly whatYouObserved: Locator;
  readonly descriptionInput: Locator;
  readonly professionalReflectionInput: Locator;
  readonly supportLearningInput: Locator;

  /** No accessible name at all (no label, aria-label or aria-labelledby), so it's located relative to the static heading text before it. */
  readonly qklgReflectionInput: Locator;

  readonly reflectiveQuestionsToggle: Locator;

  /** Content stays in the DOM at full size even when collapsed — only aria-expanded actually toggles. */
  readonly reflectiveQuestionsContent: Locator;
  readonly reflectiveQuestionsListItems: Locator;

  readonly practiceSupportsLink: Locator;

  /** Its accessible name is aria-labelledby'd to the surrounding field label, not its own text, so it's matched on visible text instead. */
  readonly alignmentPdfControl: Locator;

  readonly previousLink: Locator;
  readonly nextButton: Locator;

  constructor(page: Page) {
    super(page);

    this.heading = page.getByRole('heading', { name: 'Learning progression statement', level: 2 });
    this.whatYouObserved = page.getByRole('heading', { name: 'What you observed', level: 3 });

    this.descriptionInput = page.getByLabel('Description of observation context or evidence collected');
    this.professionalReflectionInput = page.getByLabel('Professional reflection');
    this.supportLearningInput = page.getByLabel('How can you support this learning?');

    this.qklgReflectionInput = page
      .getByText(
        'What QKLG Learning and Development Area(s) and Significant Learnings and EYLF Learning Outcomes are reflected in this learning?',
        { exact: true }
      )
      .locator('xpath=following::textarea[1]');

    this.reflectiveQuestionsToggle = page.getByRole('button', { name: 'View reflective questions' });
    this.reflectiveQuestionsContent = page.getByRole('region', { name: 'View reflective questions' });
    this.reflectiveQuestionsListItems = this.reflectiveQuestionsContent.getByRole('listitem');

    this.practiceSupportsLink = page.getByRole('link', { name: /language and literacy practice supports/i });
    this.alignmentPdfControl = page.getByText(
      'alignment of learning between the EYLF V2.0 and QKLG 2024 (PDF, 147KB, opens in a new tab)',
      { exact: true }
    );

    this.previousLink = page.getByRole('link', { name: 'Previous', exact: true });
    // Next renders as a link once enabled, not a button — match either.
    this.nextButton = page
      .getByRole('link', { name: 'Next', exact: true })
      .or(page.getByRole('button', { name: 'Next', exact: true }));
  }
}
