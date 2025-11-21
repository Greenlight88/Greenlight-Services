// ========================================================================
// GREENLIGHT SERVICES - KNACK APP LOADER (CDN Version with Rollback Support)
// ========================================================================
// This loader code goes in Knack Settings → Advanced → JavaScript
//
// GitHub Repo: https://github.com/Greenlight88/Greenlight-Services
//
// ROLLBACK SUPPORT:
// To use a specific version/commit, set the VERSION constant below.
// To use the latest from master, set VERSION = 'master'
//
// Available versions (recent commits):
//   - '0dfa2da' - Pause/resume button for auto-refresh (2024-11-20)
//   - 'a21da0a' - Auto-refresh + company form webhook fixes (2024-11-20)
//   - 'master'  - Always use latest (not recommended for production)
// ========================================================================

// VERSION CONTROL - Change this to roll back or use specific version
const VERSION = '0dfa2da'; // Current version with pause/resume button
// const VERSION = 'master'; // Use this to always get latest (riskier)

// Development mode check
const isDevMode = localStorage.getItem('Greenl_56ea_dev') === 'true';

console.log(`🚀 Greenlight Services Loader`);
console.log(`📍 Mode: ${isDevMode ? 'DEVELOPMENT (localhost)' : 'PRODUCTION (CDN)'}`);
console.log(`🔖 Version: ${VERSION}`);

// CDN URLs with version
const JS_CDN_URL = `https://cdn.jsdelivr.net/gh/Greenlight88/Greenlight-Services@${VERSION}/KnackApps/GreenlightOnline/GreenlightOnline.js`;
const CSS_CDN_URL = `https://cdn.jsdelivr.net/gh/Greenlight88/Greenlight-Services@${VERSION}/KnackApps/GreenlightOnline/GreenlightOnline.css`;

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
//   1. Find the commit hash from git log or GitHub
//   2. Update VERSION constant at top of this file (line 19)
//   3. Save in Knack Settings → Advanced → JavaScript
//   4. Refresh the app
//
// TO UPDATE TO LATEST:
//   1. Get the latest commit hash from GitHub
//   2. Update VERSION constant to new commit hash (line 19)
//   3. Save in Knack Settings
//   4. Refresh the app
// ========================================================================

// KTL Initialization
KnackInitAsync = function ($, callback) {
    (window.LazyLoad = LazyLoad) && LazyLoad.js([`https://ctrnd.s3.amazonaws.com/Lib/KTL/KTL_Start.js?${new Date().valueOf()}`], () => {
        loadKtl($, callback, (typeof KnackApp === 'function' ? KnackApp : null), '0.32.7' /*KTL version*/, 'full'/*min or full*/);
    })
};
