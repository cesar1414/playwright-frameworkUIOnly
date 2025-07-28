import { Page, Locator, expect } from '@playwright/test';

export class TestHelpers {
  constructor(private page: Page) {}

  /**
   * Waits for an element to be visible and then clicks it
   */
  async clickElement(locator: Locator, timeout: number = 5000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
    await locator.click();
  }

  /**
   * Waits for an element to be visible and then fills it with text
   */
  async fillInput(locator: Locator, text: string, timeout: number = 5000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
    await locator.fill(text);
  }

  /**
   * Waits for an element to contain the specified text
   */
  async waitForText(locator: Locator, text: string, timeout: number = 10000): Promise<void> {
    await expect(locator).toContainText(text, { timeout });
  }

  /**
   * Takes a screenshot with timestamp
   */
  async takeScreenshot(name: string): Promise<void> {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      await this.page.screenshot({ 
        path: `reports/screenshots/${name}-${timestamp}.png`,
        fullPage: true 
      });
    } catch (error) {
      console.log('Error taking screenshot:', error);
    }
  }

  /**
   * Waits for the page to load completely
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Verifies that an element is present in the DOM
   */
  async elementExists(locator: Locator, timeout: number = 5000): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'attached', timeout });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Gets the text of an element safely
   */
  async getElementText(locator: Locator): Promise<string> {
    await locator.waitFor({ state: 'visible' });
    return await locator.textContent() || '';
  }

  /**
   * Scrolls to an element
   */
  async scrollToElement(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  /**
   * Waits for a specific URL to load
   */
  async waitForUrl(url: string, timeout: number = 10000): Promise<void> {
    await this.page.waitForURL(url, { timeout });
  }

  /**
   * Generates a random email for testing
   */
  generateRandomEmail(): string {
    const timestamp = Date.now();
    return `test-${timestamp}@example.com`;
  }

  /**
   * Generates a random name for testing
   */
  generateRandomName(): string {
    const names = ['Juan', 'María', 'Carlos', 'Ana', 'Luis', 'Sofia'];
    const surnames = ['García', 'Rodríguez', 'López', 'Martínez', 'González'];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomSurname = surnames[Math.floor(Math.random() * surnames.length)];
    return `${randomName} ${randomSurname}`;
  }

  /**
   * Clears localStorage and sessionStorage
   */
  async clearStorage(): Promise<void> {
    await this.page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  }

  /**
   * Simulates a pause (useful for debugging)
   */
  async pause(ms: number = 1000): Promise<void> {
    await this.page.waitForTimeout(ms);
  }
} 