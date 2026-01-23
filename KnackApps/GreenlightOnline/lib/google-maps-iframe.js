/**
 * Google Maps Iframe Generator
 * Generates satellite and street view iframe HTML for embedding in Knack
 *
 * Ported from Make.com scenario code module
 * Outputs fixed-pixel iframes: satellite (240x240), streetview (480x240)
 */

/**
 * Generate Google Maps embed iframes for a location
 * @param {Object} input - Input parameters
 * @param {number} input.fromLat - Pano latitude
 * @param {number} input.fromLng - Pano longitude
 * @param {number} input.toLat - Place point latitude
 * @param {number} input.toLng - Place point longitude
 * @param {number} input.neLat - Northeast bound latitude
 * @param {number} input.neLng - Northeast bound longitude
 * @param {number} input.swLat - Southwest bound latitude
 * @param {number} input.swLng - Southwest bound longitude
 * @param {string} input.locationType - e.g., "ROOFTOP", "GEOMETRIC_CENTER"
 * @param {string} input.apiKey - Google Maps API key (required)
 * @param {string} [input.panoId] - Street View pano ID
 * @param {string} [input.formattedStreetAddress] - Formatted address for query
 * @param {number} [input.aerialWidth=240] - Satellite view width
 * @param {number} [input.aerialHeight=240] - Satellite view height
 * @param {number} [input.streetWidth=480] - Street view width
 * @param {number} [input.streetHeight=240] - Street view height
 * @returns {Object} Result with iframe HTML and URLs
 */
function generateMapsIframes(input) {
  const v = input || {};

  // Required fields
  const aLat = Number(v.fromLat), aLng = Number(v.fromLng);      // pano
  const pLat = Number(v.toLat), pLng = Number(v.toLng);          // place point
  const neLat = Number(v.neLat), neLng = Number(v.neLng);
  const swLat = Number(v.swLat), swLng = Number(v.swLng);
  const locationType = (v.locationType || "").toUpperCase();
  const apiKey = String(v.apiKey || "");

  if (!apiKey) {
    return { error: "Missing apiKey" };
  }

  const isNum = n => Number.isFinite(Number(n));
  if ([aLat, aLng, pLat, pLng, neLat, neLng, swLat, swLng].some(n => !isNum(n))) {
    return { error: "Missing/invalid coordinates", got: v };
  }

  // Knobs
  const panoId = String(v.panoId || "");
  const webhookUrl = v.webhookUrl ? String(v.webhookUrl) : "";
  const formattedStreetAddress = v.formattedStreetAddress ? String(v.formattedStreetAddress).trim() : "";

  // Aerial view dimensions (satellite map) - 240x240
  const aerialWidth = Math.max(64, Number(v.aerialWidth ?? 240));
  const aerialHeight = Math.max(64, Number(v.aerialHeight ?? 240));
  // Street view dimensions - 480x240
  const streetWidth = Math.max(64, Number(v.streetWidth ?? 480));
  const streetHeight = Math.max(64, Number(v.streetHeight ?? 240));

  // Legacy boxPx for backward compatibility with zoom calculations
  const boxPx = Math.max(aerialWidth, aerialHeight);
  const mapPx = Number(v.mapPx ?? 600);
  const pad = Number(v.pad ?? 1);
  const mode = (v.mode || "fit").toLowerCase();      // "fit" | "cover"
  const inflate = Math.max(0, Math.min(0.5, Number(v.inflate ?? 0.08)));
  const tightBias = Number(v.tightBias ?? 0);

  // Choose target center
  function pickTarget() {
    const good = locationType === "ROOFTOP" || locationType === "GEOMETRIC_CENTER";
    if (good && isNum(pLat) && isNum(pLng)) {
      return { tLat: pLat, tLng: pLng, source: locationType || "GOOD_POINT" };
    }
    if ([neLat, neLng, swLat, swLng].every(isNum)) {
      return { tLat: (neLat + swLat) / 2, tLng: (neLng + swLng) / 2, source: "VIEWPORT_CENTER" };
    }
    return { tLat: pLat, tLng: pLng, source: locationType || "RAW_POINT" };
  }
  let { tLat: center_lat, tLng: center_lng, source: target_source } = pickTarget();

  // Heading pano -> center
  function headingDeg(aLat, aLng, bLat, bLng) {
    const rad = x => x * Math.PI / 180, deg = x => x * 180 / Math.PI;
    const dLon = rad(bLng - aLng);
    const y = Math.sin(dLon) * Math.cos(rad(bLat));
    const x = Math.cos(rad(aLat)) * Math.sin(rad(bLat)) -
      Math.sin(rad(aLat)) * Math.cos(rad(bLat)) * Math.cos(dLon);
    return (deg(Math.atan2(y, x)) + 360) % 360;
  }
  let sv_heading = Math.round(headingDeg(aLat, aLng, center_lat, center_lng));

  // Square-normalized viewport → zoom
  const rad = x => x * Math.PI / 180;
  const mercY = latDeg => {
    const phi = rad(Math.min(85, Math.max(-85, latDeg)));
    return Math.log(Math.tan(Math.PI / 4 + phi / 2));
  };
  const metersPerDegLat = 111320;
  const metersPerDegLngAt = (lat) => 111320 * Math.cos(rad(lat));

  // Normalize spans
  const vpCenterLat = center_lat;
  const vpCenterLng = center_lng;
  const nLat0 = Math.max(neLat, swLat);
  const sLat0 = Math.min(neLat, swLat);
  let lonSpan0 = Math.abs(neLng - swLng);
  if (lonSpan0 > 180) lonSpan0 = 360 - lonSpan0;

  const vpWidthM = lonSpan0 * metersPerDegLngAt(vpCenterLat);
  const vpHeightM = (nLat0 - sLat0) * metersPerDegLat;

  // Square bbox around center
  const squareSideM = Math.max(vpWidthM, vpHeightM) * (1 + inflate);
  const squareLatSpanDeg = squareSideM / metersPerDegLat;
  const squareLonSpanDeg = squareSideM / metersPerDegLngAt(vpCenterLat);

  const normLon = L => {
    let x = L; while (x > 180) x -= 360; while (x < -180) x += 360; return x;
  };
  let nLat = Math.min(85, vpCenterLat + squareLatSpanDeg / 2);
  let sLat = Math.max(-85, vpCenterLat - squareLatSpanDeg / 2);
  let eLng = normLon(vpCenterLng + squareLonSpanDeg / 2);
  let wLng = normLon(vpCenterLng - squareLonSpanDeg / 2);

  // Fractions
  let lonSpan = Math.abs(eLng - wLng);
  if (lonSpan > 180) lonSpan = 360 - lonSpan;
  const worldFracY = Math.max(1e-12, Math.abs(mercY(nLat) - mercY(sLat)) / (2 * Math.PI));
  const worldFracX = Math.max(1e-12, lonSpan / 360);

  const zoomX = Math.log2((mapPx / 256) / worldFracX);
  const zoomY = Math.log2((mapPx / 256) / worldFracY);
  let base = mode === "cover" ? Math.max(zoomX, zoomY) : Math.min(zoomX, zoomY);
  let zoom_no_pad = Math.floor(base);
  let zoom = Math.floor(base - pad);

  // Tighten heuristics
  const bboxWidthM = squareLonSpanDeg * metersPerDegLngAt(center_lat);
  const bboxHeightM = squareLatSpanDeg * metersPerDegLat;
  const bboxMaxM = Math.max(bboxWidthM, bboxHeightM);

  let desired = zoom;
  if (locationType === "ROOFTOP") desired = Math.max(desired, 19);
  else if (locationType === "GEOMETRIC_CENTER") desired = Math.max(desired, 18);
  if (bboxMaxM < 150) desired = Math.max(desired, 19);
  if (bboxMaxM < 80) desired = Math.max(desired, 20);
  desired = Math.min(21, Math.max(3, desired + tightBias));
  zoom = desired;

  const Z_MIN = 3, Z_MAX = 21;
  zoom_no_pad = Math.max(Z_MIN, Math.min(Z_MAX, zoom_no_pad));
  zoom = Math.max(Z_MIN, Math.min(Z_MAX, zoom));
  if (!Number.isFinite(zoom)) { zoom = 18; zoom_no_pad = 19; }

  // Build URLs
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  let cLat = center_lat, cLng = center_lng;
  if (!isNum(cLat) || !isNum(cLng)) {
    if (isNum(pLat) && isNum(pLng)) { cLat = pLat; cLng = pLng; }
    else if ([neLat, neLng, swLat, swLng].every(isNum)) { cLat = (neLat + swLat) / 2; cLng = (neLng + swLng) / 2; }
    else { return { error: "Could not determine map center" }; }
  }

  // Use formatted address if available, otherwise fall back to coordinates
  const centerStr = `${cLat},${cLng}`;
  const queryParam = formattedStreetAddress
    ? encodeURIComponent(formattedStreetAddress)
    : centerStr;

  const satURL = `https://www.google.com/maps/embed/v1/place?key=${esc(apiKey)}&q=${queryParam}&zoom=${zoom}&maptype=satellite`;
  const svURL = `https://www.google.com/maps/embed/v1/streetview?key=${esc(apiKey)}${panoId ? `&pano=${esc(panoId)}` : ""}&location=${centerStr}&heading=${sv_heading}&pitch=10&fov=80`;

  // Separate iframe styles for aerial and street view
  const aerialStyle = `position:relative;width:${aerialWidth}px;height:${aerialHeight}px;border:0;display:block;`;
  const streetStyle = `position:relative;width:${streetWidth}px;height:${streetHeight}px;border:0;display:block;`;

  const satellite_iframe_html = `<iframe src="${satURL}" loading="lazy" allowfullscreen style="${aerialStyle}"></iframe>`;

  const beacon = webhookUrl
    ? `<img src="${esc(webhookUrl)}?lat=${cLat}&lng=${cLng}${panoId ? `&panoId=${esc(panoId)}` : ""}" width="1" height="1" style="display:none" alt="">`
    : "";

  const streetview_iframe_html = `<iframe src="${svURL}" loading="lazy" allowfullscreen style="${streetStyle}"></iframe>${beacon}`;

  // Return
  return {
    satellite_iframe_html,
    streetview_iframe_html,
    satellite_embed_url: satURL,
    streetview_embed_url: svURL,
    center_lat: cLat,
    center_lng: cLng,
    sv_heading,
    zoom,
    zoom_no_pad,
    target_source,
    aerialWidth,
    aerialHeight,
    streetWidth,
    streetHeight,
    boxPx  // Kept for backward compatibility
  };
}

module.exports = { generateMapsIframes };
