<<<<<<< Updated upstream
# playwright-frameworkUIOnly
this framework is only with playwright-typeScript-Cucumber for UI testing
=======
# 🎭 Playwright Framework UI Only

Hey there! 👋 Welcome to our awesome UI testing framework! 

This is a robust and scalable testing solution built with **Playwright**, **TypeScript** and **Cucumber** that makes testing web applications super easy and fun. Whether you're a testing newbie or a seasoned QA engineer, this framework has got you covered!

## ✨ What's Cool About This Framework?

- 🎯 **Page Object Model** - Keep your tests clean and maintainable
- 🌍 **Multi-environment setup** - Test in dev, staging, and production easily
- 📊 **Smart data management** - No more hardcoded test data!
- 🛠️ **Handy utilities** - Common testing tasks made simple
- 📈 **Beautiful reports** - See your test results in style
- 📸 **Auto-screenshots** - Never miss a bug again
- 🎥 **Video recording** - Watch your tests run like a movie
- 🌐 **Multi-browser support** - Test on Chrome, Firefox, and Safari
- 🔒 **TypeScript** - Catch errors before they catch you
- 📝 **BDD with Cucumber** - Write tests in plain English

## 📋 What You'll Need

Before we start, make sure you have:
- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download here](https://git-scm.com/)

## 🚀 Let's Get Started!

### Step 1: Get the Code
First, let's grab the framework from the repository:

```bash
# Clone the repository (replace with your actual repo URL)
git clone https://github.com/cesar1414/playwright-frameworkUIOnly.git
cd playwright-frameworkUIOnly

# If you have the full URL, it would look something like:
# git clone https://github.com/cesar1414/playwright-frameworkUIOnly.git
```

### Step 2: Install Everything
Now let's install all the goodies:

```bash
# Install all the dependencies
npm install
```

### Step 3: Get the Browsers
Playwright needs browsers to run tests. Let's install them:

```bash
# Install all browsers (Chrome, Firefox, Safari)
npx playwright install

# Or if you only want specific browsers:
npx playwright install chromium    # Chrome
npx playwright install firefox     # Firefox
npx playwright install webkit      # Safari
```

### Step 4: Make Sure Everything Works
Let's verify that everything is set up correctly:

```bash
# Check if everything is installed properly
npx cucumber-js --version
npx playwright --version
node --version
npm --version
```

### Step 5: Run Your First Test!
Time to see the magic happen! 🎉

```bash
# Run a basic test to make sure everything works
npm run test:tags @basic

# If that works, try a simple browser test
npm run test:tags @simple

# And finally, run some navigation tests
npm run test:tags "@navigation and not @login"
```

## 🏃‍♂️ Running Tests - The Fun Part!

### Basic Commands
Here are the main commands you'll use:

```bash
# Run all tests
npm test

# Run tests with browser visible (great for debugging!)
npm run test:headed

# Run tests in the background (faster)
npm run test:headless

# Run tests in parallel (even faster!)
npm run test:parallel

# Generate a nice HTML report
npm run test:report
```

### Running Specific Tests
Want to run only certain tests? No problem!

```bash
# Run only smoke tests
npm run test:tags @smoke

# Run everything except slow tests
npm run test:tags "not @slow"

# Run login tests only
npm run test:tags @login

# Run a specific feature file
npx cucumber-js features/login.feature
```

### Some Handy Examples
Here are some useful combinations:

```bash
# Quick verification tests
npm run test:tags @basic          # Basic framework test
npm run test:tags @simple         # Simple browser test
npm run test:tags @navigation     # Navigation tests

# Skip problematic tests
npm run test:tags "not @login"    # All tests except login

# Combine tags for specific scenarios
npm run test:tags "@smoke and @navigation"
npm run test:tags "@navigation and not @login"
```

## 📁 What's Inside the Framework?

Here's how everything is organized:

```
playwright-frameworkUIOnly/
├── features/                          # Your test scenarios (in plain English!)
│   ├── example.feature               # Example tests
│   ├── login.feature                 # Login tests
│   ├── simple.feature                # Simple tests
│   ├── basic.feature                 # Basic tests
│   └── step-definitions/             # The code behind the scenarios
│       ├── example.steps.ts
│       ├── login.steps.ts
│       ├── simple.steps.ts
│       └── basic.steps.ts
├── src/
│   ├── page/                         # Page Objects (your app's pages)
│   │   ├── homePage.ts
│   │   └── loginPage.ts
│   ├── support/                      # Framework configuration
│   │   ├── CustomWorld.ts           # How tests are set up
│   │   ├── globalSetup.ts           # Global setup
│   │   └── globalTeardown.ts        # Global cleanup
│   ├── utils/                        # Useful tools and helpers
│   │   ├── config.ts                # Environment settings
│   │   ├── helpers.ts               # Common utilities
│   │   └── dataManager.ts           # Test data management
│   └── test/                         # Native Playwright tests
│       └── example.spec.ts
├── reports/                          # Your test results
│   ├── screenshots/                  # Test screenshots
│   ├── videos/                       # Test videos
│   └── har/                          # Network logs
├── playwright.config.ts              # Playwright settings
├── cucumber.json                     # Cucumber settings
├── tsconfig.json                     # TypeScript settings
├── package.json                      # Dependencies and scripts
└── README.md                         # This awesome file! 😄
```

## ⚙️ Configuration - Make It Yours!

### Different Environments
The framework supports multiple environments:

- **Development** - For your local testing
- **Staging** - For testing before production
- **Production** - For the real deal

### Setting Up Your Own URLs
Want to test your own application? Easy! Just update the URLs in `src/utils/config.ts`:

```typescript
const environments: EnvironmentConfig = {
  development: {
    baseUrl: 'https://your-app-dev.com',  // Change this to your dev URL
    // ... other settings
  },
  staging: {
    baseUrl: 'https://your-app-staging.com',  // Change this to your staging URL
    // ... other settings
  },
  production: {
    baseUrl: 'https://your-app.com',  // Change this to your production URL
    // ... other settings
  }
};
```

### Environment Variables
You can also set the environment using variables:

```bash
# Windows
set NODE_ENV=staging
npm test

# Linux/Mac
NODE_ENV=staging npm test
```

## 📝 Writing Your Own Tests - It's Easy!

### 1. Create a Feature File
Start by writing your test scenario in plain English:

```gherkin
Feature: My Awesome Feature
  As a user
  I want to do something cool
  To make my life better

  @smoke
  Scenario: Test something awesome
    Given the user is on the main page
    When they click the awesome button
    Then they should see something amazing
```

### 2. Create Step Definitions
Now write the code that makes those English sentences work:

```typescript
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { MyPage } from '../../src/page/myPage';
import { CustomWorld } from '../../src/support/CustomWorld';

declare module '@cucumber/cucumber' {
    interface World extends CustomWorld {}
}

Given('the user is on the main page', async function (this: CustomWorld) {
    const myPage = new MyPage(this.page);
    await myPage.navigate();
});

When('they click the awesome button', async function (this: CustomWorld) {
    const myPage = new MyPage(this.page);
    await myPage.clickAwesomeButton();
});

Then('they should see something amazing', async function (this: CustomWorld) {
    const myPage = new MyPage(this.page);
    await expect(myPage.amazingElement).toHaveText('Something Amazing!');
});
```

### 3. Create a Page Object
Keep your page interactions organized:

```typescript
import { Page, Locator } from '@playwright/test';
import { TestHelpers } from '../utils/helpers';

export class MyPage {
    readonly page: Page;
    readonly awesomeButton: Locator;
    readonly amazingElement: Locator;
    private helpers: TestHelpers;

    constructor(page: Page) {
        this.page = page;
        this.helpers = new TestHelpers(page);
        this.awesomeButton = page.locator('[data-testid="awesome-button"]');
        this.amazingElement = page.locator('[data-testid="amazing-element"]');
    }

    async navigate(): Promise<void> {
        await this.page.goto('/my-awesome-page');
        await this.helpers.waitForPageLoad();
    }

    async clickAwesomeButton(): Promise<void> {
        await this.helpers.clickElement(this.awesomeButton);
    }
}
```

## 🎯 Cool Utilities You Can Use

### TestHelpers - Your Testing Buddy
The framework comes with handy helpers that make testing easier:

```typescript
// In your step definitions
const helpers = this.helpers;

// Click safely (waits for element to be ready)
await helpers.clickElement(locator);

// Fill forms safely
await helpers.fillInput(locator, 'your text here');

// Wait for specific text to appear
await helpers.waitForText(locator, 'expected text');

// Take a screenshot
await helpers.takeScreenshot('my-awesome-test');

// Generate random test data
const email = helpers.generateRandomEmail();
const name = helpers.generateRandomName();
```

### DataManager - Smart Data Handling
Manage your test data like a pro:

```typescript
// In your step definitions
const dataManager = this.dataManager;

// Get test users
const validUser = dataManager.getValidUser();
const invalidUser = dataManager.getInvalidUser();

// Get URLs
const loginUrl = dataManager.getUrl('login');

// Get random messages
const errorMessage = dataManager.getRandomMessage('error');
```

## 📊 Reports - See Your Results!

### Cucumber HTML Report
Get beautiful reports automatically:

```bash
# Generate the report
npm run test:report

# Open it in your browser
start reports/cucumber-report.html  # Windows
open reports/cucumber-report.html   # Mac
xdg-open reports/cucumber-report.html  # Linux
```

### Playwright Report
For even more detailed reports:

```bash
# Generate Playwright report
npx playwright show-report
```

### Screenshots
Screenshots are automatically saved when:
- A test fails (so you can see what went wrong)
- You explicitly take one with `takeScreenshot()`

## 🔧 Available Scripts - Your Command Arsenal

```bash
# Testing commands
npm test                    # Run all tests
npm run test:headed         # Tests with visible browser
npm run test:headless       # Tests without browser
npm run test:parallel       # Tests in parallel
npm run test:report         # Generate HTML report
npm run test:tags           # Tests with specific tags

# Maintenance commands
npm run clean               # Clean everything
npm run reinstall           # Fresh install
npm run type-check          # Check TypeScript
```

## 🏷️ Cucumber Tags - Organize Your Tests

Use tags to keep your tests organized:

```gherkin
@smoke @login
Scenario: Basic login test
  # This test has both @smoke and @login tags

@regression @slow
Scenario: Complex test
  # This test has both @regression and @slow tags
```

```bash
# Run only smoke tests
npm run test:tags @smoke

# Skip slow tests
npm run test:tags "not @slow"

# Combine tags
npm run test:tags "@smoke and @login"
```

## 🐛 Debugging - When Things Go Wrong

### Debug Mode
Need to see what's happening? Run in debug mode:

```bash
# Run in debug mode
npx cucumber-js --inspect-brk

# Or with visible browser
npm run test:headed
```

### Common Issues and Solutions
Here are some common problems and how to fix them:

```bash
# If you get timeout errors, try increasing timeout in cucumber.json

# If browsers won't install, try:
npx playwright install --force

# If you get permission errors on Windows:
# Run PowerShell as Administrator and try again

# If tests are slow:
# Check your internet connection - the framework uses example.com for testing
```

## 🚀 Getting Started Checklist

New here? Follow this checklist and you'll be testing like a pro in no time! ✅

- [ ] **Get the code**
  ```bash
  git clone <repository-url>
  cd playwright-frameworkUIOnly
  ```

- [ ] **Install everything**
  ```bash
  npm install
  ```

- [ ] **Get the browsers**
  ```bash
  npx playwright install
  ```

- [ ] **Check if everything works**
  ```bash
  npx cucumber-js --version
  npx playwright --version
  ```

- [ ] **Run your first test**
  ```bash
  npm run test:tags @basic
  ```

- [ ] **Try some navigation tests**
  ```bash
  npm run test:tags @navigation
  ```

- [ ] **Check out the reports**
  ```bash
  npm run test:report
  start reports/cucumber-report.html
  ```

- [ ] **Make it yours**
  - Update URLs in `src/utils/config.ts`
  - Create your own Page Objects
  - Write your own awesome features

## 🤝 Contributing - Join the Fun!

Want to make this framework even better? Awesome! Here's how:

1. **Fork the project** - Make your own copy
2. **Create a feature branch** - `git checkout -b feature/AmazingFeature`
3. **Make your changes** - Add your awesome improvements
4. **Commit your work** - `git commit -m 'Add some AmazingFeature'`
5. **Push to your branch** - `git push origin feature/AmazingFeature`
6. **Open a Pull Request** - Let's see what you've got!

## 📄 License

This project is under the ISC License - feel free to use it!

## 🆘 Need Help?

Stuck? Don't worry, we've got your back! Here's what to do:

1. **Check this documentation** - It's pretty comprehensive!
2. **Look at existing issues** - Someone might have had the same problem
3. **Create a new issue** - Tell us what's going wrong

## 📞 Quick Help - Emergency Commands

**Something's not working?** Try these commands in order:

```bash
# 1. Check if everything is installed
npm --version && node --version

# 2. Reinstall if needed
npm run clean && npm install

# 3. Reinstall browsers
npx playwright install --force

# 4. Run basic test
npm run test:tags @basic

# 5. If still having issues, get more info
npm test -- --verbose
```

---

**That's it! You're all set to start testing like a pro! 🎉**

Happy testing, and remember - every bug you find is one less bug your users will see! 🐛➡️✅
>>>>>>> Stashed changes
