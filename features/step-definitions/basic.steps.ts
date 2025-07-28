import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../../src/support/CustomWorld';

declare module '@cucumber/cucumber' {
    interface World extends CustomWorld {
        linkCount?: number;
    }
}

Given('the world is initialized', async function (this: CustomWorld) {
    expect(this.page).toBeDefined();
    expect(this.helpers).toBeDefined();
    expect(this.dataManager).toBeDefined();
});

Then('they should be able to access the page', async function (this: CustomWorld) {
    expect(this.page).toBeDefined();
    // Verify that we can access basic page properties
    const url = this.page.url();
    expect(url).toBeDefined();
}); 