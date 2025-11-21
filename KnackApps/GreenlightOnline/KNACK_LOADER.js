// ========================================================================
// GREENLIGHT SERVICES - KNACK APP LOADER (CDN Version with Rollback Support)
// ========================================================================
// This loader code goes in Knack Settings → Advanced → JavaScript
//
// GitHub Repo: https://github.com/Greenlight88/Greenlight-Services
//
// ROLLBACK SUPPORT:
// Change APP_VERSION below to use a specific version or latest
//
// Available versions:
//   - '1.0.2' - Pause/resume button for auto-refresh (2024-11-20) [CURRENT]
//   - '1.0.1' - Custom 10-second auto-refresh (2024-11-20)
//   - '1.0.0' - Initial CDN deployment (2024-11-14)
//   - 'latest' - Always use latest version (not recommended for production)
//
// See full version history: VERSION_HISTORY.md
// ========================================================================

// VERSION CONTROL - Change this to roll back or use specific version
const APP_VERSION = '1.0.2'; // Current version (recommended)
// const APP_VERSION = 'latest'; // Use this to always get latest (riskier)

// Version to commit hash mapping
const VERSION_MAP = {
    '1.0.2': 'e5c06da',
    '1.0.1': 'a21da0a',
    '1.0.0': '0bfaf03',
    'latest': 'master'
};

// Get the commit hash for the specified version
const COMMIT = VERSION_MAP[APP_VERSION] || VERSION_MAP['latest'];

// Development mode check
const isDevMode = localStorage.getItem('Greenl_56ea_dev') === 'true';

console.log(`🚀 Greenlight Services Loader`);
console.log(`📍 Mode: ${isDevMode ? 'DEVELOPMENT (localhost)' : 'PRODUCTION (CDN)'}`);
console.log(`🔖 App Version: ${APP_VERSION}`);
console.log(`📌 Commit: ${COMMIT}`);

// CDN URLs with commit hash
const JS_CDN_URL = `https://cdn.jsdelivr.net/gh/Greenlight88/Greenlight-Services@${COMMIT}/KnackApps/GreenlightOnline/GreenlightOnline.js`;
const CSS_CDN_URL = `https://cdn.jsdelivr.net/gh/Greenlight88/Greenlight-Services@${COMMIT}/KnackApps/GreenlightOnline/GreenlightOnline.css`;

// Local development URLs
const JS_LOCAL_URL = 'http://localhost:3000/KnackApps/GreenlightOnline/GreenlightOnline.js';
const CSS_LOCAL_URL = 'http://localhost:3000/KnackApps/GreenlightOnline/GreenlightOnline.css';

// Load CSS
function loadCSS() {
    const cssUrl = isDevMode ? CSS_LOCAL_URL : CSS_CDN_URL;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = cssUrl;
    link.crossOrigin = 'anonymous';

    link.onload = function() {
        console.log(`✅ CSS loaded from ${isDevMode ? 'localhost' : 'CDN'}`);
    };

    link.onerror = function() {
        console.error(`❌ CSS failed to load from ${cssUrl}`);
        if (isDevMode) {
            console.log(`⚠️ Falling back to CDN...`);
            link.href = CSS_CDN_URL;
        }
    };

    document.head.appendChild(link);
}

// Load JavaScript
function loadJS() {
    const jsUrl = isDevMode ? JS_LOCAL_URL : JS_CDN_URL;

    if (isDevMode) {
        // In dev mode, try localhost first, fallback to CDN
        fetch(jsUrl, { method: 'HEAD', mode: 'no-cors' })
            .then(() => {
                console.log(`📦 Loading JS from localhost...`);
                LazyLoad.js(jsUrl, () => {
                    console.log(`✅ JS loaded from localhost`);
                    logAppVersion();
                });
            })
            .catch(() => {
                console.log(`⚠️ Localhost not available, falling back to CDN...`);
                LazyLoad.js(JS_CDN_URL, () => {
                    console.log(`✅ JS loaded from CDN (fallback)`);
                    logAppVersion();
                });
            });
    } else {
        // Production mode - load from CDN
        console.log(`📦 Loading JS from CDN...`);
        LazyLoad.js(jsUrl, () => {
            console.log(`✅ JS loaded from CDN`);
            logAppVersion();
        });
    }
}

// Log the loaded app version
function logAppVersion() {
    if (window.APP_VERSION) {
        console.log(`✅ App Version: ${window.APP_VERSION}`);
    }
}

// Load CSS and JS
loadCSS();
loadJS();

// ========================================================================
// DEVELOPMENT HELPERS
// ========================================================================
// To enable development mode (load from localhost):
//   localStorage.setItem('Greenl_56ea_dev', 'true')
//   Then refresh the page
//
// To disable development mode:
//   localStorage.removeItem('Greenl_56ea_dev')
//
// TO ROLL BACK TO A PREVIOUS VERSION:
//   1. Change APP_VERSION at line 21 to a previous version (e.g., '1.0.1')
//   2. Save in Knack Settings → Advanced → JavaScript
//   3. Refresh the app
//
// TO UPDATE TO LATEST VERSION:
//   1. Claude will provide the new version number (e.g., '1.0.3')
//   2. Update VERSION_MAP at line 25-30 with new version/commit
//   3. Change APP_VERSION at line 21 to new version
//   4. Save in Knack Settings
//   5. Refresh the app
//
// EMERGENCY ROLLBACK:
//   Change line 21 to: const APP_VERSION = '1.0.1';
//   This reverts to the last known stable version
// ========================================================================

// KTL Initialization
KnackInitAsync = function ($, callback) {
    (window.LazyLoad = LazyLoad) && LazyLoad.js([`https://ctrnd.s3.amazonaws.com/Lib/KTL/KTL_Start.js?${new Date().valueOf()}`], () => {
        loadKtl($, callback, (typeof KnackApp === 'function' ? KnackApp : null), '0.32.7' /*KTL version*/, 'full'/*min or full*/);
    })
};
