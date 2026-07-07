import { defineConfig, devices } from '@playwright/test';

const port = 3000;
const localBaseURL = `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: [['html', { open: 'never' }], ['list']],
  timeout: 30_000,

  use: {
    baseURL:
      process.env.BASE_URL ??
      process.env.PLAYWRIGHT_BASE_URL ??
      localBaseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10_000,
  },

  webServer: process.env.BASE_URL || process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: `npx serve app -l ${port}`,
        url: localBaseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 30_000,
      },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
