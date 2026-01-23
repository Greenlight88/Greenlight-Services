/**
 * Site Processing Module
 * Handles site search, creation, and updates for company creation flow
 */

const knack = require('./knack-api');
const logger = require('./logger');

// The "No Site" placeholder record ID
const NO_SITE_RECORD_ID = '690154cd2d3fc002ff90cabb';

// Knack object IDs
const OBJECTS = {
    SITE: 'object_120'
};

// Field IDs
const FIELDS = {
    STREET_ADDRESS_SEARCH: 'field_2096',  // Searchable address string
    ADDRESS: 'field_2066',                 // Address field (composite)
    STATUS: 'field_4089',                  // Active/Inactive
    TENANT_CONN: 'field_2178',            // Tenant connection
    CREATED_BY: 'field_3797',             // Created by user
    CREATED_AT: 'field_3798',             // Created timestamp
    MODIFIED_BY: 'field_2069',            // Modified by user
    MODIFIED_AT: 'field_2070',            // Modified timestamp
    SELF_REF: 'field_2067',               // Self-reference
    IS_TEST: 'field_4088',                // Test record flag
    SATELLITE_IFRAME: 'field_2079',       // Google Maps satellite view
    STREETVIEW_IFRAME: 'field_2080'       // Google Maps street view
};

/**
 * Format current date/time for Knack
 */
function formatDateTime() {
    return new Date().toISOString();
}

/**
 * Process site for company creation
 * Searches for existing site or creates new one, or returns No Site placeholder
 *
 * @param {object} data - Request data with address fields
 * @param {object} ecn - Created ECN record
 * @param {object} log - Logger instance
 * @returns {object} - { id, type: 'existing'|'created'|'no_site' }
 */
async function processSite(data, ecn, log) {
    // Check if has address
    const hasAddress = !!(data.street_address_search || data.address_street);

    if (!hasAddress) {
        log.info('site_using_placeholder', { reason: 'no_address_provided' });
        return {
            id: NO_SITE_RECORD_ID,
            type: 'no_site'
        };
    }

    const searchAddress = data.street_address_search || buildSearchAddress(data);
    log.info('site_search_start', { address: searchAddress });

    try {
        // Search for existing site
        const existing = await knack.search(OBJECTS.SITE, [{
            field: FIELDS.STREET_ADDRESS_SEARCH,
            operator: 'is',
            value: searchAddress
        }], { limit: 1 });

        if (existing.records && existing.records.length > 0) {
            // Update existing site
            const siteId = existing.records[0].id;
            log.info('site_existing_found', { siteId });

            await knack.update(OBJECTS.SITE, siteId, {
                [FIELDS.STATUS]: 'Active',
                [FIELDS.MODIFIED_BY]: data.current_user?.id,
                [FIELDS.MODIFIED_AT]: formatDateTime()
            });

            log.info('site_updated', { siteId });
            return {
                id: siteId,
                type: 'existing'
            };
        }

        // Create new site
        log.info('site_creating', { address: searchAddress });

        const addressObj = buildAddressObject(data);
        const newSite = await knack.create(OBJECTS.SITE, {
            [FIELDS.IS_TEST]: data.is_test === true || data.is_test === 'Yes' ? 'Yes' : 'No',
            [FIELDS.ADDRESS]: addressObj,
            [FIELDS.STATUS]: 'Active',
            [FIELDS.CREATED_BY]: data.current_user?.id,
            [FIELDS.CREATED_AT]: formatDateTime()
        });

        // Update with self-reference
        await knack.update(OBJECTS.SITE, newSite.id, {
            [FIELDS.SELF_REF]: newSite.id
        });

        log.info('site_created', { siteId: newSite.id });
        return {
            id: newSite.id,
            type: 'created'
        };

    } catch (error) {
        log.error('site_processing_error', { error: error.message, address: searchAddress });
        throw error;
    }
}

/**
 * Build address object for Knack composite address field
 */
function buildAddressObject(data) {
    return {
        street: data.address_street || '',
        street2: data.address_street2 || '',
        city: (data.address_city || '').toUpperCase(),
        state: data.address_state || '',
        zip: data.address_zip || ''
    };
}

/**
 * Build search address string from components
 */
function buildSearchAddress(data) {
    const parts = [
        data.address_street,
        data.address_city,
        data.address_state,
        data.address_zip
    ].filter(Boolean);
    return parts.join(', ');
}

/**
 * Update site with Google Maps iframes
 * @param {string} siteId - Site record ID
 * @param {object} iframes - { satellite_iframe_html, streetview_iframe_html }
 * @param {object} log - Logger instance
 */
async function updateSiteWithMaps(siteId, iframes, log) {
    if (siteId === NO_SITE_RECORD_ID) {
        log.info('site_maps_skipped', { reason: 'no_site_placeholder' });
        return;
    }

    try {
        await knack.update(OBJECTS.SITE, siteId, {
            [FIELDS.SATELLITE_IFRAME]: iframes.satellite_iframe_html,
            [FIELDS.STREETVIEW_IFRAME]: iframes.streetview_iframe_html
        });
        log.info('site_maps_updated', { siteId });
    } catch (error) {
        log.error('site_maps_update_error', { siteId, error: error.message });
        // Don't throw - maps are non-critical
    }
}

module.exports = {
    processSite,
    updateSiteWithMaps,
    buildAddressObject,
    buildSearchAddress,
    NO_SITE_RECORD_ID,
    OBJECTS,
    FIELDS
};
