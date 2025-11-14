// ========================================================================
// GREENLIGHT SERVICES - KNACK APP LOADER (CDN Version)
// ========================================================================
// This minimal loader code goes in Knack Settings → Advanced → JavaScript
//
// The actual application code is loaded from jsDelivr CDN, which
// automatically serves the latest version from GitHub.
//
// GitHub Repo: https://github.com/Greenlight88/Greenlight-Services
// CDN URLs:
//   - JS:  https://cdn.jsdelivr.net/gh/Greenlight88/Greenlight-Services@master/KnackApps/GreenlightOnline/GreenlightOnline.js
//   - CSS: https://cdn.jsdelivr.net/gh/Greenlight88/Greenlight-Services@master/KnackApps/GreenlightOnline/GreenlightOnline.css
//
// To deploy updates:
//   1. Edit local file: C:\Code\KnackApps\GreenlightOnline\GreenlightOnline.js
//   2. Commit: git add -A && git commit -m "Your message"
//   3. Push: git push origin master
//   4. Wait 5-10 minutes for CDN to update
//   5. Refresh Knack app to see changes
// ========================================================================

// Add cache-busting parameter for development (comment out for production)
// const cacheBuster = `?v=${new Date().getTime()}`;
const cacheBuster = ''; // Production mode - rely on CDN caching

// CDN URLs
const JS_CDN_URL = `https://cdn.jsdelivr.net/gh/Greenlight88/Greenlight-Services@master/KnackApps/GreenlightOnline/GreenlightOnline.js${cacheBuster}`;
const CSS_CDN_URL = `https://cdn.jsdelivr.net/gh/Greenlight88/Greenlight-Services@master/KnackApps/GreenlightOnline/GreenlightOnline.css${cacheBuster}`;

// Local development URLs (for testing)
const JS_LOCAL_URL = 'http://localhost:3000/KnackApps/GreenlightOnline/GreenlightOnline.js';
const CSS_LOCAL_URL = 'http://localhost:3000/KnackApps/GreenlightOnline/GreenlightOnline.css';

// Check if in development mode (set in browser console: localStorage.setItem('Greenl_56ea_dev', 'true'))
const isDevMode = localStorage.getItem('Greenl_56ea_dev') === 'true';

console.log(`🚀 Greenlight Services Loader`);
console.log(`📍 Mode: ${isDevMode ? 'DEVELOPMENT (localhost)' : 'PRODUCTION (CDN)'}`);

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
                });
            })
            .catch(() => {
                console.log(`⚠️ Localhost not available, falling back to CDN...`);
                LazyLoad.js(JS_CDN_URL, () => {
                    console.log(`✅ JS loaded from CDN (fallback)`);
                });
            });
    } else {
        // Production mode - load from CDN
        console.log(`📦 Loading JS from CDN...`);
        LazyLoad.js(jsUrl, () => {
            console.log(`✅ JS loaded from CDN`);
        });
    }
}

// Load CSS and JS
loadCSS();
loadJS();

// ========================================================================
// DEVELOPMENT HELPERS
// ========================================================================
// To enable development mode (load from localhost instead of CDN):
//   Open browser console and run:
//   localStorage.setItem('Greenl_56ea_dev', 'true')
//   Then refresh the page
//
// To disable development mode:
//   localStorage.removeItem('Greenl_56ea_dev')
//   Then refresh the page
//
// To force cache refresh from CDN:
//   Uncomment the cacheBuster line at the top and save this in Knack
// ========================================================================
