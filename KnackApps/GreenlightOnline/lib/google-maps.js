/**
 * Google Maps Wrapper Module
 * Handles geocoding and iframe generation for site records
 */

const { generateMapsIframes } = require('./google-maps-iframe');
const logger = require('./logger');

// Google Maps API endpoints
const GEOCODE_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
const STREETVIEW_METADATA_URL = 'https://maps.googleapis.com/maps/api/streetview/metadata';

/**
 * Geocode an address and generate map iframes
 * @param {object} addressData - Address components
 * @param {object} log - Logger instance
 * @returns {object|null} - Iframe HTML or null if failed
 */
async function processGoogleMaps(addressData, log) {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
        log.warn('google_maps_skipped', { reason: 'no_api_key' });
        return null;
    }

    try {
        // Build formatted address for geocoding
        const formattedAddress = buildFormattedAddress(addressData);
        log.info('geocoding_start', { address: formattedAddress });

        // Geocode the address
        const geocodeResult = await geocodeAddress(formattedAddress, apiKey);

        if (!geocodeResult) {
            log.warn('geocoding_failed', { address: formattedAddress });
            return null;
        }

        log.info('geocoding_success', {
            location: geocodeResult.location,
            locationType: geocodeResult.locationType
        });

        // Get Street View panorama info
        const streetViewInfo = await getStreetViewMetadata(
            geocodeResult.location.lat,
            geocodeResult.location.lng,
            apiKey
        );

        // Generate iframes
        const iframeInput = {
            // Pano location (street view camera position)
            fromLat: streetViewInfo?.location?.lat || geocodeResult.location.lat,
            fromLng: streetViewInfo?.location?.lng || geocodeResult.location.lng,
            // Place point (actual location)
            toLat: geocodeResult.location.lat,
            toLng: geocodeResult.location.lng,
            // Viewport bounds
            neLat: geocodeResult.viewport?.northeast?.lat || geocodeResult.location.lat + 0.001,
            neLng: geocodeResult.viewport?.northeast?.lng || geocodeResult.location.lng + 0.001,
            swLat: geocodeResult.viewport?.southwest?.lat || geocodeResult.location.lat - 0.001,
            swLng: geocodeResult.viewport?.southwest?.lng || geocodeResult.location.lng - 0.001,
            // Metadata
            locationType: geocodeResult.locationType,
            panoId: streetViewInfo?.pano_id || '',
            formattedStreetAddress: formattedAddress,
            apiKey
        };

        const iframes = generateMapsIframes(iframeInput);

        if (iframes.error) {
            log.warn('iframe_generation_error', { error: iframes.error });
            return null;
        }

        log.info('iframes_generated', {
            zoom: iframes.zoom,
            targetSource: iframes.target_source
        });

        return {
            satellite_iframe_html: iframes.satellite_iframe_html,
            streetview_iframe_html: iframes.streetview_iframe_html,
            center_lat: iframes.center_lat,
            center_lng: iframes.center_lng
        };

    } catch (error) {
        log.error('google_maps_error', { error: error.message });
        return null;
    }
}

/**
 * Build formatted address string for geocoding
 */
function buildFormattedAddress(data) {
    const parts = [
        data.address_street,
        data.address_street2,
        data.address_city,
        data.address_state,
        data.address_zip
    ].filter(Boolean);

    // Add Australia if not present
    const address = parts.join(', ');
    if (!address.toLowerCase().includes('australia')) {
        return address + ', Australia';
    }
    return address;
}

/**
 * Geocode an address using Google Maps API
 * @param {string} address - Full address string
 * @param {string} apiKey - Google Maps API key
 * @returns {object|null} - { location: {lat, lng}, viewport, locationType }
 */
async function geocodeAddress(address, apiKey) {
    const params = new URLSearchParams({
        address,
        key: apiKey,
        region: 'au' // Bias towards Australia
    });

    const response = await fetch(`${GEOCODE_URL}?${params}`);
    const data = await response.json();

    if (data.status !== 'OK' || !data.results?.[0]) {
        return null;
    }

    const result = data.results[0];
    return {
        location: result.geometry.location,
        viewport: result.geometry.viewport,
        locationType: result.geometry.location_type,
        formattedAddress: result.formatted_address,
        placeId: result.place_id
    };
}

/**
 * Get Street View metadata for a location
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @param {string} apiKey - Google Maps API key
 * @returns {object|null} - Street View metadata or null
 */
async function getStreetViewMetadata(lat, lng, apiKey) {
    try {
        const params = new URLSearchParams({
            location: `${lat},${lng}`,
            key: apiKey,
            source: 'outdoor'
        });

        const response = await fetch(`${STREETVIEW_METADATA_URL}?${params}`);
        const data = await response.json();

        if (data.status !== 'OK') {
            return null;
        }

        return {
            pano_id: data.pano_id,
            location: data.location,
            date: data.date
        };

    } catch (error) {
        // Street View metadata is optional
        return null;
    }
}

module.exports = {
    processGoogleMaps,
    geocodeAddress,
    getStreetViewMetadata,
    buildFormattedAddress
};
