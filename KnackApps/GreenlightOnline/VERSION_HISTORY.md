# Greenlight Online - Version History

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
