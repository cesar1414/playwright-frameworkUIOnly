import { Page, Locator } from '@playwright/test';
import { TestHelpers } from '../utils/helpers';

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    readonly successMessage: Locator;
    readonly forgotPasswordLink: Locator;
    readonly registerLink: Locator;
    private helpers: TestHelpers;

    constructor(page: Page) {
        if (!page) {
            throw new Error('Page is required');
        }
        this.page = page;
        this.helpers = new TestHelpers(page);
        
        // Locators - ajustar según la estructura real de la página
        this.emailInput = page.locator('[data-testid="email-input"], input[type="email"], #email');
        this.passwordInput = page.locator('[data-testid="password-input"], input[type="password"], #password');
        this.loginButton = page.locator('[data-testid="login-button"], button[type="submit"], .login-btn');
        this.errorMessage = page.locator('[data-testid="error-message"], .error, .alert-danger');
        this.successMessage = page.locator('[data-testid="success-message"], .success, .alert-success');
        this.forgotPasswordLink = page.locator('[data-testid="forgot-password"], a[href*="forgot"], .forgot-password');
        this.registerLink = page.locator('[data-testid="register-link"], a[href*="register"], .register-link');
    }

    async navigate(url: string = 'https://example.com'): Promise<void> {
        await this.page.goto(url, { timeout: 10000 });
    }

    async login(email: string, password: string): Promise<void> {
        await this.helpers.fillInput(this.emailInput, email);
        await this.helpers.fillInput(this.passwordInput, password);
        await this.helpers.clickElement(this.loginButton);
    }

    async getErrorMessage(): Promise<string> {
        return await this.helpers.getElementText(this.errorMessage);
    }

    async getSuccessMessage(): Promise<string> {
        return await this.helpers.getElementText(this.successMessage);
    }

    async clickForgotPassword(): Promise<void> {
        await this.helpers.clickElement(this.forgotPasswordLink);
    }

    async clickRegister(): Promise<void> {
        await this.helpers.clickElement(this.registerLink);
    }

    async isLoginFormVisible(): Promise<boolean> {
        return await this.helpers.elementExists(this.emailInput) && 
               await this.helpers.elementExists(this.passwordInput);
    }

    async isLoggedIn(): Promise<boolean> {
        // Verificar si hay elementos que indiquen que el usuario está logueado
        const loggedInIndicators = [
            this.page.locator('[data-testid="user-menu"]'),
            this.page.locator('.user-profile'),
            this.page.locator('[data-testid="logout-button"]')
        ];

        for (const indicator of loggedInIndicators) {
            if (await this.helpers.elementExists(indicator)) {
                return true;
            }
        }
        return false;
    }

    async waitForLoginForm(): Promise<void> {
        await this.emailInput.waitFor({ state: 'visible' });
        await this.passwordInput.waitFor({ state: 'visible' });
    }

    async clearForm(): Promise<void> {
        await this.emailInput.clear();
        await this.passwordInput.clear();
    }

    async takeScreenshot(name: string = 'login-page'): Promise<void> {
        await this.helpers.takeScreenshot(name);
    }
} 