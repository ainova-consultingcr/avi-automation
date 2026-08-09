import { defineConfig, devices } from '@playwright/test';
import { appConfig } from './config/AppConfig';
const useLocalServers =
  process.env.TEST_ENV !== 'production';
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */

console.log('TEST_ENV:', process.env.TEST_ENV);
console.log('Frontend URL:', appConfig.frontendUrl);
console.log('API URL:', appConfig.apiUrl);
console.log('Use local servers:', useLocalServers);

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
  ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ['junit', { outputFile: 'test-results/junit-results.xml' }],
],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    
      baseURL: appConfig.frontendUrl,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
      screenshot: 'only-on-failure',
      video: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
  {
    name: 'chromium',
    testMatch: /tests\/e2e\/.*\.spec\.ts/,
    use: {
      ...devices['Desktop Chrome'],
      //baseURL: 'http://localhost:5500',
       baseURL: appConfig.frontendUrl,
    },
  },

  {
    name: 'firefox',
    testMatch: /tests\/e2e\/.*\.spec\.ts/,
    use: {
      ...devices['Desktop Firefox'],
      //baseURL: 'http://localhost:5500',
       baseURL: appConfig.frontendUrl,
    },
  },

  {
    name: 'webkit',
    testMatch: /tests\/e2e\/.*\.spec\.ts/,
    use: {
      ...devices['Desktop Safari'],
      //baseURL: 'http://localhost:5500',
       baseURL: appConfig.frontendUrl,
    },
  },

  {
    name: 'api',
    testMatch: /tests\/api\/.*\.spec\.ts/,
    use: {
      //baseURL: 'http://localhost:8000',
      baseURL: appConfig.apiUrl,
    },
  },
],

 webServer: useLocalServers
  ? undefined
  : [
      {
        command: 'npx http-server . -p 5500 -c-1',
        cwd: appConfig.frontendPath,
        url: appConfig.frontendUrl,
        reuseExistingServer: !process.env.CI,
        timeout: 30_000,
      },
      {
        command: 'python -m uvicorn main:app --port 8000',
        cwd: appConfig.backendPath,
        url: `${appConfig.apiUrl}/docs`,
        reuseExistingServer: !process.env.CI,
        timeout: 60_000,
      },
    ],
});
