/**
 * Knack API Helper
 * Simple wrapper around fetch for Knack REST API calls
 * Uses object-based auth (API key) for full database access
 */

const KNACK_BASE = 'https://api.knack.com/v1';

/**
 * Get headers for Knack API requests
 */
function getHeaders() {
    return {
        'X-Knack-Application-ID': process.env.KNACK_APP_ID,
        'X-Knack-REST-API-Key': process.env.KNACK_API_KEY,
        'Content-Type': 'application/json'
    };
}

/**
 * Make a request to the Knack API
 * @param {string} endpoint - API endpoint (e.g., '/objects/object_54/records')
 * @param {object} options - Fetch options (method, body, etc.)
 * @returns {Promise<object>} - Parsed JSON response
 */
async function knackRequest(endpoint, options = {}) {
    const url = `${KNACK_BASE}${endpoint}`;

    const response = await fetch(url, {
        headers: getHeaders(),
        ...options
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Knack API error (${response.status}): ${error}`);
    }

    return response.json();
}

/**
 * Search for records in a Knack object
 * @param {string} objectId - Knack object ID (e.g., 'object_54')
 * @param {array} filters - Array of filter conditions
 * @param {object} options - Additional options (limit, sort, etc.)
 * @returns {Promise<object>} - Search results with records array
 */
async function search(objectId, filters, options = {}) {
    const params = new URLSearchParams();

    if (filters && filters.length > 0) {
        params.append('filters', JSON.stringify(filters));
    }

    params.append('rows_per_page', String(options.limit || 100));

    if (options.sortField) {
        params.append('sort_field', options.sortField);
        params.append('sort_order', options.sortOrder || 'desc');
    }

    const endpoint = `/objects/${objectId}/records?${params.toString()}`;
    return knackRequest(endpoint);
}

/**
 * Get a single record by ID
 * @param {string} objectId - Knack object ID
 * @param {string} recordId - Record ID
 * @returns {Promise<object>} - Record data
 */
async function get(objectId, recordId) {
    return knackRequest(`/objects/${objectId}/records/${recordId}`);
}

/**
 * Create a new record
 * @param {string} objectId - Knack object ID
 * @param {object} data - Record data
 * @returns {Promise<object>} - Created record with ID
 */
async function create(objectId, data) {
    return knackRequest(`/objects/${objectId}/records`, {
        method: 'POST',
        body: JSON.stringify(data)
    });
}

/**
 * Update an existing record
 * @param {string} objectId - Knack object ID
 * @param {string} recordId - Record ID
 * @param {object} data - Fields to update
 * @returns {Promise<object>} - Updated record
 */
async function update(objectId, recordId, data) {
    return knackRequest(`/objects/${objectId}/records/${recordId}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    });
}

module.exports = {
    search,
    get,
    create,
    update,
    knackRequest
};
