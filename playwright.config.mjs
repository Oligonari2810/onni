/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: './tests/e2e',
  timeout: 30_000,
  expect: {
    timeout: 8_000,
  },
  fullyParallel: true,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:3000',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: 'npm run dev',
        url: 'http://127.0.0.1:3000',
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
}

export default config
