import { defineConfig } from '@playwright/test';

const PORT = process.env.PORT || 3000

export default defineConfig({
  use: {
    browserName: 'chromium',
    headless: true,
    timeout: 30000,
    navigationTimeout: 30000,
    expect: {
      timeout: 30000,
    },
  },
  webServer: {
    command: `npm start -- --port ${PORT}`,
    url: `http://localhost:${PORT}`,
    timeout: 120000,
    reuseExistingServer: !process.env.CI,
  },
});
