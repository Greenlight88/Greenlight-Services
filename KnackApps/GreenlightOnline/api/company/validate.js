/**
 * Company Validation Endpoint (Pre-submission)
 * POST /api/company/validate
 *
 * Checks for duplicate companies and contact conflicts before form submission.
 * Replaces Make.com webhook: https://hook.us1.make.com/k5x6x9cgrnxeotdocoqmkvfspe495am4
 */

// For Vercel serverless, we need to handle the module paths differently
const path = require('path');

// Load environment variables in local development
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: path.join(__dirname, '../../.env.local') });
}

const knack = require('../../lib/knack-api');
const { validateEmail } = require('../../lib/mailersend');
const { analyzeCCNConflicts, buildResponse } = require('../../lib/duplicate-detection');
const { logRequest } = require('../../db/client');

// Knack object IDs
const OBJECTS = {
    ENT: 'object_54',   // Entities
    ECN: 'object_187',  // Entity Connections (for company name search)
    CCN: 'object_189',  // Communication Connections (for contact conflicts)
    COM: 'object_188'   // Communication Channels
};

// Field IDs for searches
const FIELDS = {
    COMPANY_SEARCH: 'field_4059',       // Normalized company name for search
    COMPANY_SHORT_SEARCH: 'field_4134', // Short name for search
    CCN_CONTACT_VALUE: 'field_4064',    // Normalized contact value in CCN
    CCN_CONTACT_TYPE: 'field_4012'      // Email or Phone
};

/**
 * Search for duplicate company by name in ENT table
 * Matches Make.com logic: OR filter on field_4059 and field_4134
 */
async function searchCompanyDuplicate(companySearch, companyShortSearch) {
    if (!companySearch) {
        return null;
    }

    console.log(`🔍 Searching ENT for company: "${companySearch}"${companyShortSearch ? `, short: "${companyShortSearch}"` : ''}`);

    // Build OR filter matching Make.com logic:
    // field_4059 = company_search OR field_4134 = company_short_search
    // OR field_4059 = company_short_search OR field_4134 = company_search
    const filters = {
        match: 'or',
        rules: [
            { field: FIELDS.COMPANY_SEARCH, operator: 'is', value: companySearch }
        ]
    };

    // Add short name filters if provided (cross-match both fields)
    if (companyShortSearch && companyShortSearch !== companySearch) {
        filters.rules.push(
            { field: FIELDS.COMPANY_SHORT_SEARCH, operator: 'is', value: companyShortSearch },
            { field: FIELDS.COMPANY_SEARCH, operator: 'is', value: companyShortSearch },
            { field: FIELDS.COMPANY_SHORT_SEARCH, operator: 'is', value: companySearch }
        );
    }

    try {
        // Search ENT table (object_54) for duplicate company names
        const result = await knack.search(OBJECTS.ENT, [filters], { limit: 1 });

        if (result.records && result.records.length > 0) {
            const duplicate = result.records[0];
            console.log(`⚠️ Duplicate company found: ${duplicate.id}`);
            return {
                id: duplicate.id,
                name: duplicate.field_977 || duplicate.identifier,
                view_link: `#companies/view-company-details/${duplicate.id}/`
            };
        }

        console.log('✓ No duplicate company found');
        return null;
    } catch (error) {
        console.error('Error searching for company duplicate:', error);
        throw error;
    }
}

/**
 * Search for existing contacts (email/phone) in CCN table
 * Then enrich with ENT details (entity names) via secondary lookups
 * Returns { records: [], debugTrace: [] }
 */
async function searchContactConflicts(emailNormalised, phoneNormalised) {
    // Build filters for email and phone
    const filterRules = [];

    if (emailNormalised) {
        filterRules.push({
            field: FIELDS.CCN_CONTACT_VALUE,
            operator: 'is',
            value: emailNormalised.toLowerCase()
        });
    }

    if (phoneNormalised) {
        filterRules.push({
            field: FIELDS.CCN_CONTACT_VALUE,
            operator: 'is',
            value: phoneNormalised
        });
    }

    if (filterRules.length === 0) {
        console.log('ℹ️ No email or phone to check for conflicts');
        return { records: [], debugTrace: [] };
    }

    const filters = {
        match: 'or',
        rules: filterRules
    };

    console.log(`🔍 Searching for contact conflicts...`);

    try {
        const result = await knack.search(OBJECTS.CCN, [filters], { limit: 100 });

        if (!result.records || result.records.length === 0) {
            console.log('✓ No contact conflicts found');
            return { records: [], debugTrace: [] };
        }

        console.log(`📋 Found ${result.records.length} potential CCN conflict(s)`);

        // Enrich CCN records with entity names (like Make.com modules 550/551)
        const { records: enrichedRecords, debugTrace } = await enrichCCNWithEntityNames(result.records);
        return { records: enrichedRecords, debugTrace };

    } catch (error) {
        console.error('Error searching for contact conflicts:', error);
        throw error;
    }
}

/**
 * Enrich CCN records with entity names from ENT table
 * Mirrors Make.com's secondary API calls to fetch full entity details
 * Returns { records: enrichedRecords, debugTrace: [] }
 */
async function enrichCCNWithEntityNames(ccnRecords) {
    const enriched = [];
    const debugTrace = [];

    for (const ccn of ccnRecords) {
        const trace = {
            ccn_id: ccn.id,
            steps: [],
            result: null
        };

        trace.steps.push({
            step: 'CCN record',
            field_4121: ccn.field_4121 || null,
            field_4121_raw: ccn.field_4121_raw || null
        });

        // Get the ECN ID from the CCN's entity connection
        // CCN connects to ECN (field_4121), and ECN connects to ENT (field_3858)
        const ecnId = ccn.field_4121_raw?.[0]?.id;

        let entityName = 'Unknown Entity';
        let entId = null;

        if (ecnId) {
            try {
                // Fetch the ECN record to get the ENT connection
                const ecnRecord = await knack.get(OBJECTS.ECN, ecnId);
                trace.steps.push({
                    step: 'ECN fetch',
                    ecn_id: ecnId,
                    field_3858: ecnRecord.field_3858 || null,
                    field_3858_raw: ecnRecord.field_3858_raw || null
                });

                // ECN.field_3858 contains the ENT connection
                entId = ecnRecord.field_3858_raw?.[0]?.id;

                if (entId) {
                    // Fetch the ENT record to get the entity name
                    const entRecord = await knack.get(OBJECTS.ENT, entId);
                    trace.steps.push({
                        step: 'ENT fetch',
                        ent_id: entId,
                        field_977: entRecord.field_977 || null,
                        field_3860: entRecord.field_3860 || null,
                        field_4014: entRecord.field_4014 || null,
                        entity_type: entRecord.field_3845 || null
                    });
                    // Entity name varies by type:
                    // - Companies: field_977 (company name)
                    // - Individuals: field_3860 (person name) or field_3860_raw.full
                    // - Universal: field_4014 (display name field)
                    entityName = entRecord.field_4014 ||
                                 entRecord.field_977 ||
                                 entRecord.field_3860_raw?.full ||
                                 entRecord.field_3860 ||
                                 'Unknown Entity';
                } else {
                    trace.steps.push({
                        step: 'ENT fetch skipped',
                        reason: 'No ENT ID in ECN.field_3858_raw'
                    });
                }
            } catch (err) {
                trace.steps.push({
                    step: 'Error',
                    error: err.message
                });
            }
        } else {
            trace.steps.push({
                step: 'ECN fetch skipped',
                reason: 'No ECN ID in CCN.field_4121_raw'
            });
        }

        trace.result = { entityName, entId };
        debugTrace.push(trace);

        enriched.push({
            ...ccn,
            _enriched_entity_name: entityName,
            _enriched_ent_id: entId
        });
    }

    return { records: enriched, debugTrace };
}

/**
 * Main handler for the validate endpoint
 */
async function handler(req, res) {
    const startTime = Date.now();

    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        return res.status(200).end();
    }

    // Only accept POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');

    console.log('\n========================================');
    console.log('📥 Company Validation Request');
    console.log('========================================');

    // Helper to send response and log it
    const sendResponse = async (response, outcome, errorMessage = null) => {
        const durationMs = Date.now() - startTime;

        // Log to database (non-blocking)
        logRequest({
            endpoint: '/api/company/validate',
            method: 'POST',
            requestPayload: req.body,
            responsePayload: response,
            outcome,
            durationMs,
            errorMessage,
            viewId: req.body?.view,
            userId: req.body?.current_user?.id,
            tenantId: req.body?.tenant_id,
            ipAddress: req.headers['x-forwarded-for'] || req.socket?.remoteAddress,
            userAgent: req.headers['user-agent']
        }).catch(err => console.error('Logging failed:', err.message));

        console.log(`⏱️ Request completed in ${durationMs}ms`);
        return res.json(response);
    };

    try {
        const body = req.body;

        // Extract data from request
        const {
            view,
            form_type,
            tenant_id,
            current_user,
            company_name_normalised,
            company_search,
            company_short_search,
            email_normalised,
            phone_normalised,
            allow_emails,
            is_test,
            data  // Nested data object (backup)
        } = body;

        // Use nested data as fallback
        const companySearch = company_search || data?.company_search || '';
        const companyShortSearch = company_short_search || data?.company_short_search || '';
        const emailNormalised = email_normalised || data?.email_normalised || '';
        const phoneNormalised = phone_normalised || data?.phone_normalised || '';
        const companyNameNormalised = company_name_normalised || data?.company_name_normalised || '';
        const allowEmails = allow_emails || data?.allow_emails || '';
        const isTest = is_test === true || is_test === 'Yes' || data?.is_test === true;

        console.log('Request data:', {
            view,
            companySearch,
            emailNormalised: emailNormalised || '(none)',
            phoneNormalised: phoneNormalised || '(none)',
            allowEmails,
            isTest
        });

        // Step 1: Check for duplicate company name
        const companyDuplicate = await searchCompanyDuplicate(companySearch, companyShortSearch);

        // If duplicate found, return block immediately
        if (companyDuplicate) {
            const response = buildResponse({
                companyDuplicate,
                contactAnalysis: { email_matches: [], phone_matches: [] },
                emailValidation: null,
                companyNameNormalised,
                isTest
            });
            console.log('📤 Response: BLOCK (duplicate company)');
            return sendResponse(response, 'block');
        }

        // Step 2: Validate email with MailerSend (if provided and not bypassed)
        const emailValidation = await validateEmail(emailNormalised, allowEmails === 'Yes');

        // If email is invalid, return block immediately
        if (emailValidation.action === 'block') {
            const response = buildResponse({
                companyDuplicate: null,
                contactAnalysis: { email_matches: [], phone_matches: [] },
                emailValidation,
                companyNameNormalised,
                isTest
            });
            console.log('📤 Response: BLOCK (invalid email)');
            return sendResponse(response, 'block');
        }

        // Step 3: Search for contact conflicts
        const { records: ccnRecords, debugTrace: ccnDebugTrace } = await searchContactConflicts(emailNormalised, phoneNormalised);
        const contactAnalysis = analyzeCCNConflicts(ccnRecords, emailNormalised, phoneNormalised);

        // Attach debug trace to contact analysis for logging
        contactAnalysis.debugTrace = ccnDebugTrace;

        // Step 4: Build and return response
        const response = buildResponse({
            companyDuplicate: null,
            contactAnalysis,
            emailValidation,
            companyNameNormalised,
            isTest
        });

        // Add debug trace to response for database logging
        if (ccnDebugTrace && ccnDebugTrace.length > 0) {
            response._debug = { ccnEnrichmentTrace: ccnDebugTrace };
        }

        console.log(`📤 Response: ${response.action_required.toUpperCase()}`);
        return sendResponse(response, response.action_required);

    } catch (error) {
        console.error('❌ Validation error:', error);
        const errorResponse = {
            error: 'Internal server error',
            message: error.message,
            action_required: 'error'
        };
        return sendResponse(errorResponse, 'error', error.message);
    }
}

// Export for Vercel serverless
module.exports = handler;

// Also export for Express (local development)
module.exports.handler = handler;
