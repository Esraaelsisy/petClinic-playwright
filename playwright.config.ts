import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e', // Define test directory to point to e2e for both UI and API
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:8080',
    trace: 'on-first-retry',
    headless: process.env.HEADLESS !== 'false', // Toggle headless mode via environment variable
  },
  projects: [
    // UI Project
    {
      name: 'ui-chromium',
      testDir: 'e2e/ui/specs', // Point to your UI tests
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'ui-firefox',
      testDir: 'e2e/ui/specs', // Point to your UI tests
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'ui-webkit',
      testDir: 'e2e/ui/specs', // Point to your UI tests
      use: { ...devices['Desktop Safari'] },
    },
    // API Project
    {
      name: 'api',
      testDir: 'e2e/api/tests',  // Point to your API tests directory
      use: {
        headless: true, // API tests don't require a browser UI
      },
    },
  ],
  /*webServer: {
    command: 'npm run start',
    url: 'http://localhost:8080',
    reuseExistingServer: !process.env.CI,
  },*/
});