# Greenlight Online - Version History

## Version 1.0.4 (2024-11-21) - Commit: 283cd64
**Fixes:**
- Fixed pause/resume button appearing on all pages
- Button now properly removed when navigating away from view_4829
- Uses knack-view-render event to detect view changes

**Improvements:**
- Loader now fetches VERSION_MAP.json dynamically from GitHub
- No more hardcoded version mappings in loader code
- Simpler version control: just set APP_VERSION to 'latest' or version number
- Fixed misleading "60 seconds" log to correctly show "10 seconds"

---

## Version 1.0.3 (2024-11-21) - Commit: 0ddf537
**Features:**
- Added timestamp pulse animation on enquiries table (view_4829)
- Timestamp scales to 1.15x, turns green, and bolds text after each refresh
- 1-second smooth animation provides visual feedback
- Automatically triggers every 10 seconds with auto-refresh

---

## Version 1.0.2 (2024-11-20) - Commit: e5c06da
**Features:**
- Added pause/resume button for enquiries table auto-refresh
- Custom 10-second auto-refresh for view_4829 (bypasses KTL 60s limit)
- Button visible to all users, positioned top-right
- Auto-refresh stops when leaving scene_1973

**Fixes:**
- Fixed company_id extraction from Knack form submission
- Post-submission webhook now waits for ECN ID from Make.com response
- Redirect to contact view uses correct ECN ID from webhook
- Form data now captured before submission for webhook payload
- All pre-submission values properly carried through to post-submission

---

## Version 1.0.1 (2024-11-20) - Commit: a21da0a
**Features:**
- Custom auto-refresh for enquiries table (view_4829)
- 10-second refresh interval using KTL's refreshView()
- Preserves scroll position on refresh

**Fixes:**
- Company form webhook system improvements
- Enhanced form data extraction with logging
- Proper handling of address fields in webhooks

---

## Version 1.0.0 (Initial CDN Deployment)
- Initial production deployment to CDN
- Form validation and webhook control system
- KTL integration
- Xero-style search-to-create module
