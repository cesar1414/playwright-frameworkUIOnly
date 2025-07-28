export interface TestConfig {
  baseUrl: string;
  headless: boolean;
  timeout: number;
  retries: number;
  viewport: {
    width: number;
    height: number;
  };
  screenshot: 'off' | 'on' | 'only-on-failure';
  video: 'off' | 'on' | 'retain-on-failure' | 'on-first-retry';
  browser: 'chromium' | 'firefox' | 'webkit';
  slowMo: number;
}

export interface EnvironmentConfig {
  development: TestConfig;
  staging: TestConfig;
  production: TestConfig;
}

const environments: EnvironmentConfig = {
  development: {
    baseUrl: 'https://example.com',
    headless: false,
    timeout: 30000,
    retries: 1,
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    browser: 'chromium',
    slowMo: 1000
  },
  staging: {
    baseUrl: 'https://staging.example.com',
    headless: true,
    timeout: 60000,
    retries: 2,
    viewport: { width: 1920, height: 1080 },
    screenshot: 'on',
    video: 'on',
    browser: 'chromium',
    slowMo: 0
  },
  production: {
    baseUrl: 'https://www.example.com',
    headless: true,
    timeout: 60000,
    retries: 3,
    viewport: { width: 1920, height: 1080 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    browser: 'chromium',
    slowMo: 0
  }
};

export function getConfig(environment: keyof EnvironmentConfig = 'development'): TestConfig {
  return environments[environment];
}

export function getBaseUrl(environment: keyof EnvironmentConfig = 'development'): string {
  return environments[environment].baseUrl;
}

export function isHeadless(environment: keyof EnvironmentConfig = 'development'): boolean {
  return environments[environment].headless;
}

export function getTimeout(environment: keyof EnvironmentConfig = 'development'): number {
  return environments[environment].timeout;
}
