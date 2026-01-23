/**
 * COM/CCN Processing Module
 * Handles Communication Channel and Communication Connection creation
 */

const knack = require('./knack-api');
const logger = require('./logger');

// Knack object IDs
const OBJECTS = {
    COM: 'object_188',   // Communication Channels
    CCN: 'object_189'    // Communication Connections
};

// Field IDs
const COM_FIELDS = {
    TYPE: 'field_3873',          // Email/Phone
    VALUE: 'field_3875',         // The actual email/phone value
    NORMALISED: 'field_3876',    // Normalized value for searching
    OWNERSHIP: 'field_3874',     // Personal/Company/Shared
    STATUS: 'field_3880',        // Active/Inactive
    SELF_REF: 'field_3879',      // Self-reference
    IS_TEST: 'field_3996',       // Test record flag
    TENANT: 'field_3877',        // Tenant connection
    CREATED_BY: 'field_3881',    // Created by user
    CREATED_AT: 'field_3882'     // Created timestamp
};

const CCN_FIELDS = {
    ECN: 'field_4121',           // ECN connection
    SCN: 'field_4119',           // SCN connection
    COM: 'field_3914',           // COM connection
    STATUS: 'field_3901',        // Active/Inactive
    START_DATE: 'field_3906',    // Connection start date
    CREATED_BY: 'field_3907',    // Created by user
    TENANT: 'field_3910',        // Tenant connection
    IS_TEST: 'field_3997',       // Test record flag
    IS_PRIMARY: 'field_3900',    // Is primary contact
    SELF_REF: 'field_3918'       // Self-reference
};

/**
 * Format current date/time for Knack
 */
function formatDateTime() {
    return new Date().toISOString();
}

/**
 * Process communications for company creation
 * Creates COM and CCN records for email and phone
 *
 * @param {object} data - Request data with contact fields
 * @param {object} ecn - Created ECN record
 * @param {object} scn - Created SCN record
 * @param {object} log - Logger instance
 * @returns {object} - { coms: [], ccns: [] }
 */
async function processCOMs(data, ecn, scn, log) {
    const results = { coms: [], ccns: [] };

    // Parse pre-built payloads if provided (from frontend validation)
    let payloads = [];
    if (data.knack_api_payloads) {
        try {
            // Payloads are joined by :::
            payloads = data.knack_api_payloads
                .split(':::')
                .map(s => JSON.parse(s.trim()))
                .filter(Boolean);
            log.info('com_using_prebuilt_payloads', { count: payloads.length });
        } catch (err) {
            log.warn('com_payload_parse_error', { error: err.message });
            payloads = [];
        }
    }

    // If no pre-built payloads, build from normalized values
    if (payloads.length === 0) {
        if (data.email_normalised) {
            payloads.push(buildEmailPayload(data));
        }
        if (data.phone_normalised) {
            payloads.push(buildPhonePayload(data));
        }
        log.info('com_built_payloads', { count: payloads.length });
    }

    // Process each COM payload
    for (const comPayload of payloads) {
        try {
            const { com, ccn } = await createCOMWithCCN(comPayload, ecn, scn, data, log);
            results.coms.push(com);
            results.ccns.push(ccn);
        } catch (error) {
            log.error('com_creation_error', {
                error: error.message,
                type: comPayload[COM_FIELDS.TYPE]
            });
            // Continue with other COMs
        }
    }

    log.info('com_processing_complete', {
        comsCreated: results.coms.length,
        ccnsCreated: results.ccns.length
    });

    return results;
}

/**
 * Create a COM record and its associated CCN
 */
async function createCOMWithCCN(comPayload, ecn, scn, data, log) {
    // Create COM
    const com = await knack.create(OBJECTS.COM, comPayload);
    log.info('com_created', { comId: com.id, type: comPayload[COM_FIELDS.TYPE] });

    // Update COM with self-reference and test flag
    await knack.update(OBJECTS.COM, com.id, {
        [COM_FIELDS.SELF_REF]: com.id,
        [COM_FIELDS.IS_TEST]: data.is_test === true || data.is_test === 'Yes' ? 'Yes' : 'No'
    });

    // Create CCN
    const ccnPayload = {
        [CCN_FIELDS.ECN]: ecn.id,
        [CCN_FIELDS.SCN]: scn.id,
        [CCN_FIELDS.COM]: com.id,
        [CCN_FIELDS.STATUS]: 'Active',
        [CCN_FIELDS.START_DATE]: formatDateTime(),
        [CCN_FIELDS.CREATED_BY]: data.current_user?.id,
        [CCN_FIELDS.TENANT]: data.tenant_id,
        [CCN_FIELDS.IS_TEST]: data.is_test === true || data.is_test === 'Yes' ? 'Yes' : 'No',
        [CCN_FIELDS.IS_PRIMARY]: 'Yes'
    };

    const ccn = await knack.create(OBJECTS.CCN, ccnPayload);
    log.info('ccn_created', { ccnId: ccn.id, comId: com.id, ecnId: ecn.id });

    // Update CCN with self-reference
    await knack.update(OBJECTS.CCN, ccn.id, {
        [CCN_FIELDS.SELF_REF]: ccn.id
    });

    return { com, ccn };
}

/**
 * Build email COM payload from request data
 */
function buildEmailPayload(data) {
    return {
        [COM_FIELDS.TYPE]: 'Email',
        [COM_FIELDS.VALUE]: data.email || data.email_normalised,
        [COM_FIELDS.NORMALISED]: (data.email_normalised || data.email || '').toLowerCase(),
        [COM_FIELDS.OWNERSHIP]: 'Company',
        [COM_FIELDS.STATUS]: 'Active',
        [COM_FIELDS.TENANT]: data.tenant_id,
        [COM_FIELDS.CREATED_BY]: data.current_user?.id,
        [COM_FIELDS.CREATED_AT]: formatDateTime()
    };
}

/**
 * Build phone COM payload from request data
 */
function buildPhonePayload(data) {
    return {
        [COM_FIELDS.TYPE]: 'Phone',
        [COM_FIELDS.VALUE]: data.phone || data.phone_normalised,
        [COM_FIELDS.NORMALISED]: (data.phone_normalised || data.phone || '').replace(/\D/g, ''),
        [COM_FIELDS.OWNERSHIP]: 'Company',
        [COM_FIELDS.STATUS]: 'Active',
        [COM_FIELDS.TENANT]: data.tenant_id,
        [COM_FIELDS.CREATED_BY]: data.current_user?.id,
        [COM_FIELDS.CREATED_AT]: formatDateTime()
    };
}

/**
 * Link existing shared COMs to new ECN (for confirmed sharing scenarios)
 * @param {array} sharedComIds - Array of existing COM IDs to share
 * @param {object} ecn - New ECN record
 * @param {object} scn - New SCN record
 * @param {object} data - Request data
 * @param {object} log - Logger instance
 */
async function linkSharedCOMs(sharedComIds, ecn, scn, data, log) {
    const results = { ccns: [] };

    if (!sharedComIds || sharedComIds.length === 0) {
        return results;
    }

    log.info('linking_shared_coms', { count: sharedComIds.length });

    for (const comId of sharedComIds) {
        try {
            // Create CCN linking existing COM to new ECN
            const ccnPayload = {
                [CCN_FIELDS.ECN]: ecn.id,
                [CCN_FIELDS.SCN]: scn.id,
                [CCN_FIELDS.COM]: comId,
                [CCN_FIELDS.STATUS]: 'Active',
                [CCN_FIELDS.START_DATE]: formatDateTime(),
                [CCN_FIELDS.CREATED_BY]: data.current_user?.id,
                [CCN_FIELDS.TENANT]: data.tenant_id,
                [CCN_FIELDS.IS_TEST]: data.is_test === true || data.is_test === 'Yes' ? 'Yes' : 'No',
                [CCN_FIELDS.IS_PRIMARY]: 'No' // Shared COMs are secondary
            };

            const ccn = await knack.create(OBJECTS.CCN, ccnPayload);

            // Update CCN with self-reference
            await knack.update(OBJECTS.CCN, ccn.id, {
                [CCN_FIELDS.SELF_REF]: ccn.id
            });

            results.ccns.push(ccn);
            log.info('shared_ccn_created', { ccnId: ccn.id, comId, ecnId: ecn.id });

        } catch (error) {
            log.error('shared_com_link_error', { comId, error: error.message });
        }
    }

    return results;
}

module.exports = {
    processCOMs,
    createCOMWithCCN,
    buildEmailPayload,
    buildPhonePayload,
    linkSharedCOMs,
    OBJECTS,
    COM_FIELDS,
    CCN_FIELDS
};
