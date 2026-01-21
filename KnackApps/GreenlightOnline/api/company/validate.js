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

// Knack object IDs
const OBJECTS = {
    ECN: 'object_54',  // Entity Connections (for company name search)
    CCN: 'object_77',  // Communication Connections (for contact conflicts)
    COM: 'object_76'   // Communication Channels
};

// Field IDs for searches
const FIELDS = {
    COMPANY_SEARCH: 'field_4059',       // Normalized company name for search
    COMPANY_SHORT_SEARCH: 'field_4134', // Short name for search
    CCN_CONTACT_VALUE: 'field_4064',    // Normalized contact value in CCN
    CCN_CONTACT_TYPE: 'field_4012'      // Email or Phone
};

/**
 * Search for duplicate company by name
 */
async function searchCompanyDuplicate(companySearch, companyShortSearch) {
    if (!companySearch) {
        return null;
    }

    console.log(`🔍 Searching for company: "${companySearch}"`);

    // Build OR filter: match company_search OR company_short_search
    const filters = {
        match: 'or',
        rules: [
            { field: FIELDS.COMPANY_SEARCH, operator: 'is', value: companySearch }
        ]
    };

    // Add short name filter if provided
    if (companyShortSearch && companyShortSearch !== companySearch) {
        filters.rules.push(
            { field: FIELDS.COMPANY_SHORT_SEARCH, operator: 'is', value: companySearch },
            { field: FIELDS.COMPANY_SEARCH, operator: 'is', value: companyShortSearch },
            { field: FIELDS.COMPANY_SHORT_SEARCH, operator: 'is', value: companyShortSearch }
        );
    }

    try {
        const result = await knack.search(OBJECTS.ECN, [filters], { limit: 1 });

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
 */
async function searchContactConflicts(emailNormalised, phoneNormalised) {
    const conflicts = [];

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
        return [];
    }

    const filters = {
        match: 'or',
        rules: filterRules
    };

    console.log(`🔍 Searching for contact conflicts...`);

    try {
        const result = await knack.search(OBJECTS.CCN, [filters], { limit: 100 });

        if (result.records && result.records.length > 0) {
            console.log(`📋 Found ${result.records.length} potential CCN conflict(s)`);
            return result.records;
        }

        console.log('✓ No contact conflicts found');
        return [];
    } catch (error) {
        console.error('Error searching for contact conflicts:', error);
        throw error;
    }
}

/**
 * Main handler for the validate endpoint
 */
async function handler(req, res) {
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
            emailNormalised: emailNormalised ? '***' : '(none)',
            phoneNormalised: phoneNormalised ? '***' : '(none)',
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
            return res.json(response);
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
            return res.json(response);
        }

        // Step 3: Search for contact conflicts
        const ccnResults = await searchContactConflicts(emailNormalised, phoneNormalised);
        const contactAnalysis = analyzeCCNConflicts(ccnResults, emailNormalised, phoneNormalised);

        // Step 4: Build and return response
        const response = buildResponse({
            companyDuplicate: null,
            contactAnalysis,
            emailValidation,
            companyNameNormalised,
            isTest
        });

        console.log(`📤 Response: ${response.action_required.toUpperCase()}`);
        return res.json(response);

    } catch (error) {
        console.error('❌ Validation error:', error);
        return res.status(500).json({
            error: 'Internal server error',
            message: error.message,
            action_required: 'error'
        });
    }
}

// Export for Vercel serverless
module.exports = handler;

// Also export for Express (local development)
module.exports.handler = handler;
