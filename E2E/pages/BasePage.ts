import { Page, Response } from '@playwright/test';

/**
 * BasePage centralises behaviour shared by every Page Object in the project
 * (navigation, waiting strategy, common assertions helpers, etc.).
 *
 * Concrete pages (e.g. KlptHomePage) should extend this class rather than
 * duplicating boilerplate.
 */
export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a path relative to the configured baseURL.
   * Pass an empty string (or omit) to go to the base URL itself.
   * Returns the navigation response so callers can assert on HTTP status.
   */
  async goto(path = ''): Promise<Response | null> {
    return this.page.goto(path, { waitUntil: 'load' });
  }

}
