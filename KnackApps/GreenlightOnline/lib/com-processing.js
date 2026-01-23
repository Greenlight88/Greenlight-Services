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
 * - VALUE: preserves user-entered case (e.g., "JohnSmith@company.com")
 * - NORMALISED: lowercase for searching (e.g., "johnsmith@company.com")
 */
function buildEmailPayload(data) {
    // Use original email if available (preserves case), otherwise use normalised
    const displayValue = data.email || data.email_normalised || '';
    const normalisedValue = (data.email_normalised || data.email || '').toLowerCase();

    return {
        [COM_FIELDS.TYPE]: 'Email',
        [COM_FIELDS.VALUE]: displayValue,
        [COM_FIELDS.NORMALISED]: normalisedValue,
        [COM_FIELDS.OWNERSHIP]: 'Company',
        [COM_FIELDS.STATUS]: 'Active',
        [COM_FIELDS.TENANT]: data.tenant_id,
        [COM_FIELDS.CREATED_BY]: data.current_user?.id,
        [COM_FIELDS.CREATED_AT]: formatDateTime()
    };
}

/**
 * Format Australian phone number for display
 * Supports: landlines (07 0114 6953), 1300/1800 numbers, extensions
 * Input: normalized E.164 format (e.g., "+61701146953")
 * Output: formatted display (e.g., "07 0114 6953")
 */
function formatPhoneForDisplay(phone) {
    if (!phone) return '';

    // If already has spaces/formatting, preserve it
    if (/[\s\-\(\)]/.test(phone)) {
        return phone;
    }

    // Remove any non-digit characters except + for processing
    let digits = phone.replace(/[^\d+]/g, '');

    // Handle 1300/1800 numbers
    if (/^1[38]00/.test(digits)) {
        // Format as: 1300 888 001 or 1800 956 424
        return digits.replace(/^(1[38]00)(\d{3})(\d{3})$/, '$1 $2 $3');
    }

    // Handle E.164 format (+61...)
    if (digits.startsWith('+61')) {
        digits = '0' + digits.slice(3); // Convert +61X to 0X
    } else if (digits.startsWith('61') && digits.length > 10) {
        digits = '0' + digits.slice(2); // Convert 61X to 0X
    }

    // Remove leading zeros beyond the first for mobiles
    if (digits.startsWith('04') || digits.startsWith('05')) {
        // Mobile: 0412 345 678
        return digits.replace(/^(\d{4})(\d{3})(\d{3})$/, '$1 $2 $3');
    }

    // Landline: 07 0114 6953 (state code + 8 digits)
    if (digits.length === 10 && digits.startsWith('0')) {
        return digits.replace(/^(\d{2})(\d{4})(\d{4})$/, '$1 $2 $3');
    }

    // If no pattern matches, return as-is
    return phone;
}

/**
 * Build phone COM payload from request data
 * - VALUE: formatted for display (e.g., "07 0114 6953")
 * - NORMALISED: digits only for searching (e.g., "0701146953")
 */
function buildPhonePayload(data) {
    // Get the raw phone value (user-entered format preserved if available)
    const rawPhone = data.phone || data.phone_formatted || '';
    const normalisedPhone = data.phone_normalised || '';

    // For display: use user-entered format if has formatting, otherwise format the normalized value
    let displayValue;
    if (rawPhone && /[\s\-\(\)]/.test(rawPhone)) {
        // User entered with formatting - preserve it
        displayValue = rawPhone;
    } else if (rawPhone) {
        // User entered without formatting - use as-is
        displayValue = rawPhone;
    } else {
        // Fall back to formatting the normalized value
        displayValue = formatPhoneForDisplay(normalisedPhone);
    }

    // For searching: strip to digits only
    const normalisedValue = (normalisedPhone || rawPhone || '').replace(/\D/g, '');

    return {
        [COM_FIELDS.TYPE]: 'Phone',
        [COM_FIELDS.VALUE]: displayValue,
        [COM_FIELDS.NORMALISED]: normalisedValue,
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
