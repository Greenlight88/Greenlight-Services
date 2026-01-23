/**
 * Company Proceed Endpoint (Post-submission)
 * POST /api/company/proceed
 *
 * Creates all related records after company form submission:
 * - ECN (Entity Connection)
 * - Updates ENT (Entity)
 * - Site (or uses No Site placeholder)
 * - SCN (Site Connection)
 * - COM (Communication Channels)
 * - CCN (Communication Connections)
 * - Google Maps iframes
 *
 * Replaces Make.com "Proceed" webhook scenario
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
const { processSite, updateSiteWithMaps, NO_SITE_RECORD_ID } = require('../../lib/site-processing');
const { processCOMs, linkSharedCOMs } = require('../../lib/com-processing');
const { processGoogleMaps } = require('../../lib/google-maps');

// Knack object IDs
const OBJECTS = {
    ENT: 'object_54',    // Entities
    ECN: 'object_187',   // Entity Connections
    SCN: 'object_199'    // Site Connections
};

// Field IDs
const ECN_FIELDS = {
    ENT: 'field_3858',           // ENT connection
    TYPE: 'field_3856',          // Connection type (Self)
    STATUS: 'field_3857',        // Active/Inactive
    SELF_REF: 'field_3878',      // Self-reference
    IS_TEST: 'field_3998',       // Test record flag
    TENANT: 'field_3860',        // Tenant connection
    CREATED_BY: 'field_3863',    // Created by user
    CREATED_AT: 'field_3864',    // Created timestamp
    SCN: 'field_4111',           // SCN connection
    READY: 'field_4113'          // Processing complete flag
};

const ENT_FIELDS = {
    PRIMARY_ECN: 'field_4077',   // Primary ECN reference
    MODIFIED_BY: 'field_3854',   // Modified by user
    MODIFIED_AT: 'field_3855'    // Modified timestamp
};

const SCN_FIELDS = {
    SITE: 'field_4072',          // Site connection
    ECN: 'field_4073',           // ECN connection
    STATUS: 'field_4074',        // Active/Inactive
    IS_PRIMARY: 'field_4075',    // Is primary site
    SELF_REF: 'field_4076',      // Self-reference
    IS_TEST: 'field_4078',       // Test record flag
    TENANT: 'field_4079',        // Tenant connection
    CREATED_BY: 'field_4080',    // Created by user
    CREATED_AT: 'field_4081'     // Created timestamp
};

/**
 * Format current date/time for Knack
 */
function formatDateTime() {
    return new Date().toISOString();
}

/**
 * Create ECN (Entity Connection) record
 * This is the main record that links everything together
 */
async function createECN(data, log) {
    log.info('ecn_creating', { entId: data.ent_id });

    const ecnPayload = {
        [ECN_FIELDS.ENT]: data.ent_id,
        [ECN_FIELDS.TYPE]: 'Self',
        [ECN_FIELDS.STATUS]: 'Active',
        [ECN_FIELDS.IS_TEST]: data.is_test === true || data.is_test === 'Yes' ? 'Yes' : 'No',
        [ECN_FIELDS.TENANT]: data.tenant_id,
        [ECN_FIELDS.CREATED_BY]: data.current_user?.id,
        [ECN_FIELDS.CREATED_AT]: formatDateTime(),
        [ECN_FIELDS.READY]: 'No' // Will be set to Yes when processing completes
    };

    const ecn = await knack.create(OBJECTS.ECN, ecnPayload);

    // Update with self-reference
    await knack.update(OBJECTS.ECN, ecn.id, {
        [ECN_FIELDS.SELF_REF]: ecn.id
    });

    log.info('ecn_created', { ecnId: ecn.id });
    return ecn;
}

/**
 * Update ENT (Entity) record with ECN reference
 */
async function updateENT(data, ecnId, log) {
    if (!data.ent_id) {
        log.warn('ent_update_skipped', { reason: 'no_ent_id' });
        return null;
    }

    log.info('ent_updating', { entId: data.ent_id, ecnId });

    await knack.update(OBJECTS.ENT, data.ent_id, {
        [ENT_FIELDS.PRIMARY_ECN]: ecnId,
        [ENT_FIELDS.MODIFIED_BY]: data.current_user?.id,
        [ENT_FIELDS.MODIFIED_AT]: formatDateTime()
    });

    log.info('ent_updated', { entId: data.ent_id });
    return data.ent_id;
}

/**
 * Create SCN (Site Connection) record
 */
async function createSCN(data, ecn, site, log) {
    log.info('scn_creating', { ecnId: ecn.id, siteId: site.id });

    const scnPayload = {
        [SCN_FIELDS.SITE]: site.id,
        [SCN_FIELDS.ECN]: ecn.id,
        [SCN_FIELDS.STATUS]: 'Active',
        [SCN_FIELDS.IS_PRIMARY]: 'Yes',
        [SCN_FIELDS.IS_TEST]: data.is_test === true || data.is_test === 'Yes' ? 'Yes' : 'No',
        [SCN_FIELDS.TENANT]: data.tenant_id,
        [SCN_FIELDS.CREATED_BY]: data.current_user?.id,
        [SCN_FIELDS.CREATED_AT]: formatDateTime()
    };

    const scn = await knack.create(OBJECTS.SCN, scnPayload);

    // Update with self-reference
    await knack.update(OBJECTS.SCN, scn.id, {
        [SCN_FIELDS.SELF_REF]: scn.id
    });

    log.info('scn_created', { scnId: scn.id });
    return scn;
}

/**
 * Update ECN with SCN reference
 */
async function updateECNWithSCN(ecnId, scnId, log) {
    log.info('ecn_linking_scn', { ecnId, scnId });

    await knack.update(OBJECTS.ECN, ecnId, {
        [ECN_FIELDS.SCN]: scnId
    });

    log.info('ecn_scn_linked', { ecnId, scnId });
}

/**
 * Mark ECN as ready (processing complete)
 */
async function markECNReady(ecnId, log) {
    log.info('ecn_marking_ready', { ecnId });

    await knack.update(OBJECTS.ECN, ecnId, {
        [ECN_FIELDS.READY]: 'Yes'
    });

    log.info('ecn_ready', { ecnId });
}

/**
 * Background processing (runs after response is sent)
 */
async function processBackground(data, ecn, log) {
    try {
        // Step 1: Site processing (search/create or use No Site)
        const site = await processSite(data, ecn, log);

        // Step 2: Create SCN (Site Connection)
        const scn = await createSCN(data, ecn, site, log);

        // Step 3: Update ECN with SCN reference
        await updateECNWithSCN(ecn.id, scn.id, log);

        // Step 4: Google Maps processing (if has real address)
        if (site.type !== 'no_site') {
            const mapsResult = await processGoogleMaps(data, log);
            if (mapsResult) {
                await updateSiteWithMaps(site.id, mapsResult, log);
            }
        }

        // Step 5: COM/CCN processing (if has contacts)
        const hasCOMs = !!(data.email_normalised || data.phone_normalised || data.knack_api_payloads);
        const hasSharedCOMs = !!(data.shared_com_ids);

        if (hasCOMs) {
            await processCOMs(data, ecn, scn, log);
        }

        if (hasSharedCOMs) {
            const sharedIds = data.shared_com_ids.split(',').map(s => s.trim()).filter(Boolean);
            await linkSharedCOMs(sharedIds, ecn, scn, data, log);
        }

        // Step 6: Mark ECN as ready
        await markECNReady(ecn.id, log);

        log.info('proceed_complete', {
            ecnId: ecn.id,
            siteId: site.id,
            siteType: site.type,
            scnId: scn.id
        });

    } catch (error) {
        log.error('background_processing_error', {
            ecnId: ecn.id,
            error: error.message,
            stack: error.stack
        });
        // Don't rethrow - background errors are logged but don't affect response
    }
}

/**
 * Main handler for the proceed endpoint
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

    // Generate request ID for tracing
    const requestId = `req_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const log = logger.withRequest(requestId);

    log.info('proceed_request_start', { endpoint: '/api/company/proceed' });

    // Helper to send response and log it
    const sendResponse = async (statusCode, response, outcome, errorMessage = null) => {
        const durationMs = Date.now() - startTime;

        // Log to database (non-blocking)
        logRequest({
            endpoint: '/api/company/proceed',
            method: 'POST',
            requestPayload: req.body,
            responsePayload: response,
            outcome,
            durationMs,
            errorMessage,
            relatedEntityId: response.ecn_id,
            viewId: req.body?.view,
            userId: req.body?.current_user?.id,
            tenantId: req.body?.tenant_id,
            ipAddress: req.headers['x-forwarded-for'] || req.socket?.remoteAddress,
            userAgent: req.headers['user-agent']
        }).catch(err => console.error('Logging failed:', err.message));

        log.info('proceed_request_complete', { outcome, durationMs, ecnId: response.ecn_id });
        return res.status(statusCode).json(response);
    };

    try {
        const data = req.body;

        // Validate required fields
        if (!data.ent_id) {
            return sendResponse(400, {
                error: 'Missing required field: ent_id',
                action_required: 'error'
            }, 'error', 'Missing ent_id');
        }

        // === SYNCHRONOUS: Steps 1-2 (must complete before response) ===

        // Step 1: Create ECN
        const ecn = await createECN(data, log);

        // Step 2: Update ENT with ECN reference
        await updateENT(data, ecn.id, log);

        // Step 3: Return immediate response (background continues)
        const response = {
            status: 'processing',
            ecn_id: ecn.id,
            requestId,
            message: 'Company creation initiated. Background processing in progress.'
        };

        // Send response immediately
        res.status(200).json(response);

        // === BACKGROUND: Steps 3-7 (via waitUntil) ===
        waitUntil(processBackground(data, ecn, log));

        // Log the response
        logRequest({
            endpoint: '/api/company/proceed',
            method: 'POST',
            requestPayload: data,
            responsePayload: response,
            outcome: 'processing',
            durationMs: Date.now() - startTime,
            relatedEntityId: ecn.id,
            viewId: data.view,
            userId: data.current_user?.id,
            tenantId: data.tenant_id,
            ipAddress: req.headers['x-forwarded-for'] || req.socket?.remoteAddress,
            userAgent: req.headers['user-agent']
        }).catch(err => console.error('Logging failed:', err.message));

    } catch (error) {
        log.error('proceed_error', { error: error.message, stack: error.stack });
        return sendResponse(500, {
            error: 'Internal server error',
            message: error.message,
            action_required: 'error'
        }, 'error', error.message);
    }
}

// Export for Vercel serverless
module.exports = handler;

// Also export for Express (local development)
module.exports.handler = handler;
