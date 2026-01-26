// @ts-check
const { defineConfig } = require('@playwright/test');

/**
 * Playwright configuration for Greenlight Online E2E tests
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
    testDir: './tests/e2e',

    // Run tests sequentially for now (form flows depend on each other)
    fullyParallel: false,

    // Fail the build on CI if you accidentally left test.only in the source code
    forbidOnly: !!process.env.CI,

    // Retry failed tests once
    retries: 1,

    // Single worker for sequential tests
    workers: 1,

    // Reporter - use 'html' for detailed reports, 'list' for console output
    reporter: [
        ['list'],
        ['html', { open: 'never' }]
    ],

    // Shared settings for all projects
    use: {
        // Base URL for the Knack app
        baseURL: 'https://builder.knack.com/greenlight/greenlight-services-3',

        // Capture screenshot on failure
        screenshot: 'only-on-failure',

        // Record video on failure
        video: 'retain-on-failure',

        // Capture trace on failure for debugging
        trace: 'retain-on-failure',

        // Slow down actions for visibility (remove for faster tests)
        // slowMo: 500,
    },

    // Configure projects for different scenarios
    projects: [
        {
            name: 'chromium',
            use: {
                browserName: 'chromium',
                // Use headed mode for debugging (set to false for CI)
                headless: false,
                viewport: { width: 1280, height: 720 },
            },
        },
    ],

    // Local dev server (optional - for API endpoint testing)
    // webServer: {
    //     command: 'node server.js',
    //     port: 3001,
    //     reuseExistingServer: true,
    // },
});
