# CDN Deployment Setup Guide

**Date:** 2025-11-14
**Status:** Ready to deploy

---

## Overview

Your Knack app now uses **jsDelivr CDN** to load JavaScript and CSS files directly from GitHub. This means you only need ~60 lines in Knack settings instead of 5000+ lines.

---

## How It Works

```
Your Computer → GitHub → jsDelivr CDN → Knack App → Users
```

1. You edit code locally
2. Git push to GitHub
3. jsDelivr automatically mirrors from GitHub
4. Knack loads from jsDelivr CDN
5. Users get fast, cached files

---

## Setup Instructions

### Step 1: Clear Old Code from Knack

1. Go to **Knack Builder**
2. Navigate to **Settings → Advanced → JavaScript**
3. **DELETE ALL** the existing GreenlightOnline code (the 5000+ lines)
4. Keep only the KTL initialization code at the top:
   ```javascript
   KnackInitAsync = function ($, callback) {
       (window.LazyLoad = LazyLoad) && LazyLoad.js([`https://ctrnd.s3.amazonaws.com/Lib/KTL/KTL_Start.js?${new Date().valueOf()}`], () => {
           loadKtl($, callback, (typeof KnackApp === 'function' ? KnackApp : null), '0.29.14', 'full');
       })
   };
   ```

### Step 2: Add the CDN Loader

5. **Copy** the entire contents of `KNACK_LOADER.js`
6. **Paste** it below the KTL initialization code in Knack settings
7. **Save** in Knack

Your Knack JavaScript settings should now look like:

```javascript
// KTL Initialization (existing code - keep this)
KnackInitAsync = function ($, callback) {
    (window.LazyLoad = LazyLoad) && LazyLoad.js([`https://ctrnd.s3.amazonaws.com/Lib/KTL/KTL_Start.js?${new Date().valueOf()}`], () => {
        loadKtl($, callback, (typeof KnackApp === 'function' ? KnackApp : null), '0.29.14', 'full');
    })
};

// Greenlight Services CDN Loader (new code - paste from KNACK_LOADER.js)
const cacheBuster = '';
const JS_CDN_URL = `https://cdn.jsdelivr.net/gh/Greenlight88/Greenlight-Services@master/KnackApps/GreenlightOnline/GreenlightOnline.js${cacheBuster}`;
// ... rest of loader code ...
```

### Step 3: Test

8. **Refresh** your Knack app
9. **Open browser console** (F12)
10. You should see:
   ```
   🚀 Greenlight Services Loader
   📍 Mode: PRODUCTION (CDN)
   📦 Loading JS from CDN...
   ✅ CSS loaded from CDN
   ✅ JS loaded from CDN
   ```

11. **Verify** your app works as expected

---

## Daily Development Workflow

### Making Changes to Your Code

1. **Edit** the file locally:
   ```
   C:\Code\KnackApps\GreenlightOnline\GreenlightOnline.js
   ```

2. **Test locally** (optional - if you have local server)

3. **Commit** to git:
   ```bash
   cd C:\Code\KnackApps\GreenlightOnline
   git add GreenlightOnline.js
   git commit -m "Description of changes"
   ```

4. **Push** to GitHub:
   ```bash
   git push origin master
   ```

5. **Wait 5-10 minutes** for jsDelivr CDN to update

6. **Refresh** your Knack app - changes are live!

---

## Important Notes

### ✅ Advantages

- **No more copy-paste**: Just git push
- **Version control**: Every change is tracked
- **Faster loading**: CDN serves files globally
- **Clean Knack settings**: Only ~60 lines instead of 5000+
- **Easy rollback**: Can revert to any previous version
- **Better performance**: Files are cached by CDN

### ⚠️ Things to Know

1. **5-10 minute delay**: CDN takes time to update after git push
2. **Public visibility**: Code is visible on GitHub (unless private repo)
3. **Cache clearing**: If urgent update needed, use cache buster (see below)

### 🚨 Emergency Cache Clear

If you need changes to appear immediately (before CDN updates):

1. Open `KNACK_LOADER.js`
2. Uncomment this line:
   ```javascript
   const cacheBuster = `?v=${new Date().getTime()}`;
   ```
3. Copy and paste into Knack settings
4. Save
5. This forces browsers to bypass cache

**Remember to comment it out again after emergency!**

---

## Development Mode (Local Testing)

If you set up a local web server, you can test changes without pushing to GitHub:

1. **Enable dev mode** in browser console:
   ```javascript
   localStorage.setItem('Greenl_56ea_dev', 'true')
   ```

2. **Refresh** Knack app - it will try to load from `localhost:3000`

3. **Make changes** locally and see them immediately

4. **Disable dev mode** when done:
   ```javascript
   localStorage.removeItem('Greenl_56ea_dev')
   ```

---

## CDN URLs Reference

**Your Repository:**
- https://github.com/Greenlight88/Greenlight-Services

**JavaScript CDN:**
- https://cdn.jsdelivr.net/gh/Greenlight88/Greenlight-Services@master/KnackApps/GreenlightOnline/GreenlightOnline.js

**CSS CDN:**
- https://cdn.jsdelivr.net/gh/Greenlight88/Greenlight-Services@master/KnackApps/GreenlightOnline/GreenlightOnline.css

**jsDelivr Documentation:**
- https://www.jsdelivr.com/

---

## Troubleshooting

### Problem: Changes not appearing after git push

**Solution:**
1. Wait full 10 minutes for CDN cache
2. Clear browser cache (Ctrl+Shift+Delete)
3. Hard refresh (Ctrl+F5)
4. If still not working, add cache buster (see Emergency Cache Clear above)

### Problem: Console shows "Failed to load from CDN"

**Solution:**
1. Check GitHub is accessible
2. Verify file exists on GitHub at the repo URL
3. Check jsDelivr status: https://status.jsdelivr.com/
4. Try the CDN URL directly in browser to see if it loads

### Problem: App stops working after switching to CDN

**Solution:**
1. Check browser console for errors
2. Verify KNACK_LOADER.js was pasted correctly
3. Verify CDN URLs are correct
4. Temporarily revert: copy old code back from backup

---

## Backup & Recovery

### Where Backups Are

1. **Git History**: Every commit is a backup
   ```bash
   git log  # See all commits
   git checkout <commit-hash> -- GreenlightOnline.js  # Restore old version
   ```

2. **Local Backup**:
   ```
   C:\Code\KnackApps\GreenlightOnline\GreenlightOnline.js.backup-20251114-231109
   ```

3. **GitHub**: All code is on GitHub cloud

### Emergency Rollback

If you need to quickly rollback to a previous version:

```bash
cd C:\Code\KnackApps\GreenlightOnline
git log --oneline  # Find the commit you want
git revert <commit-hash>  # Or git reset --hard <commit-hash>
git push origin master
# Wait 5-10 minutes for CDN to update
```

---

## Next Steps

1. ✅ Follow "Setup Instructions" above to deploy CDN loader to Knack
2. ✅ Test that app works with CDN
3. ✅ Make a small test change and verify workflow
4. ✅ Proceed with rebuilding company form system

---

**Questions?** Check troubleshooting section or review this guide.
