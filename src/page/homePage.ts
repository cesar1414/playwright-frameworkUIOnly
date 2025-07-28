import { Page, Locator } from '@playwright/test';
import { TestHelpers } from '../utils/helpers';

export class HomePage {
    readonly page: Page;
    readonly title: Locator;
    readonly body: Locator;
    readonly links: Locator;
    private helpers: TestHelpers;

    constructor(page: Page) {
        if (!page) {
            throw new Error('Page is required');
        }
        this.page = page;
        this.helpers = new TestHelpers(page);
        
        // Locators
        this.title = page.locator('h1');
        this.body = page.locator('body');
        this.links = page.locator('a');
    }

    async navigate(url: string = 'https://example.com'): Promise<void> {
        await this.page.goto(url, { timeout: 10000 });
    }

    async getTitle(): Promise<string> {
        return await this.helpers.getElementText(this.title);
    }

    async getBodyText(): Promise<string> {
        return await this.helpers.getElementText(this.body);
    }

    async clickLink(text: string): Promise<void> {
        const link = this.links.filter({ hasText: text });
        await this.helpers.clickElement(link);
    }

    async waitForTitle(expectedTitle: string): Promise<void> {
        await this.helpers.waitForText(this.title, expectedTitle);
    }

    async takeScreenshot(name: string = 'homepage'): Promise<void> {
        await this.helpers.takeScreenshot(name);
    }

    async isPageLoaded(): Promise<boolean> {
        return await this.helpers.elementExists(this.title);
    }

    async getPageUrl(): Promise<string> {
        return this.page.url();
    }

    async getLinksCount(): Promise<number> {
        return await this.links.count();
    }

    async getAllLinks(): Promise<string[]> {
        const links = await this.links.all();
        const linkTexts = await Promise.all(links.map(link => link.textContent()));
        return linkTexts.filter((text): text is string => text !== null);
    }
}