import { defineConfig } from "@playwright/test";

const baseURL = process.env.BASE_URL ?? "http://127.0.0.1:4184";

export default defineConfig({
  testDir: "./tests",
  outputDir: "./test-results",
  timeout: 30_000,
  fullyParallel: false,
  retries: 0,
  reporter: "list",
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: "npx serve out -l 4184",
        url: baseURL,
        reuseExistingServer: false,
        timeout: 20_000,
      },
  use: {
    baseURL,
    channel: "chrome",
    headless: true,
    permissions: ["clipboard-read", "clipboard-write"],
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
});
