import { Page, Locator, FrameLocator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LearningObservationInfoPage extends BasePage {
  readonly heading: Locator;
  readonly factSheetLink: Locator;
  readonly videoFrame: FrameLocator;
  readonly launchToolLink: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Learning observation tool', level: 1 });
    this.factSheetLink = page.getByRole('link', { name: /Learning observation tool fact sheet/i });
    this.videoFrame = page.frameLocator('iframe');
    this.launchToolLink = page.getByRole('link', { name: /Launch tool/i });
  }

  async open(): Promise<void> {
    await this.goto('/learning-observation-tool');
    await this.heading.waitFor({ state: 'visible', timeout: 10000 });
  }
}
