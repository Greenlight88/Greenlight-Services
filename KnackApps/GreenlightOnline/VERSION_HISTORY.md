# Greenlight Online - Version History

## Version 1.0.6 (2025-11-24)
**Major Update: Unified Notification System**
- Replaced all inconsistent notification styles with unified inline notification system
- Standardized error, warning, and success messages with brand colors
- Eliminated modal popup dialogs in favor of inline confirmations
- Enhanced submit button state management system

**Unified Notification System:**
- New `notificationSystem` module (lines 4020-4353)
- Brand colors: Success/Info (#39b54a green), Error (#d32f2f red), Warning (#ffc107 orange)
- Four notification types: error, warning, success, info with consistent styling
- Inline field notifications that maintain context
- Methods:
  - `showFieldNotification()` - Shows inline notification below field
  - `clearFieldNotification()` - Removes notification
  - `clearAllNotifications()` - Removes all notifications for a view
  - `showInlineConfirmation()` - Inline confirmation box replacing modals
  - `submitButton.setState()` - Manages button states (ready, loading, disabled, success, error)

**Refactored Components:**
- **duplicateHandler methods:**
  - `showFieldError()` - Now uses notificationSystem
  - `showFieldWarning()` - Now uses notificationSystem
  - `showFieldInfo()` - Now uses notificationSystem
  - `clearFieldError()` - Now uses notificationSystem
  - `clearAllWarnings()` - Now uses notificationSystem
  - `showConfirmationDialog()` - Replaced modal with inline confirmation
- **FormValidationWebhookSystem utils:**
  - `addFieldError()` - Updated to use notificationSystem when viewId provided
  - `removeFieldError()` - Updated to use notificationSystem when viewId provided
- **Other validations:**
  - Odometer validation (view_5444) - Now uses notificationSystem
  - `showError()` - Toast notification with brand colors
  - Email validation interceptor (view_5518) - Now uses notificationSystem

**User Experience Improvements:**
- All error messages now appear inline below fields (consistent style)
- No more jarring modal popups covering the page
- Submit button shows clear states: "Checking for duplicates...", "Waiting for confirmation...", etc.
- Confirmation boxes appear inline before submit button
- Field warnings remain visible during confirmation (maintains context)
- Success messages use brand green (#39b54a)

**Technical Benefits:**
- Centralized styling - all notification colors/styles in one place
- Backward compatible - falls back to old style if notificationSystem not loaded
- Reduced code duplication (~150 lines of duplicate notification code eliminated)
- Easier maintenance - change notification style in one place

**Files Modified:**
- `GreenlightOnline.js` - 300+ lines refactored for unified notification system

---

## Version 1.0.5 (2025-11-23)
**Major Feature: Change Detection Framework**
- Added intelligent form revalidation system for Create Company form (view_4059)
- Tracks field changes after validation and determines when revalidation is needed
- Three strategy types: `revalidate`, `conditional`, `allow`
- Priority-based logic for multiple simultaneous field changes
- Informative user messages ("Company name changed - rechecking...")

**Technical Details:**
- New `fieldChangeStrategies` configuration object (lines 4034-4090)
- New `changeTracker` module with methods:
  - `captureValidatedValues()` - Stores baseline after webhook validation
  - `needsRevalidation()` - Intelligent decision making
  - `getChangesSummary()` - For user-facing messages
  - `clearValidationState()` - Cleanup on successful submission
- Enhanced submission flow with revalidation logic (lines 5355-5410)
- Integrated into existing `handleDuplicateResponse`, `submitForm`

**Scenarios Handled:**
- Delete offending email → Allows submit (no revalidation)
- Change company name → Revalidates (duplicate check)
- Change email to different value → Revalidates (email validation)
- Change company name + delete email → Revalidates (priority logic)
- Change address only → Allows submit (address not validated)

**Framework Design:**
- Extensible to other forms (placeholders added for Create Contact, Update Company, Update Contact)
- Declarative configuration approach
- Safe defaults (unknown fields trigger revalidation)
- Comprehensive documentation in `CHANGE_DETECTION_FRAMEWORK.md`

**Files Modified:**
- `GreenlightOnline.js` - Added 250+ lines of framework code
- `CHANGE_DETECTION_FRAMEWORK.md` - New documentation file
- Backup created: `GreenlightOnline.js.backup-20251123-234224`

---

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
