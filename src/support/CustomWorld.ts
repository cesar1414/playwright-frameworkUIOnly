import { setWorldConstructor, Before, After } from '@cucumber/cucumber';
import { chromium, Browser, Page, BrowserContext } from '@playwright/test';
import { getConfig } from '../utils/config';
import { TestHelpers } from '../utils/helpers';
import { DataManager } from '../utils/dataManager';

export class CustomWorld {
  public page!: Page;
  public context!: BrowserContext;
  private browser!: Browser;
  public helpers!: TestHelpers;
  public dataManager!: DataManager;
  private config: ReturnType<typeof getConfig>;
  public linkCount?: number; // For storing temporary data in tests
  public parameters: any = {}; // World parameters

  constructor(parameters: any = {}) {
    this.parameters = parameters;
    this.config = getConfig('development');
    this.dataManager = DataManager.getInstance();
  }

  async init(): Promise<void> {
    const headless = this.parameters.headless !== undefined ? this.parameters.headless : this.config.headless;
    
    this.browser = await chromium.launch({ 
      headless: headless,
      timeout: 10000,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    this.context = await this.browser.newContext({
      viewport: { width: 1280, height: 720 },
      ignoreHTTPSErrors: true
    });

    this.page = await this.context.newPage();
    this.helpers = new TestHelpers(this.page);
  }

  async close(): Promise<void> {
    try {
      if (this.context) {
        await this.context.close();
      }
    } catch (error) {
      console.log('Error closing context:', error);
    }
    
    try {
      if (this.browser) {
        await this.browser.close();
      }
    } catch (error) {
      console.log('Error closing browser:', error);
    }
  }

  async navigateTo(path: string = ''): Promise<void> {
    const url = path.startsWith('http') ? path : `${this.config.baseUrl}${path}`;
    await this.page.goto(url);
    await this.helpers.waitForPageLoad();
  }

  async takeScreenshot(name: string): Promise<void> {
    await this.helpers.takeScreenshot(name);
  }

  async clearStorage(): Promise<void> {
    await this.helpers.clearStorage();
  }

  getConfig() {
    return this.config;
  }
}

setWorldConstructor(CustomWorld);

Before(async function (this: CustomWorld) {
  await this.init();
});

After(async function (this: CustomWorld, scenario) {
  try {
    await this.close();
  } catch (error) {
    console.log('Error closing browser:', error);
  }
});