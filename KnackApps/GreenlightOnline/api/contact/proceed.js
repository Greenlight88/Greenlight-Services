/**
 * Contact Proceed Endpoint (Post-submission)
 * POST /api/contact/proceed
 *
 * Creates all related records after contact form submission:
 * - ECN (Entity Connection) - "Staff" type linking person to company
 * - Updates ENT (Entity) with ECN reference
 * - COM (Communication Channels)
 * - CCN (Communication Connections)
 *
 * Replaces Make.com contact post-submission webhook scenario
 */

const path = require('path');

// Load environment variables in local development
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: path.join(__dirname, '../../.env.local') });
}

// Vercel's waitUntil for background processing
let waitUntil;
try {
    const vercelFunctions = require('@vercel/functions');
    waitUntil = vercelFunctions.waitUntil;
} catch (e) {
    // Fallback for local development
    waitUntil = (promise) => promise.catch(err => console.error('Background error:', err));
}

const knack = require('../../lib/knack-api');
const logger = require('../../lib/logger');
const { logRequest } = require('../../db/client');
const { processCOMs, linkSharedCOMs } = require('../../lib/com-processing');

// Knack object IDs
const OBJECTS = {
    ENT: 'object_54',    // Entities
    ECN: 'object_187',   // Entity Connections
    SCN: 'object_199'    // Site Connections
};

// "No Site" record ID for entities without physical addresses
const NO_SITE_RECORD_ID = '690154cd2d3fc002ff90cabb';

// Field IDs for Staff ECN (Person -> Company connection)
// Based on Make.com payload:
// {
//     "field_3822": "{{entity_id}}",        // child_ent_connection (person)
//     "field_3833": "{{tenant_id}}",
//     "field_3858": "{{company_id}}",       // parent_ent_connection (company)
//     "field_3852": "Staff",
//     "field_3854": "Yes",
//     "field_3824": "Active",
//     "field_3829": "{{datetime}}",
//     "field_4015": "{{date}}",
//     "field_4018": "{{date}}",
//     "field_3834": "{{current_user.id}}",
//     "field_3980": "Yes",
//     "field_3962": "{{is_test}}"
// }
const ECN_FIELDS = {
    // Core connections
    PARENT_ENT: 'field_3858',        // Parent ENT connection (company)
    CHILD_ENT: 'field_3822',         // Child ENT connection (person)
    SELF_REF: 'field_3926',          // Self-reference (ECN ID)

    // Type and status
    TYPE: 'field_3852',              // Connection type ("Staff")
    STATUS: 'field_3824',            // Active/Inactive
    IS_ACTIVE: 'field_3854',         // "Yes"/"No" active flag

    // Flags
    IS_TEST: 'field_3962',           // Test record flag
    IS_COMPANY: 'field_3980',        // Is company connection = "Yes"

    // Tenant and user
    TENANT: 'field_3833',            // Tenant connection
    CREATED_BY: 'field_3834',        // Created by user
    CREATED_AT: 'field_3829',        // Created timestamp
    CREATED_DATE: 'field_4015',      // Created date only
    START_DATE: 'field_4018',        // Connection start date

    // Post-processing fields
    SCN: 'field_4128',               // SCN connection (if applicable)
    READY: 'field_4028',             // Processing status ("Ready")

    // Company role and primary CCN fields
    COMPANY_ROLE: 'field_3832',      // Company role (default: "General Staff")
    PRIMARY_EMAIL_CCN: 'field_4041', // Primary email CCN
    PRIMARY_MOBILE_CCN: 'field_4042', // Primary mobile CCN
    PRIMARY_PHONE_CCN: 'field_4043'  // Primary phone CCN
};

const ENT_FIELDS = {
    // Updated after ECN created
    PRIMARY_ECN: 'field_4247',       // Primary ECN reference
    SELF_REF: 'field_984',           // Self-reference
    STATUS: 'field_985',             // Status = "Active"
    PERSON_FLAG: 'field_3845',       // Entity type = "Person"
    IS_TEST: 'field_3927',           // Is test record = "Yes"/"No"
    TENANT: 'field_3833',            // Tenant connection
    CREATED_BY: 'field_3782',        // Created by user
    CREATED_AT: 'field_981',         // Created timestamp
    CREATED_DATE: 'field_4093'       // Created date only
};

// SCN (Site Connection) field IDs
const SCN_FIELDS = {
    TENANT: 'field_4129',            // Tenant connection
    ECN: 'field_4130',               // ECN connection
    SITE: 'field_4131',              // Site connection
    STATUS: 'field_4132',            // Status = "Active"
    SELF_REF: 'field_4158',          // Self-reference
    IS_TEST: 'field_4167',           // Test record flag
    CREATED_BY: 'field_4133',        // Created by user
    CREATED_AT: 'field_4134',        // Created timestamp
    CREATED_DATE: 'field_4135',      // Created date only

    // CCN aggregation fields (populated after CCNs created)
    CCN_IDS: 'field_4141'            // All CCN IDs linked to this SCN
};

/**
 * Format current date/time for Knack (DD/MM/YYYY hh:mm A)
 */
function formatDateTime() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12
    return `${day}/${month}/${year} ${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
}

/**
 * Format current date only for Knack (DD/MM/YYYY)
 */
function formatDate() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    return `${day}/${month}/${year}`;
}

/**
 * Create Staff ECN (Entity Connection) record
 * Links a person (child) to a company (parent)
 */
async function createStaffECN(data, log) {
    log.info('ecn_creating', {
        personId: data.entity_id,
        companyId: data.company_id
    });

    const isTest = data.is_test === true || data.is_test === 'Yes' ? 'Yes' : 'No';
    const dateTime = formatDateTime();
    const dateOnly = formatDate();

    const ecnPayload = {
        // Entity connections - Parent is company, Child is person
        [ECN_FIELDS.PARENT_ENT]: data.company_id,
        [ECN_FIELDS.CHILD_ENT]: data.entity_id,

        // Type and status - "Staff" for person->company connection
        [ECN_FIELDS.TYPE]: 'Staff',
        [ECN_FIELDS.STATUS]: 'Active',
        [ECN_FIELDS.IS_ACTIVE]: 'Yes',

        // Flags
        [ECN_FIELDS.IS_TEST]: isTest,
        [ECN_FIELDS.IS_COMPANY]: 'Yes',

        // Company role - default to General Staff
        [ECN_FIELDS.COMPANY_ROLE]: data.company_role || 'General Staff',

        // Tenant and user
        [ECN_FIELDS.TENANT]: data.tenant_id,
        [ECN_FIELDS.CREATED_BY]: data.current_user?.id,
        [ECN_FIELDS.CREATED_AT]: dateTime,
        [ECN_FIELDS.CREATED_DATE]: dateOnly,
        [ECN_FIELDS.START_DATE]: dateOnly
    };

    const ecn = await knack.create(OBJECTS.ECN, ecnPayload);

    // Update with self-reference
    await knack.update(OBJECTS.ECN, ecn.id, {
        [ECN_FIELDS.SELF_REF]: ecn.id
    });

    log.info('ecn_created', { ecnId: ecn.id, type: 'Staff' });
    return ecn;
}

/**
 * Create Self-ECN (Entity Connection) record
 * Links a person to themselves (self-connection)
 */
async function createSelfECN(data, log) {
    log.info('self_ecn_creating', { personId: data.entity_id });

    const isTest = data.is_test === true || data.is_test === 'Yes' ? 'Yes' : 'No';
    const dateTime = formatDateTime();
    const dateOnly = formatDate();

    const selfEcnPayload = {
        // Entity connections - Both parent and child are the same person
        [ECN_FIELDS.PARENT_ENT]: data.entity_id,
        [ECN_FIELDS.CHILD_ENT]: data.entity_id,

        // Type and status - "Self" for self-connection
        [ECN_FIELDS.TYPE]: 'Self',
        [ECN_FIELDS.STATUS]: 'Active',
        [ECN_FIELDS.IS_ACTIVE]: 'Yes',

        // Flags
        [ECN_FIELDS.IS_TEST]: isTest,

        // Tenant and user
        [ECN_FIELDS.TENANT]: data.tenant_id,
        [ECN_FIELDS.CREATED_BY]: data.current_user?.id,
        [ECN_FIELDS.CREATED_AT]: dateTime,
        [ECN_FIELDS.CREATED_DATE]: dateOnly,
        [ECN_FIELDS.START_DATE]: dateOnly
    };

    const selfEcn = await knack.create(OBJECTS.ECN, selfEcnPayload);

    // Update with self-reference
    await knack.update(OBJECTS.ECN, selfEcn.id, {
        [ECN_FIELDS.SELF_REF]: selfEcn.id
    });

    log.info('self_ecn_created', { selfEcnId: selfEcn.id, type: 'Self' });
    return selfEcn;
}

/**
 * Update ENT (Entity) record with ECN reference
 */
async function updateENT(data, ecnId, log) {
    if (!data.entity_id) {
        log.warn('ent_update_skipped', { reason: 'no_entity_id' });
        return null;
    }

    log.info('ent_updating', { entId: data.entity_id, ecnId });

    const isTest = data.is_test === true || data.is_test === 'Yes' ? 'Yes' : 'No';

    const updatePayload = {
        // Link to ECN
        [ENT_FIELDS.PRIMARY_ECN]: ecnId,

        // Self-reference
        [ENT_FIELDS.SELF_REF]: data.entity_id,

        // Entity type and status
        [ENT_FIELDS.PERSON_FLAG]: 'Individual',
        [ENT_FIELDS.STATUS]: 'Active',

        // Test flag
        [ENT_FIELDS.IS_TEST]: isTest,

        // Tenant connection
        [ENT_FIELDS.TENANT]: data.tenant_id,

        // Created by/at
        [ENT_FIELDS.CREATED_BY]: data.current_user?.id,
        [ENT_FIELDS.CREATED_AT]: formatDateTime(),
        [ENT_FIELDS.CREATED_DATE]: formatDate()
    };

    await knack.update(OBJECTS.ENT, data.entity_id, updatePayload);

    log.info('ent_updated', { entId: data.entity_id });
    return data.entity_id;
}

/**
 * Create SCN (Site Connection) for contact
 * Links the ECN to a site (uses NO_SITE_RECORD_ID if no site provided)
 */
async function createContactSCN(data, staffEcn, log) {
    log.info('scn_creating', { ecnId: staffEcn.id });

    const isTest = data.is_test === true || data.is_test === 'Yes' ? 'Yes' : 'No';
    const dateTime = formatDateTime();
    const dateOnly = formatDate();

    // Use provided site_id or fall back to "no site" record
    const siteId = data.site_id || NO_SITE_RECORD_ID;

    const scnPayload = {
        // Connections
        [SCN_FIELDS.ECN]: staffEcn.id,
        [SCN_FIELDS.SITE]: siteId,
        [SCN_FIELDS.TENANT]: data.tenant_id,

        // Status
        [SCN_FIELDS.STATUS]: 'Active',
        [SCN_FIELDS.IS_TEST]: isTest,

        // Created by/at
        [SCN_FIELDS.CREATED_BY]: data.current_user?.id,
        [SCN_FIELDS.CREATED_AT]: dateTime,
        [SCN_FIELDS.CREATED_DATE]: dateOnly
    };

    const scn = await knack.create(OBJECTS.SCN, scnPayload);

    // Update with self-reference
    await knack.update(OBJECTS.SCN, scn.id, {
        [SCN_FIELDS.SELF_REF]: scn.id
    });

    log.info('scn_created', { scnId: scn.id, siteId, ecnId: staffEcn.id });
    return scn;
}

/**
 * Mark ECN as ready for use
 */
async function markECNReady(ecnId, scnId, log) {
    log.info('ecn_marking_ready', { ecnId, scnId });

    const updatePayload = {
        [ECN_FIELDS.READY]: 'Ready'
    };

    // Link to SCN if provided
    if (scnId) {
        updatePayload[ECN_FIELDS.SCN] = scnId;
    }

    await knack.update(OBJECTS.ECN, ecnId, updatePayload);
    log.info('ecn_ready', { ecnId });
}

/**
 * Extract primary CCN IDs by COM type from processing results
 * @param {array} results - Array of { com, ccn } objects
 * @returns {object} - { emailCcnId, mobileCcnId, phoneCcnId }
 */
function extractPrimaryCCNs(results, log) {
    const primaryCCNs = {
        emailCcnId: null,
        mobileCcnId: null,
        phoneCcnId: null
    };

    for (const { com, ccn } of results) {
        // Get COM type from the raw response - check field_3873 or field_3873_raw
        const comType = com.field_3873_raw || com.field_3873 || '';
        const typeStr = typeof comType === 'string' ? comType : comType[0] || '';

        if (typeStr.toLowerCase().includes('email') && !primaryCCNs.emailCcnId) {
            primaryCCNs.emailCcnId = ccn.id;
        } else if (typeStr.toLowerCase().includes('mobile') && !primaryCCNs.mobileCcnId) {
            primaryCCNs.mobileCcnId = ccn.id;
        } else if (typeStr.toLowerCase().includes('phone') && !primaryCCNs.phoneCcnId) {
            primaryCCNs.phoneCcnId = ccn.id;
        }
    }

    log.info('primary_ccns_extracted', primaryCCNs);
    return primaryCCNs;
}

/**
 * Update Staff-ECN with primary CCN references
 */
async function updateECNWithCCNs(ecnId, primaryCCNs, log) {
    const updatePayload = {};

    if (primaryCCNs.emailCcnId) {
        updatePayload[ECN_FIELDS.PRIMARY_EMAIL_CCN] = primaryCCNs.emailCcnId;
    }
    if (primaryCCNs.mobileCcnId) {
        updatePayload[ECN_FIELDS.PRIMARY_MOBILE_CCN] = primaryCCNs.mobileCcnId;
    }
    if (primaryCCNs.phoneCcnId) {
        updatePayload[ECN_FIELDS.PRIMARY_PHONE_CCN] = primaryCCNs.phoneCcnId;
    }

    if (Object.keys(updatePayload).length > 0) {
        await knack.update(OBJECTS.ECN, ecnId, updatePayload);
        log.info('ecn_ccns_updated', { ecnId, ...primaryCCNs });
    }
}

/**
 * Update SCN with all CCN IDs
 */
async function updateSCNWithCCNs(scnId, ccnIds, log) {
    if (!scnId || ccnIds.length === 0) {
        return;
    }

    await knack.update(OBJECTS.SCN, scnId, {
        [SCN_FIELDS.CCN_IDS]: ccnIds
    });
    log.info('scn_ccns_updated', { scnId, ccnCount: ccnIds.length });
}

/**
 * Background processing for non-critical tasks
 */
async function backgroundProcessing(data, staffEcn, selfEcn, scn, log) {
    try {
        log.info('background_starting');

        let comResults = { coms: [], ccns: [] };

        // Process COMs (email, mobile, phone)
        if (data.knack_api_payloads || data.email_normalised || data.mobile_normalised || data.phone_normalised) {
            comResults = await processCOMs(data, staffEcn, scn || { id: null }, log);
        }

        // Link shared COMs if any
        let sharedResults = { ccns: [] };
        if (data.shared_com_ids && data.shared_com_ids.length > 0) {
            sharedResults = await linkSharedCOMs(data.shared_com_ids, staffEcn, scn || { id: null }, data, log);
        }

        // Extract primary CCNs and update Staff-ECN
        if (comResults.coms.length > 0) {
            const resultsWithBoth = comResults.coms.map((com, i) => ({
                com,
                ccn: comResults.ccns[i]
            }));
            const primaryCCNs = extractPrimaryCCNs(resultsWithBoth, log);
            await updateECNWithCCNs(staffEcn.id, primaryCCNs, log);
        }

        // Collect all CCN IDs for SCN update
        const allCcnIds = [
            ...comResults.ccns.map(ccn => ccn.id),
            ...sharedResults.ccns.map(ccn => ccn.id)
        ];

        // Update SCN with all CCN IDs
        if (scn?.id) {
            await updateSCNWithCCNs(scn.id, allCcnIds, log);
        }

        // Mark Staff-ECN as ready
        await markECNReady(staffEcn.id, scn?.id, log);

        log.info('background_complete');

    } catch (error) {
        log.error('background_error', { error: error.message, stack: error.stack });
    }
}

/**
 * Main handler
 */
async function handler(req, res) {
    const startTime = Date.now();
    const requestId = `contact-proceed-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const log = logger.withRequest(requestId);

    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Parse request body
        let data = req.body;

        // Handle nested data object (from frontend)
        if (data.data && typeof data.data === 'object') {
            data = { ...data, ...data.data };
        }

        log.info('request_received', {
            entity_id: data.entity_id,
            company_id: data.company_id,
            tenant_id: data.tenant_id,
            has_payloads: !!data.knack_api_payloads
        });

        // Validate required fields
        if (!data.entity_id) {
            log.warn('validation_failed', { reason: 'missing_entity_id' });
            return res.status(400).json({
                status: 'error',
                error: 'Missing required field: entity_id',
                requestId
            });
        }

        if (!data.company_id) {
            log.warn('validation_failed', { reason: 'missing_company_id' });
            return res.status(400).json({
                status: 'error',
                error: 'Missing required field: company_id (parent company)',
                requestId
            });
        }

        // === SYNCHRONOUS: Create ECNs, SCN and update ENT (must complete before response) ===

        // Step 1: Create Self-ECN (person's self-connection)
        const selfEcn = await createSelfECN(data, log);

        // Step 2: Create Staff ECN (person -> company)
        const staffEcn = await createStaffECN(data, log);

        // Step 3: Update ENT with primary ECN reference (Staff-ECN for contacts)
        await updateENT(data, staffEcn.id, log);

        // Step 4: Create SCN (Site Connection) linked to Staff-ECN
        const scn = await createContactSCN(data, staffEcn, log);

        // Step 5: Return immediate response
        const response = {
            status: 'processing',
            ecn_id: staffEcn.id,
            self_ecn_id: selfEcn.id,
            scn_id: scn?.id,
            requestId,
            message: 'Contact ECNs created. Background processing in progress.'
        };

        log.info('response_sent', {
            staffEcnId: staffEcn.id,
            selfEcnId: selfEcn.id,
            scnId: scn?.id,
            duration: Date.now() - startTime
        });

        // Log to database
        await logRequest({
            request_id: requestId,
            endpoint: '/api/contact/proceed',
            method: 'POST',
            request_body: data,
            response_body: response,
            status_code: 200,
            duration_ms: Date.now() - startTime,
            entity_id: data.entity_id,
            company_id: data.company_id,
            ecn_id: staffEcn.id
        });

        // Send response before background processing
        res.status(200).json(response);

        // === BACKGROUND: Process COMs and finalize ===
        waitUntil(backgroundProcessing(data, staffEcn, selfEcn, scn, log));

    } catch (error) {
        log.error('handler_error', { error: error.message, stack: error.stack });

        const errorResponse = {
            status: 'error',
            error: error.message,
            requestId
        };

        await logRequest({
            request_id: requestId,
            endpoint: '/api/contact/proceed',
            method: 'POST',
            request_body: req.body,
            response_body: errorResponse,
            status_code: 500,
            duration_ms: Date.now() - startTime,
            error_message: error.message
        });

        return res.status(500).json(errorResponse);
    }
}

module.exports = handler;
