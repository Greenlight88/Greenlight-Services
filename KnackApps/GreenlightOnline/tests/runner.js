#!/usr/bin/env node
/**
 * Test Runner for Company Creation Flows
 *
 * Usage:
 *   node tests/runner.js                      # Run all scenarios against production
 *   node tests/runner.js --local              # Run against localhost:3001
 *   node tests/runner.js --scenario="Full"    # Run scenarios matching "Full"
 *   node tests/runner.js --validate-only      # Only test validate endpoint (skip proceed)
 *   node tests/runner.js --dry-run            # Show what would be tested without running
 *   node tests/runner.js --mock-mailersend    # Use mock email validation (syntax check only)
 */

const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const companyScenarios = require('./scenarios/company-creation');
const { verifyKnackRecords } = require('./helpers/knack-verifier');

// Configuration
const PRODUCTION_URL = 'https://greenlight-services-3.vercel.app';
const LOCAL_URL = 'http://localhost:3001';
const WAIT_AFTER_PROCEED_MS = 5000; // Wait for background processing

// Parse command line arguments
const args = process.argv.slice(2);
const isLocal = args.includes('--local');
const validateOnly = args.includes('--validate-only');
const dryRun = args.includes('--dry-run');
const mockMailersend = args.includes('--mock-mailersend');
const scenarioFilter = args.find(a => a.startsWith('--scenario='))?.split('=')[1];

// Set mock mode for MailerSend (local server will pick this up)
if (mockMailersend) {
    process.env.MOCK_MAILERSEND = 'true';
}

const BASE_URL = isLocal ? LOCAL_URL : PRODUCTION_URL;

// Test utilities
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function generateTestId() {
    return `test_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
}

/**
 * Build validate payload from scenario input
 */
function buildValidatePayload(input, testId) {
    const payload = {
        view: 'view_4059',
        form_type: 'company_creation',
        tenant_id: process.env.TEST_TENANT_ID || '5f8c3e8f91fc1f001f8e8f8f',
        current_user: {
            id: process.env.TEST_USER_ID || '5f8c3e8f91fc1f001f8e8f8f'
        },
        is_test: true,
        test_id: testId
    };

    // Company name
    if (input.company_name) {
        payload.company_name_normalised = input.company_name;
        payload.company_search = input.company_name.toLowerCase().replace(/[^a-z0-9]/g, '');
        payload.company_short_search = payload.company_search.slice(0, 10);
    }

    // Email
    if (input.email) {
        payload.email_normalised = input.email.toLowerCase();
    }

    // Phone
    if (input.phone) {
        payload.phone_normalised = input.phone.replace(/\D/g, '');
    }

    // Address
    if (input.address) {
        payload.street_address_search = input.address.formatted || input.address;
        payload.address_street = input.address.street;
        payload.address_city = input.address.city;
        payload.address_state = input.address.state;
        payload.address_zip = input.address.zip;
    }

    return payload;
}

/**
 * Build proceed payload from validate result
 */
function buildProceedPayload(input, validateResult, testId) {
    const payload = {
        ...buildValidatePayload(input, testId),
        validation_passed: true
    };

    // Add any fields from validate response needed for proceed
    if (validateResult.email_validation) {
        payload.email_validation = validateResult.email_validation;
    }

    return payload;
}

/**
 * Run a single test scenario
 */
async function runScenario(scenario) {
    const testId = generateTestId();
    const results = {
        name: scenario.name,
        testId,
        passed: false,
        validateResult: null,
        proceedResult: null,
        verificationResult: null,
        errors: [],
        duration: 0
    };

    const startTime = Date.now();

    try {
        console.log(`\n${'='.repeat(60)}`);
        console.log(`\u25b6 ${scenario.name}`);
        console.log(`  Test ID: ${testId}`);

        // Skip scenarios that require seed data
        if (scenario.setup?.requires_seed_data) {
            console.log('  \u23ed Skipping: requires pre-seeded test data');
            results.skipped = true;
            results.passed = true;
            return results;
        }

        // Skip scenarios that require MailerSend API (unless running locally with mock or has API key)
        const hasMailerSend = process.env.MAILERSEND_API_KEY || (isLocal && process.env.MOCK_MAILERSEND === 'true');
        if (scenario.setup?.requires_mailersend_api && !hasMailerSend) {
            console.log('  \u23ed Skipping: requires MAILERSEND_API_KEY or --local with MOCK_MAILERSEND');
            results.skipped = true;
            results.passed = true;
            return results;
        }

        // Build and send validate request
        const validatePayload = buildValidatePayload(scenario.input, testId);
        console.log('  \u2192 Calling validate endpoint...');

        if (dryRun) {
            console.log('  [DRY RUN] Would send:', JSON.stringify(validatePayload, null, 2));
            results.passed = true;
            results.dryRun = true;
            return results;
        }

        const validateResponse = await fetch(`${BASE_URL}/api/company/validate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(validatePayload)
        });

        if (!validateResponse.ok) {
            throw new Error(`Validate HTTP error: ${validateResponse.status}`);
        }

        results.validateResult = await validateResponse.json();
        console.log(`  \u2190 Validate response: ${results.validateResult.action_required}`);

        // Check validate expectation
        if (results.validateResult.action_required !== scenario.expect.validate) {
            results.errors.push(
                `Validate: expected "${scenario.expect.validate}", got "${results.validateResult.action_required}"`
            );
        }

        // If blocked or confirm, we're done with this scenario
        if (scenario.expect.validate !== 'proceed' || validateOnly) {
            if (scenario.expect.validate === 'block' && results.validateResult.action_required === 'block') {
                console.log('  \u2713 Correctly blocked');
            } else if (scenario.expect.validate === 'confirm' && results.validateResult.action_required === 'confirm') {
                console.log('  \u2713 Correctly requires confirmation');
                // Verify conflict type if specified
                if (scenario.expect.conflict_type) {
                    const hasConflict = results.validateResult.conflicts?.some(
                        c => c.type === scenario.expect.conflict_type
                    );
                    if (!hasConflict) {
                        results.errors.push(`Expected ${scenario.expect.conflict_type} conflict`);
                    }
                }
            }
            results.passed = results.errors.length === 0;
            results.duration = Date.now() - startTime;
            return results;
        }

        // Proceed with creation
        const proceedPayload = buildProceedPayload(scenario.input, results.validateResult, testId);
        console.log('  \u2192 Calling proceed endpoint...');

        const proceedResponse = await fetch(`${BASE_URL}/api/company/proceed`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(proceedPayload)
        });

        if (!proceedResponse.ok) {
            throw new Error(`Proceed HTTP error: ${proceedResponse.status}`);
        }

        results.proceedResult = await proceedResponse.json();
        console.log(`  \u2190 Proceed response: ECN ${results.proceedResult.ecn_id || 'N/A'}`);

        // Wait for background processing
        if (results.proceedResult.ecn_id && scenario.expect.proceed) {
            console.log(`  \u23f3 Waiting ${WAIT_AFTER_PROCEED_MS}ms for background processing...`);
            await sleep(WAIT_AFTER_PROCEED_MS);

            // Verify records in Knack
            console.log('  \u2192 Verifying records in Knack...');
            results.verificationResult = await verifyKnackRecords(
                results.proceedResult.ecn_id,
                scenario.expect.proceed
            );

            if (results.verificationResult.passed) {
                console.log('  \u2713 All verifications passed');
            } else {
                console.log('  \u2717 Verification failed:');
                results.verificationResult.errors.forEach(err => {
                    console.log(`    - ${err}`);
                    results.errors.push(err);
                });
            }
        }

        results.passed = results.errors.length === 0;
        results.duration = Date.now() - startTime;

    } catch (error) {
        results.errors.push(`Error: ${error.message}`);
        results.duration = Date.now() - startTime;
        console.log(`  \u2717 Error: ${error.message}`);
    }

    return results;
}

/**
 * Main test runner
 */
async function main() {
    console.log('\n' + '='.repeat(60));
    console.log('COMPANY CREATION TEST RUNNER');
    console.log('='.repeat(60));
    console.log(`Target: ${BASE_URL}`);
    console.log(`Mode: ${dryRun ? 'DRY RUN' : validateOnly ? 'VALIDATE ONLY' : 'FULL'}`);

    // Filter scenarios if specified
    let scenarios = companyScenarios;
    if (scenarioFilter) {
        scenarios = scenarios.filter(s =>
            s.name.toLowerCase().includes(scenarioFilter.toLowerCase())
        );
        console.log(`Filter: "${scenarioFilter}" (${scenarios.length} matching)`);
    }

    console.log(`Scenarios: ${scenarios.length}`);

    const results = [];
    const startTime = Date.now();

    for (const scenario of scenarios) {
        const result = await runScenario(scenario);
        results.push(result);
    }

    // Summary
    const totalDuration = Date.now() - startTime;
    const passed = results.filter(r => r.passed).length;
    const failed = results.filter(r => !r.passed && !r.skipped).length;
    const skipped = results.filter(r => r.skipped).length;

    console.log('\n' + '='.repeat(60));
    console.log('SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total:   ${results.length}`);
    console.log(`Passed:  ${passed} \u2713`);
    console.log(`Failed:  ${failed} ${failed > 0 ? '\u2717' : ''}`);
    console.log(`Skipped: ${skipped}`);
    console.log(`Duration: ${(totalDuration / 1000).toFixed(1)}s`);

    if (failed > 0) {
        console.log('\nFailed scenarios:');
        results.filter(r => !r.passed && !r.skipped).forEach(r => {
            console.log(`  - ${r.name}`);
            r.errors.forEach(e => console.log(`    ${e}`));
        });
    }

    // Exit with error code if any failed
    process.exit(failed > 0 ? 1 : 0);
}

// Run if called directly
if (require.main === module) {
    main().catch(err => {
        console.error('Runner error:', err);
        process.exit(1);
    });
}

module.exports = { runScenario, buildValidatePayload, buildProceedPayload };
