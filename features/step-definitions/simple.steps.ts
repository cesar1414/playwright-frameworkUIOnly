import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../../src/support/CustomWorld';

declare module '@cucumber/cucumber' {
    interface World extends CustomWorld {
        linkCount?: number;
    }
}

Given('the browser is open', async function (this: CustomWorld) {
    // Browser is already open by the Before hook
    expect(this.page).toBeDefined();
});

When('they navigate to example.com', async function (this: CustomWorld) {
    await this.page.goto('https://example.com', { timeout: 10000 });
});

Then('they should see the page loaded', async function (this: CustomWorld) {
    const title = await this.page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);
}); 