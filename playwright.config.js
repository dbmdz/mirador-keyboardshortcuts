import { defineConfig } from '@playwright/test';

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
    command: 'NODE_OPTIONS=--openssl-legacy-provider npm run start',
    port: 3000,
    timeout: 120000, // wie lange gewartet wird, bis Server läuft
    reuseExistingServer: !process.env.CI,
  },
});