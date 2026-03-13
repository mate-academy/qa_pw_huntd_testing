import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const isCI = !!process.env.CI;
const baseURL = process.env.BASE_URL ?? 'https://huntd.tech';
const headless = process.env.HEADLESS ? process.env.HEADLESS !== 'false' : true;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 2 : undefined,
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  reporter: [
  ['html', { open: 'never' }],
  ['list'],
  ['allure-playwright']
],
  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless,
    viewport: { width: 1440, height: 900 },
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
  outputDir: 'test-results',
});
