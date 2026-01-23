/**
 * Knack Record Verifier
 * Queries Knack to verify records were created correctly after proceed endpoint
 */

const path = require('path');

// Load environment variables in local development
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: path.join(__dirname, '../../.env.local') });
}

const knack = require('../../lib/knack-api');

// Knack object IDs
const OBJECTS = {
    ENT: 'object_54',     // Entities
    ECN: 'object_187',    // Entity Connections
    SITE: 'object_120',   // Sites
    SCN: 'object_199',    // Site Connections
    COM: 'object_188',    // Communication Channels
    CCN: 'object_189'     // Communication Connections
};

// Field IDs for verification
const FIELDS = {
    // ECN fields
    ECN_ENT: 'field_3858',        // ECN -> ENT connection
    ECN_RECORD_ID: 'field_3878',  // Self-reference
    ECN_STATUS: 'field_3857',     // Active/Inactive
    ECN_SCN: 'field_4111',        // ECN -> SCN connection
    ECN_IS_TEST: 'field_3998',    // Test flag

    // SCN fields
    SCN_SITE: 'field_4072',       // SCN -> Site connection
    SCN_ECN: 'field_4073',        // SCN -> ECN connection

    // CCN fields
    CCN_ECN: 'field_4121',        // CCN -> ECN connection
    CCN_COM: 'field_3914',        // CCN -> COM connection
    CCN_SCN: 'field_4119',        // CCN -> SCN connection
    CCN_STATUS: 'field_3901',     // Active/Inactive
    CCN_IS_TEST: 'field_3997',    // Test flag

    // COM fields
    COM_TYPE: 'field_3873',       // Email/Phone
    COM_VALUE: 'field_3875',      // Actual value
    COM_IS_TEST: 'field_3996'     // Test flag
};

/**
 * Verify records created by proceed endpoint
 * @param {string} ecnId - The ECN ID returned by proceed
 * @param {object} expectations - What we expect to find
 * @returns {object} - { passed: boolean, errors: [], details: {} }
 */
async function verifyKnackRecords(ecnId, expectations) {
    const errors = [];
    const details = {};

    try {
        // 1. Verify ECN exists
        const ecn = await knack.get(OBJECTS.ECN, ecnId);
        details.ecn = { id: ecnId, exists: true };

        if (!ecn) {
            errors.push(`ECN ${ecnId} not found`);
            return { passed: false, errors, details };
        }

        // 2. Verify ENT was updated (if expected)
        if (expectations.ent_updated) {
            const entId = ecn.field_3858_raw?.[0]?.id;
            if (entId) {
                const ent = await knack.get(OBJECTS.ENT, entId);
                details.ent = { id: entId, exists: !!ent };
                if (!ent) {
                    errors.push(`ENT ${entId} not found`);
                }
            } else {
                errors.push('ECN has no ENT connection');
            }
        }

        // 3. Verify SCN
        if (expectations.scn) {
            const scnId = ecn.field_4111_raw?.[0]?.id;
            if (scnId) {
                const scn = await knack.get(OBJECTS.SCN, scnId);
                details.scn = { id: scnId, exists: !!scn };

                // Verify site connection
                const siteId = scn?.field_4072_raw?.[0]?.id;
                if (siteId) {
                    details.site = { id: siteId, type: expectations.site };

                    // Check if it's the No Site placeholder
                    const NO_SITE_ID = '690154cd2d3fc002ff90cabb';
                    if (expectations.site === 'no_site' && siteId !== NO_SITE_ID) {
                        errors.push(`Expected No Site placeholder, got ${siteId}`);
                    }
                } else {
                    errors.push('SCN has no Site connection');
                }
            } else {
                errors.push('ECN has no SCN connection');
            }
        }

        // 4. Verify COM/CCN count
        if (expectations.coms !== undefined || expectations.ccns !== undefined) {
            // Search for CCNs linked to this ECN
            const ccnSearch = await knack.search(OBJECTS.CCN, [{
                field: FIELDS.CCN_ECN,
                operator: 'is',
                value: ecnId
            }], { limit: 50 });

            const ccnCount = ccnSearch.records?.length || 0;
            details.ccns = { count: ccnCount, expected: expectations.ccns };

            if (expectations.ccns !== undefined && ccnCount !== expectations.ccns) {
                errors.push(`Expected ${expectations.ccns} CCNs, found ${ccnCount}`);
            }

            // Count unique COMs
            const comIds = new Set();
            ccnSearch.records?.forEach(ccn => {
                const comId = ccn.field_3914_raw?.[0]?.id;
                if (comId) comIds.add(comId);
            });
            const comCount = comIds.size;
            details.coms = { count: comCount, expected: expectations.coms };

            if (expectations.coms !== undefined && comCount !== expectations.coms) {
                errors.push(`Expected ${expectations.coms} COMs, found ${comCount}`);
            }
        }

        // 5. Verify Google Maps (if expected)
        if (expectations.google_maps) {
            // Check if site has map iframes
            const scnId = ecn.field_4111_raw?.[0]?.id;
            if (scnId) {
                const scn = await knack.get(OBJECTS.SCN, scnId);
                const siteId = scn?.field_4072_raw?.[0]?.id;
                if (siteId) {
                    const site = await knack.get(OBJECTS.SITE, siteId);
                    // field_2079 = Satellite iframe, field_2080 = Street view iframe
                    const hasMaps = !!(site?.field_2079 || site?.field_2080);
                    details.google_maps = { hasMaps };

                    if (expectations.google_maps && !hasMaps) {
                        errors.push('Expected Google Maps iframes but none found');
                    }
                }
            }
        }

        return {
            passed: errors.length === 0,
            errors,
            details
        };

    } catch (error) {
        errors.push(`Verification error: ${error.message}`);
        return { passed: false, errors, details };
    }
}

/**
 * Clean up test records created by test scenarios
 * Only cleans records marked with is_test = true
 * @param {string} ecnId - ECN to clean up
 */
async function cleanupTestRecords(ecnId) {
    try {
        const ecn = await knack.get(OBJECTS.ECN, ecnId);

        // Only clean up test records
        if (ecn?.field_3998 !== 'Yes' && ecn?.field_3998 !== true) {
            console.log(`Skipping cleanup: ECN ${ecnId} is not a test record`);
            return false;
        }

        // Find and delete CCNs
        const ccnSearch = await knack.search(OBJECTS.CCN, [{
            field: FIELDS.CCN_ECN,
            operator: 'is',
            value: ecnId
        }]);

        for (const ccn of (ccnSearch.records || [])) {
            // Could delete COM too, but leave for now
            console.log(`Would delete CCN: ${ccn.id}`);
        }

        // Note: Actually deleting records requires Knack delete endpoint
        // For now, we just mark them for manual cleanup
        console.log(`Cleanup identified for ECN: ${ecnId}`);
        return true;

    } catch (error) {
        console.error(`Cleanup error: ${error.message}`);
        return false;
    }
}

module.exports = {
    verifyKnackRecords,
    cleanupTestRecords,
    OBJECTS,
    FIELDS
};
