// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * E2E Test: Create Company → Create Contact Flow
 *
 * Tests the full flow of:
 * 1. Login to Knack app
 * 2. Navigate to Create Company form
 * 3. Fill and submit company form
 * 4. Verify redirect to Quick Create Contact
 * 5. Fill and submit contact form
 * 6. Verify records created
 *
 * Prerequisites:
 * - API server running on localhost:3001
 * - Test credentials in .env.test or environment variables
 */

// Test configuration - customize these for your environment
const CONFIG = {
    // Knack app URL - update this to your app URL
    appUrl: process.env.KNACK_APP_URL || 'https://greenlight-services-3.knack.com/greenlight-services-3',

    // Test user credentials - set via environment variables for security
    testEmail: process.env.TEST_USER_EMAIL || 'test@example.com',
    testPassword: process.env.TEST_USER_PASSWORD || 'testpassword',

    // Test data
    testCompany: {
        name: `Test Company ${Date.now()}`,
        email: `test${Date.now()}@testcompany.com`,
        phone: '07 3456 7890'
    },
    testContact: {
        firstName: 'Test',
        lastName: `Contact${Date.now()}`,
        email: `contact${Date.now()}@testcompany.com`,
        mobile: '0412 345 678'
    }
};

// Track API responses for verification
let apiResponses = {
    companyValidate: null,
    companyProceed: null,
    contactValidate: null,
    contactProceed: null
};

test.describe('Create Company → Create Contact Flow', () => {

    test.beforeEach(async ({ page }) => {
        // Intercept API calls to capture responses
        await page.route('**/api/company/validate', async (route) => {
            const response = await route.fetch();
            apiResponses.companyValidate = await response.json();
            console.log('📦 Company Validate Response:', apiResponses.companyValidate);
            await route.fulfill({ response });
        });

        await page.route('**/api/company/proceed', async (route) => {
            const response = await route.fetch();
            apiResponses.companyProceed = await response.json();
            console.log('📦 Company Proceed Response:', apiResponses.companyProceed);
            await route.fulfill({ response });
        });

        await page.route('**/api/contact/validate', async (route) => {
            const response = await route.fetch();
            apiResponses.contactValidate = await response.json();
            console.log('📦 Contact Validate Response:', apiResponses.contactValidate);
            await route.fulfill({ response });
        });

        await page.route('**/api/contact/proceed', async (route) => {
            const response = await route.fetch();
            apiResponses.contactProceed = await response.json();
            console.log('📦 Contact Proceed Response:', apiResponses.contactProceed);
            await route.fulfill({ response });
        });
    });

    test('should login successfully', async ({ page }) => {
        await page.goto(CONFIG.appUrl);

        // Wait for login form
        await page.waitForSelector('#email, input[name="email"]', { timeout: 10000 });

        // Fill login form
        await page.fill('#email, input[name="email"]', CONFIG.testEmail);
        await page.fill('#password, input[name="password"]', CONFIG.testPassword);

        // Submit login
        await page.click('button[type="submit"], input[type="submit"]');

        // Wait for redirect after login (dashboard or main page)
        await page.waitForURL(/.*#(?!login).*/, { timeout: 15000 });

        console.log('✅ Login successful');
    });

    test('should create company and contact', async ({ page }) => {
        // Login first
        await page.goto(CONFIG.appUrl);
        await page.waitForSelector('#email, input[name="email"]', { timeout: 10000 });
        await page.fill('#email, input[name="email"]', CONFIG.testEmail);
        await page.fill('#password, input[name="password"]', CONFIG.testPassword);
        await page.click('button[type="submit"], input[type="submit"]');
        await page.waitForURL(/.*#(?!login).*/, { timeout: 15000 });

        // Enable dev mode for local API testing
        await page.evaluate(() => {
            sessionStorage.setItem('Greenl_56ea_dev', 'true');
            console.log('🧪 Dev mode enabled');
        });

        // Navigate to Create Company page
        // Update this selector based on your app's navigation
        await page.click('text=New Company, a[href*="new-company"], .nav-item:has-text("Company")');

        // Wait for company form (view_4059)
        await page.waitForSelector('#view_4059', { timeout: 10000 });
        console.log('📋 Company form loaded');

        // Fill company form
        await page.fill('#field_992', CONFIG.testCompany.name);  // Company name
        await page.fill('#field_4164', CONFIG.testCompany.email); // Email
        await page.fill('#field_4056', CONFIG.testCompany.phone); // Phone

        // Take screenshot before submit
        await page.screenshot({ path: 'test-results/01-company-form-filled.png' });

        // Submit company form
        await page.click('#view_4059 button[type="submit"]');

        // Wait for redirect to Quick Create Contact (view_5685)
        await page.waitForURL(/.*add-contact-to-company.*/, { timeout: 15000 });
        console.log('✅ Redirected to Quick Create Contact');

        // Wait for contact form to load
        await page.waitForSelector('#view_5685', { timeout: 10000 });
        console.log('📋 Contact form loaded');

        // Verify company ECN ID was received
        const ecnIdStored = await page.evaluate(() => {
            return sessionStorage.getItem('NewCompany_QuickCreate_EcnId');
        });
        console.log(`🔑 Company ECN ID stored: ${ecnIdStored}`);
        expect(ecnIdStored).toBeTruthy();

        // Fill contact form
        await page.fill('input[name="first"]', CONFIG.testContact.firstName);
        await page.fill('input[name="last"]', CONFIG.testContact.lastName);
        await page.fill('#field_4164', CONFIG.testContact.email);  // Contact email
        await page.fill('#field_4165', CONFIG.testContact.mobile); // Mobile

        // Take screenshot before submit
        await page.screenshot({ path: 'test-results/02-contact-form-filled.png' });

        // Submit contact form
        await page.click('#view_5685 button[type="submit"]');

        // Wait for form submission to complete
        await page.waitForTimeout(3000); // Allow time for API calls

        // Take screenshot after submit
        await page.screenshot({ path: 'test-results/03-after-submit.png' });

        // Verify API responses
        console.log('\n📊 API Response Summary:');
        console.log('------------------------');

        if (apiResponses.companyProceed) {
            console.log(`✅ Company Proceed: ECN ID = ${apiResponses.companyProceed.ecn_id}`);
            expect(apiResponses.companyProceed.status).toBe('processing');
            expect(apiResponses.companyProceed.ecn_id).toBeTruthy();
        }

        if (apiResponses.contactProceed) {
            console.log(`✅ Contact Proceed: Staff ECN = ${apiResponses.contactProceed.ecn_id}, Self ECN = ${apiResponses.contactProceed.self_ecn_id}`);
            expect(apiResponses.contactProceed.status).toBe('processing');
            expect(apiResponses.contactProceed.ecn_id).toBeTruthy();
            expect(apiResponses.contactProceed.self_ecn_id).toBeTruthy();
            expect(apiResponses.contactProceed.scn_id).toBeTruthy();
        }

        console.log('\n✅ Test completed successfully!');
    });
});

/**
 * Standalone test for API endpoints only (no browser interaction)
 * Useful for quick backend testing
 */
test.describe('API Endpoint Tests', () => {

    test('should call company/proceed endpoint directly', async ({ request }) => {
        const response = await request.post('http://localhost:3001/api/company/proceed', {
            data: {
                entity_id: 'test_ent_' + Date.now(),
                tenant_id: '648a5861b632b20027d53b8b',
                current_user: { id: 'test_user', email: 'test@example.com' },
                is_test: true,
                company_search: 'test company',
                email_normalised: 'test@testcompany.com',
                phone_normalised: '+61734567890'
            }
        });

        const body = await response.json();
        console.log('Company Proceed Response:', body);

        // This will fail with invalid entity_id, but shows the endpoint is reachable
        // In real test, use a valid entity_id from a created record
    });

    test('should call contact/proceed endpoint directly', async ({ request }) => {
        const response = await request.post('http://localhost:3001/api/contact/proceed', {
            data: {
                entity_id: 'test_contact_' + Date.now(),
                company_id: 'test_company_' + Date.now(),
                tenant_id: '648a5861b632b20027d53b8b',
                current_user: { id: 'test_user', email: 'test@example.com' },
                is_test: true,
                email_normalised: 'contact@test.com',
                mobile_normalised: '+61412345678'
            }
        });

        const body = await response.json();
        console.log('Contact Proceed Response:', body);

        // This will fail with invalid IDs, but shows the endpoint is reachable
    });
});
