import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../../src/page/loginPage';
import { CustomWorld } from '../../src/support/CustomWorld';

declare module '@cucumber/cucumber' {
    interface World extends CustomWorld {
        linkCount?: number;
    }
}

Given('the user is on the login page', async function (this: CustomWorld) {
    const loginPage = new LoginPage(this.page);
    await loginPage.navigate();
    await loginPage.waitForLoginForm();
});

When('the user enters valid credentials', async function (this: CustomWorld) {
    const loginPage = new LoginPage(this.page);
    const validUser = this.dataManager.getValidUser();
    await loginPage.login(validUser.email, validUser.password);
});

When('the user enters invalid credentials', async function (this: CustomWorld) {
    const loginPage = new LoginPage(this.page);
    const invalidUser = this.dataManager.getInvalidUser();
    await loginPage.login(invalidUser.email, invalidUser.password);
});

When('the user leaves the fields empty', async function (this: CustomWorld) {
    const loginPage = new LoginPage(this.page);
    await loginPage.login('', '');
});

When('clicks the login button', async function (this: CustomWorld) {
    // Click is already done in the login method, but we can add additional logic here
    await this.helpers.pause(1000); // Small pause to simulate the click
});

When('the user clicks {string}', async function (this: CustomWorld, linkText: string) {
    const loginPage = new LoginPage(this.page);
    
    if (linkText === 'Forgot Password') {
        await loginPage.clickForgotPassword();
    } else if (linkText === 'Register') {
        await loginPage.clickRegister();
    }
});

Then('they should be redirected to the dashboard', async function (this: CustomWorld) {
    await this.helpers.waitForUrl('**/dashboard', 10000);
    const currentUrl = this.page.url();
    expect(currentUrl).toContain('dashboard');
});

Then('they should see a welcome message', async function (this: CustomWorld) {
    const loginPage = new LoginPage(this.page);
    const successMessage = await loginPage.getSuccessMessage();
    expect(successMessage).toBeTruthy();
});

Then('they should see an error message', async function (this: CustomWorld) {
    const loginPage = new LoginPage(this.page);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.length).toBeGreaterThan(0);
});

Then('they should remain on the login page', async function (this: CustomWorld) {
    const currentUrl = this.page.url();
    expect(currentUrl).toContain('login');
});

Then('they should see validation messages', async function (this: CustomWorld) {
    const loginPage = new LoginPage(this.page);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBeTruthy();
});

Then('the required fields should be marked as invalid', async function (this: CustomWorld) {
    const loginPage = new LoginPage(this.page);
    // Verify that fields have error classes
    const emailInput = loginPage['emailInput'];
    const passwordInput = loginPage['passwordInput'];
    
    await expect(emailInput).toHaveClass(/error|invalid/);
    await expect(passwordInput).toHaveClass(/error|invalid/);
});

Then('they should see the email field', async function (this: CustomWorld) {
    const loginPage = new LoginPage(this.page);
    const isVisible = await loginPage.isLoginFormVisible();
    expect(isVisible).toBe(true);
});

Then('they should see the password field', async function (this: CustomWorld) {
    const loginPage = new LoginPage(this.page);
    const isVisible = await loginPage.isLoginFormVisible();
    expect(isVisible).toBe(true);
});

Then('they should see the login button', async function (this: CustomWorld) {
    const loginPage = new LoginPage(this.page);
    const isVisible = await this.helpers.elementExists(loginPage['loginButton']);
    expect(isVisible).toBe(true);
});

Then('they should see the {string} link', async function (this: CustomWorld, linkText: string) {
    const loginPage = new LoginPage(this.page);
    let linkLocator;
    
    if (linkText === 'Forgot Password') {
        linkLocator = loginPage['forgotPasswordLink'];
    } else if (linkText === 'Register') {
        linkLocator = loginPage['registerLink'];
    }
    
    if (linkLocator) {
        const isVisible = await this.helpers.elementExists(linkLocator);
        expect(isVisible).toBe(true);
    }
});

Then('they should be redirected to the password recovery page', async function (this: CustomWorld) {
    await this.helpers.waitForUrl('**/forgot-password', 10000);
    const currentUrl = this.page.url();
    expect(currentUrl).toContain('forgot-password');
});

Then('they should be redirected to the registration page', async function (this: CustomWorld) {
    await this.helpers.waitForUrl('**/register', 10000);
    const currentUrl = this.page.url();
    expect(currentUrl).toContain('register');
}); 