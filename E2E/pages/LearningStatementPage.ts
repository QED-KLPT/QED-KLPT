import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object for the "Learning progression statement" screen (step 3 of 4).
 * All locators below were captured by inspecting the real KLPT Test
 * environment with Playwright (page.locator(...).ariaSnapshot() / outerHTML)
 * — none are guessed placeholders.
 */
export class LearningStatementPage extends BasePage {
  /** Real confirmed page heading: <h2>Learning progression statement</h2>. */
  readonly heading: Locator;

  /** Confirmed real accessible name is "What you observed" (a plain heading, no form control). */
  readonly whatYouObserved: Locator;

  /** "Description of observation context or evidence collected" textarea — real, unique accessible name. */
  readonly descriptionInput: Locator;

  /**
   * Professional reflection textarea. Real accessible name is
   * "Professional reflection View the reflective prompts below to guide your
   * reflection" (label + adjoining hint text) — getByLabel does a substring
   * match by default, so the plain label text below still resolves uniquely.
   */
  readonly professionalReflectionInput: Locator;

  /**
   * "How can you support this learning?" textarea. Real accessible name is
   * "How can you support this learning? View the language and literacy
   * practice supports (opens in a new tab) for suggested intentional
   * teaching strategies and learning opportunities" (label + adjoining link
   * text) — same substring-match reasoning as professionalReflectionInput.
   */
  readonly supportLearningInput: Locator;

  /**
   * "What QKLG Learning and Development Area(s)..." textarea.
   *
   * CONFIRMED REAL ACCESSIBILITY GAP: unlike the other two reflection
   * fields, this textarea has NO accessible name at all (no <label>,
   * aria-label or aria-labelledby) — verified via outerHTML inspection. The
   * preceding static text and the "alignment of learning..." button are
   * separate, unrelated elements, not programmatically associated with this
   * field. getByLabel/getByRole(..., { name }) therefore cannot find it.
   *
   * As the only genuinely stable anchor, this is matched by DOM position
   * relative to the confirmed, unique static heading text that visually
   * precedes it — the same rationale the project already applies elsewhere
   * ("no stable accessible alternative exists").
   */
  readonly qklgReflectionInput: Locator;

  /**
   * "View reflective questions" accordion toggle. Confirmed real element is
   * a <button aria-expanded="..." aria-controls="accordion-body-0"> — the
   * button's accessible name comes from its own visible text (the chevron
   * icon is aria-hidden), so clicking via this locator already clicks the
   * control itself, not just the icon.
   */
  readonly reflectiveQuestionsToggle: Locator;

  /**
   * The accordion's content region, confirmed real accessible name "View
   * reflective questions" (role="region"). NOTE: confirmed on the real site
   * that this region's list content has a real, non-zero-size bounding box
   * and is visually present at all times — aria-expanded toggles correctly,
   * but it does not correspond to the content actually hiding/showing.
   */
  readonly reflectiveQuestionsContent: Locator;
  readonly reflectiveQuestionsListItems: Locator;

  /** Confirmed real link: <a target="_blank" href="/learning-domains/language-and-literacy#practice-supports">. */
  readonly practiceSupportsLink: Locator;

  /**
   * CONFIRMED REAL ACCESSIBILITY GAP #2: this control's computed accessible
   * name is NOT its visible text — it's aria-labelledby'd to the surrounding
   * field label instead ("What QKLG Learning and Development Area(s)... View
   * the to support your response"), so getByRole(..., { name: /alignment.../ })
   * never matches anything despite the button clearly existing. Its real,
   * confirmed element is <button type="button" class="link-button"> with NO
   * href attribute at all (it's not an <a>), containing exactly the visible
   * text below as its only text content — matched here via getByText
   * (rendered text), which is what's actually stable for this control.
   */
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
    // NOTE: same link/button duality already confirmed on the Domains and
    // Behaviours screens — applied defensively here too.
    this.nextButton = page
      .getByRole('link', { name: 'Next', exact: true })
      .or(page.getByRole('button', { name: 'Next', exact: true }));
  }
}
