import { PlaywrightTestConfig } from '@playwright/test';
import { getConfig } from './src/utils/config';

const config: PlaywrightTestConfig = {
  timeout: 30000,
  retries: 1,
  use: {
    headless: false, // Cambiar a `true` en CI
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit' },
    },
  ],
  reporter: [
    ['html', { outputFolder: 'reports/playwright-report' }],
    ['json', { outputFile: 'reports/results.json' }],
    ['junit', { outputFile: 'reports/junit.xml' }]
  ],
  outputDir: 'reports/test-results/',
  globalSetup: require.resolve('./src/support/globalSetup.ts'),
  globalTeardown: require.resolve('./src/support/globalTeardown.ts'),
};

export default config;