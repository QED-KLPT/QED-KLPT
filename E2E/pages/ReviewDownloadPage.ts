import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ReviewDownloadPage extends BasePage {
  readonly heading: Locator;
  readonly childNameInput: Locator;
  readonly generateWordButton: Locator;
  readonly generatePdfButton: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: /Review and download/i });
    // Straight apostrophe, not the curly one — getByLabel found nothing with the curly version.
    this.childNameInput = page.getByLabel("Child's name");
    this.generateWordButton = page.getByRole('button', { name: /Generate Word document/i });
    this.generatePdfButton = page.getByRole('button', { name: /Generate PDF/i });
  }
}
