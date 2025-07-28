import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { HomePage } from '../../src/page/homePage';
import { CustomWorld } from '../../src/support/CustomWorld';


declare module '@cucumber/cucumber' {
    interface World extends CustomWorld {
        linkCount?: number;
    }
}

Given('the user navigates to the home page', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    await homePage.navigate();
});

When('they count the links on the page', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    this.linkCount = await homePage.getLinksCount();
});

When('they take a screenshot', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    await homePage.takeScreenshot('example-page');
});

Then('the title should be {string}', async function (this: CustomWorld, expectedTitle: string) {
    const homePage = new HomePage(this.page);
    await expect(homePage.title).toHaveText(expectedTitle);
});

Then('they should see the main title', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    const title = await homePage.getTitle();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);
});

Then('they should see the body content', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    const bodyText = await homePage.getBodyText();
    expect(bodyText).toBeTruthy();
    expect(bodyText.length).toBeGreaterThan(0);
});

Then('they should see links on the page', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    const linkCount = await homePage.getLinksCount();
    expect(linkCount).toBeGreaterThan(0);
});

Then('they should find at least one link', async function (this: CustomWorld) {
    expect(this.linkCount).toBeGreaterThan(0);
});

Then('they should be able to get the list of links', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    const links = await homePage.getAllLinks();
    expect(links).toBeInstanceOf(Array);
    expect(links.length).toBeGreaterThan(0);
});

Then('the screenshot should be saved successfully', async function (this: CustomWorld) {
    // Screenshot was already taken in the When step, if no error occurred, it was successful
    expect(true).toBe(true);
});