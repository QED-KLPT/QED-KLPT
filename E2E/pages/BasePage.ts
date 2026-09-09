import { Page, Response } from '@playwright/test';

export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path = ''): Promise<Response | null> {
    return this.page.goto(path, { waitUntil: 'load' });
  }
}
