// ========================================================================
// GREENLIGHT SERVICES - KNACK APP LOADER (CDN Version with Rollback Support)
// ========================================================================
// This loader code goes in Knack Settings → Advanced → JavaScript
//
// GitHub Repo: https://github.com/Greenlight88/Greenlight-Services
//
// SIMPLE VERSION CONTROL:
// Just change APP_VERSION below - no mapping needed!
//   - 'latest' - Always use latest version (pulls from master branch)
//   - '1.0.4' - Use specific version (pulls from VERSION_MAP.json)
//   - '1.0.3', '1.0.2', etc. - Any version number
//
// Version mappings are maintained in VERSION_MAP.json on GitHub
// See full version history: VERSION_HISTORY.md
// ========================================================================

// VERSION CONTROL - Change this to roll back or use specific version
const APP_VERSION = 'latest'; // Use 'latest' or a version like '1.0.4'

// Development mode check
const isDevMode = localStorage.getItem('Greenl_56ea_dev') === 'true';

console.log(`🚀 Greenlight Services Loader`);
console.log(`📍 Mode: ${isDevMode ? 'DEVELOPMENT (localhost)' : 'PRODUCTION (CDN)'}`);
console.log(`🔖 App Version: ${APP_VERSION}`);

// Local development URLs
const JS_LOCAL_URL = 'https://localhost:3000/KnackApps/GreenlightOnline/GreenlightOnline.js';
const CSS_LOCAL_URL = 'https://localhost:3000/KnackApps/GreenlightOnline/GreenlightOnline.css';

// Function to get commit hash for version
async function getCommitHash(version) {
    if (version === 'latest') {
        return 'master';
    }

    // In dev mode, skip version lookup since we're loading from localhost anyway
    if (isDevMode) {
        console.log(`📝 Dev mode: skipping version lookup (loading from localhost)`);
        return 'master'; // Not used in dev mode, but needed for fallback
    }

    // Fetch VERSION_MAP.json from GitHub (production only)
    try {
        const response = await fetch('https://cdn.jsdelivr.net/gh/Greenlight88/Greenlight-Services@master/KnackApps/GreenlightOnline/VERSION_MAP.json');
        const versionMap = await response.json();

        if (versionMap.versions && versionMap.versions[version]) {
            return versionMap.versions[version].commit;
        } else {
            console.warn(`⚠️ Version ${version} not found in VERSION_MAP.json, using master`);
            return 'master';
        }
    } catch (error) {
        console.error(`❌ Failed to fetch VERSION_MAP.json:`, error);
        console.log(`⚠️ Falling back to master branch`);
        return 'master';
    }
}

// Load CSS
function loadCSS(commit) {
    const cssUrl = isDevMode
        ? CSS_LOCAL_URL
        : `https://cdn.jsdelivr.net/gh/Greenlight88/Greenlight-Services@${commit}/KnackApps/GreenlightOnline/GreenlightOnline.css`;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = cssUrl;
    link.crossOrigin = 'anonymous';

    link.onload = function () {
        console.log(`✅ CSS loaded from ${isDevMode ? 'localhost' : 'CDN'}`);
    };

    link.onerror = function () {
        console.error(`❌ CSS failed to load from ${cssUrl}`);
        if (isDevMode) {
            console.log(`⚠️ Falling back to CDN...`);
            const fallbackUrl = `https://cdn.jsdelivr.net/gh/Greenlight88/Greenlight-Services@master/KnackApps/GreenlightOnline/GreenlightOnline.css`;
            link.href = fallbackUrl;
        }
    };

    document.head.appendChild(link);
}

// Load JavaScript
function loadJS(commit) {
    const jsUrl = isDevMode
        ? JS_LOCAL_URL
        : `https://cdn.jsdelivr.net/gh/Greenlight88/Greenlight-Services@${commit}/KnackApps/GreenlightOnline/GreenlightOnline.js`;

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
                const fallbackUrl = `https://cdn.jsdelivr.net/gh/Greenlight88/Greenlight-Services@${commit}/KnackApps/GreenlightOnline/GreenlightOnline.js`;
                LazyLoad.js(fallbackUrl, () => {
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

// Initialize loader
async function initLoader() {
    const commit = await getCommitHash(APP_VERSION);
    console.log(`📌 Commit: ${commit}`);

    loadCSS(commit);
    loadJS(commit);
}

// Start loading
initLoader();

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
//   1. Change APP_VERSION at line 22 to a previous version (e.g., '1.0.2')
//   2. Save in Knack Settings → Advanced → JavaScript
//   3. Refresh the app
//
// TO UPDATE TO LATEST VERSION:
//   1. Change APP_VERSION at line 22 to 'latest'
//   2. Save in Knack Settings
//   3. Refresh the app
//
// EMERGENCY ROLLBACK:
//   Change line 22 to: const APP_VERSION = '1.0.3';
//   This reverts to the last known stable version
// ========================================================================


