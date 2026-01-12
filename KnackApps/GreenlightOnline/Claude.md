# Greenlight Online - Project Guide

**Last Updated:** 2025-12-09
**Current Version:** 1.0.9
**Developer:** Michael Tierney (michael@greenlightservices.com.au)

---

## 🚨 Documentation Policy

**CRITICAL: Do NOT create documentation files unless explicitly requested.**

- ❌ NO implementation guides, session summaries, or strategy docs
- ❌ NO markdown files for features, fixes, or changes
- ✅ ONLY update this Claude.md file when prompted by user
- ✅ Provide summaries in chat responses instead of files

**If documenting implementation details is needed:**
1. Ask user first
2. If approved, add to this Claude.md (don't create new files)

---

## Tool Preferences (Serena MCP)

### Safe Serena Tools (READ-ONLY)

Use Serena MCP tools for **reading/searching** in this codebase:

| Task | Use Serena Tool |
|------|-----------------|
| Search code | `mcp__serena-greenlight__search_for_pattern` |
| Read files | `mcp__serena-greenlight__read_file` |
| Find files | `mcp__serena-greenlight__find_file` |
| List directories | `mcp__serena-greenlight__list_dir` |
| Find symbols | `mcp__serena-greenlight__find_symbol` |
| Get overview | `mcp__serena-greenlight__get_symbols_overview` |

### 🚨 DANGEROUS - DO NOT USE FOR EDITING

**CRITICAL: Serena's editing tools have corrupted the codebase multiple times!**

| NEVER Use | Use Instead |
|-----------|-------------|
| ❌ `replace_regex` | ✅ Built-in `Edit` tool |
| ❌ `replace_symbol_body` | ✅ Built-in `Edit` tool |
| ❌ `insert_after_symbol` | ✅ Built-in `Edit` tool |
| ❌ `insert_before_symbol` | ✅ Built-in `Edit` tool |
| ❌ `create_text_file` | ✅ Built-in `Write` tool |

**Why:** The `replace_regex` tool has deleted entire files (11,000+ lines) replacing them with single lines. This has happened multiple times. There is no safe way to use it.

**Rule: ALWAYS use built-in `Edit` tool for ALL code modifications.**

**Exception:** Use built-in tools (Grep, Read, Bash) for files **outside** the project directory (e.g., KTL library at `C:\Code\Lib\KTL`).

---

## Project Overview

### Purpose
This is a **Knack application codebase** for Greenlight Services - an enquiries management system with custom JavaScript/CSS enhancements.

### Technology Stack
- **Platform**: Knack (low-code database/app platform)
- **Frontend**: JavaScript (ES6+), CSS
- **Library**: KTL (Knack Toolkit Library) v0.29.14 - open-source utilities
- **Deployment**: jsDelivr CDN (auto-updates from GitHub)
- **Backend Integration**: Make.com webhooks for validation/processing
- **Version Control**: Git/GitHub

### Repository
- **GitHub**: https://github.com/Greenlight88/Greenlight-Online
- **Live App**: Loads code via jsDelivr CDN

---

## File Structure

```
C:\Code\KnackApps\GreenlightOnline\
├── GreenlightOnline.js          (6500+ lines - main application code)
├── GreenlightOnline.css         (application styling)
├── KNACK_LOADER.js              (CDN loader script - deployed to Knack settings)
├── VERSION_MAP.json             (version routing configuration)
├── VERSION_HISTORY.md           (changelog)
├── CDN_SETUP_GUIDE.md          (deployment instructions)
├── make_scenarios\              (Make.com webhook JS modules)
│   ├── company_duplicate_detection_lightweight.js
│   ├── shared_contacts_processor.js
│   ├── company_search_outcome_processor.js
│   ├── ccn_conflicts_to_block_payload.js
│   ├── full_processing_post_webhook.js
│   ├── duplicate_detection_lightweight.js
│   ├── initial_duplicate_detection_lightweight.js
│   └── address-iframe-analysis.js
└── docs\                        (key reference docs only)
    ├── Claude.md                (this file - single source of truth)
    ├── SHARED_CONTACTS_BLOCKING_GUIDE.md
    └── CCN_BLOCK_PROCESSOR_INTEGRATION_GUIDE.md
```

### Archive Location
Historical documentation (71 files) archived at: `C:\Code\make_scenarios\Data Validation Project\`

---

## Development Workflow

### Making Code Changes

1. **Edit** files locally in `C:\Code\KnackApps\GreenlightOnline\`
2. **Test** (optional - local development mode available)
3. **Commit** changes:
   ```bash
   git add .
   git commit -m "Description of changes"
   ```
4. **Push** to GitHub:
   ```bash
   git push origin master
   ```
5. **Wait 5-10 minutes** for jsDelivr CDN to update
6. **Refresh** Knack app - changes are live!

### Version Management
After significant changes:
1. Update `APP_VERSION` in GreenlightOnline.js (line 1)
2. Update VERSION_HISTORY.md with changes
3. Commit and push

### Windows Notification System
Use notifications for long-running tasks or when waiting for user input:

```bash
powershell.exe -ExecutionPolicy Bypass -File "C:\Code\notify.ps1" -Title "Title" -Message "Message" -Type "success"
```

Types: `info`, `success`, `warning`, `error`

---

## Database Architecture

### Core Tables

**1. Entities (ENT)**
- Companies and People
- Each has a "Self Connection" (ECN) for structural consistency

**2. Entity Connections (ECN)**
- Defines relationships between Entities
- Types: General Staff, Main Contact, Business Owner, Self Connection
- Links people to companies

**3. Communication Channels (COM)**
- Emails, phone numbers, mobiles, extensions
- Can be Personal or Company-owned

**4. Communication Connections (CCN)**
- Links Communication Channels to Entity Connections
- Allows one channel to be shared by multiple people
- Enables end-dating when employment ceases

### Data Flow Philosophy
- **Personal contacts** remain with the person when employment ends
- **Company contacts** stay with the company
- Communication channels can be re-linked without duplication

---

## Form Validation & Webhook System

**Location in code:** Lines ~2800-5500 (GreenlightOnline.js)
**Section header:** `// FORM VALIDATION AND WEBHOOK CONTROL SYSTEM`

### Overview
Pre-validates and normalizes contact information, sends to Make.com for duplicate detection, handles three response types.

### Workflow

#### Phase 1: Client-Side Validation (JavaScript)
1. User fills form (company name, contact details, email, phone, mobile)
2. JavaScript normalizes and validates data format
3. On submit, sends webhook to Make.com for duplicate detection
4. Submit button shows: "Checking for duplicates..."

#### Phase 2: Make.com Processing
Searches for duplicates and returns one of three responses:

**A. Block Response** (duplicate found)
- Duplicate name-company combination found in ECN table
- Returns error message to user
- Form submission prevented
- User sees inline error notification

**B. Proceed Response** (no conflicts)
- No duplicates or shared contacts found
- Returns "proceed" immediately (~4 seconds)
- User redirected to contact view in wireframe loading state
- Background processing continues:
  1. Create/verify Company Self ECN
  2. Create Contact Entity (ENT) + Self ECN
  3. Analyze COMs for nature (Personal/Work/Company)
  4. Create up to 3 CCNs + 3 COMs
  5. Link CCNs to appropriate entities
  6. Post-submission webhook polls for completion
  7. Final updates trigger contact details to load

**C. Confirm Response** (shared contacts detected)
- Matching communication channel found on different name
- Shows inline confirmation UI
- User chooses: create shared contacts OR revalidate data
- Response sent to third webhook or form resubmission

### Key Features

**Change Detection Framework** (v1.0.5)
- Tracks field changes after validation
- Intelligent revalidation decisions
- Three strategies: `revalidate`, `conditional`, `allow`
- Priority-based logic for multiple changes
- User-friendly messages ("Company name changed - rechecking...")

**Unified Notification System** (v1.0.6)
- Inline notifications below fields (no modal popups)
- Brand colors: Success (#39b54a), Error (#d32f2f), Warning (#ffc107)
- Submit button state management (ready, loading, disabled, success, error)
- Methods: `showFieldNotification()`, `clearFieldNotification()`, `showInlineConfirmation()`

### Make.com JavaScript Module Input Format

**CRITICAL PATTERN** (confirmed working):

```javascript
// Helper function to extract values from Make.com input array
function getInputValue(inputArray, name) {
    if (Array.isArray(inputArray)) {
        const item = inputArray.find(i => i.name === name);
        return item ? item.value : null;
    }
    return inputArray[name] || null;
}

// Usage:
const myVariable = getInputValue(input, 'variable_name');
```

**Input structure:**
```json
[
  { "name": "ccn_search_results", "value": [...] },
  { "name": "email_normalised", "value": "test@example.com" },
  { "name": "phone_normalised", "value": "+61412345678" }
]
```

**Common mistake:** ❌ Don't do `input[0].input` - input is already the array!

---

## Current Work: Form Validation Project

### Status
**Active implementation** - Most functionality complete, minor refinements ongoing

### Recent Changes
- ✅ Block scenario fully implemented (duplicate name-company detection)
- ✅ Proceed scenario fully implemented (background processing)
- ✅ Confirm scenario implemented (shared contacts UI)
- ✅ Post-submission webhook with polling
- ✅ Change detection framework
- ✅ Unified notification system
- 🔄 Minor Make.com JS adjustments in progress

### Architecture Decision
**Note:** Previously used CCN connections proving unnecessary - added extra complexity. Under review for simplification.

### Known Issues
- Minor hitches with Make.com JS still resolving
- Some post-submission update forms need refinement

### Key Forms
- **view_4059**: Create Company form (main validation implementation)
- **view_5612**: Create Contact form (duplicate detection, phone sharing)
- **view_4829**: Enquiries table (auto-refresh, pause/resume)
- **view_5518**: Email validation interceptor

---

## Key Application Features

### Auto-Refresh System (v1.0.2-1.0.3)
- **Location**: Enquiries table (view_4829)
- **Interval**: 10 seconds (bypasses KTL 60s limit)
- **Features**:
  - Pause/resume button (top-right)
  - Timestamp pulse animation (green glow on refresh)
  - Preserves scroll position
  - Auto-stops when leaving scene_1973

### Xero-Style Search Module
- Search-to-create pattern for entities
- Integration with Xero API (if configured)

---

## Code Style Conventions

### General Principles
- ES6+ JavaScript (const/let, arrow functions, template literals)
- Modular architecture with clear section headers
- Comprehensive inline comments
- Error handling with fallbacks

### Naming Conventions
- **camelCase**: Functions, variables (`handleDuplicateResponse`, `formData`)
- **PascalCase**: Classes, constructors (`FormValidationWebhookSystem`)
- **UPPER_SNAKE_CASE**: Constants (`APP_VERSION`, `JS_CDN_URL`)
- **kebab-case**: CSS classes, HTML IDs (`field-notification`, `view-4059`)

### Section Structure
Major features separated by comment blocks:
```javascript
// ========================================================================
// FEATURE NAME
// ========================================================================
```

### Logging
- Use console grouping for complex operations
- Include context in log messages
- Production code retains debug logs for troubleshooting

---

## Deployment Model

### CDN Architecture
```
Local Code → Git Push → GitHub → jsDelivr CDN → Knack App → Users
```

### URLs
- **JS**: https://cdn.jsdelivr.net/gh/Greenlight88/Greenlight-Services@master/KnackApps/GreenlightOnline/GreenlightOnline.js
- **CSS**: https://cdn.jsdelivr.net/gh/Greenlight88/Greenlight-Services@master/KnackApps/GreenlightOnline/GreenlightOnline.css

### Knack Settings
Only ~60 lines in Knack JavaScript settings:
1. KTL initialization
2. KNACK_LOADER.js content (loads from CDN)

### Emergency Cache Clear
If urgent update needed:
1. Uncomment cache buster in KNACK_LOADER.js
2. Update Knack settings
3. Remember to remove after emergency!

### Local Development Mode
Enable in browser console:
```javascript
localStorage.setItem('Greenl_56ea_dev', 'true')
```
App will load from `http://localhost:3000` instead of CDN.

### Local File Server
Start the local development server:
```bash
cd C:\Code\Lib\KTL
FileServer.bat
```
Serves files from `C:\Code` on `http://localhost:3000`

**HTTPS Setup (Future)**
HTTPS files prepared but not in use (KTL CDN still uses HTTP):
- `C:\Code\Lib\KTL\NodeJS\NodeJS_FileServer_HTTPS.js`
- `C:\Code\Lib\KTL\NodeJS\localhost+1.pem` (certificate, valid until 2028)
- `C:\Code\Lib\KTL\NodeJS\localhost+1-key.pem` (private key)
- `C:\Code\Lib\KTL\FileServer_HTTPS.bat`

When KTL CDN is updated to support HTTPS, update:
1. `KNACK_LOADER.js` - change `http://` to `https://` in local URLs
2. `KTL_Start.js` - change `ktlSvr` to use `https://`

---

## Testing

### Manual Testing
- No automated tests configured
- Test in Knack app directly
- Check browser console for errors

### Test Files (Archived)
Historical test HTML files archived in `C:\Code\Archive\test_files\`

---

## Git Workflow

### Standard Commits
```bash
git add .
git commit -m "Brief description"
git push origin master
```

### Viewing History
```bash
git log --oneline
git status
```

### Emergency Rollback
```bash
git log --oneline                    # Find commit to restore
git revert <commit-hash>              # Safe rollback
# OR
git reset --hard <commit-hash>        # Full reset (use with caution)
git push origin master
```

---

## Running Claude Code

### Recommended Location
**Run from:** `C:\Code\KnackApps\GreenlightOnline\`

**Benefits:**
- Only ~25 files indexed (vs 4,686 from C:\Code)
- Faster startup and response times
- Focused workspace
- Archive preserved but not scanned

### Starting Claude
```bash
cd C:\Code\KnackApps\GreenlightOnline
# Run Claude Code from here
```

---

## Troubleshooting

### Changes Not Appearing After Git Push
1. Wait full 10 minutes for CDN cache
2. Clear browser cache (Ctrl+Shift+Delete)
3. Hard refresh (Ctrl+F5)
4. Use cache buster if urgent (see Deployment Model)

### Console Shows "Failed to load from CDN"
1. Check GitHub is accessible
2. Verify file exists on GitHub
3. Check jsDelivr status: https://status.jsdelivr.com/
4. Try CDN URL directly in browser

### Form Validation Not Working
1. Check browser console for JavaScript errors
2. Verify webhook endpoints in Make.com are responding
3. Check Make.com scenario execution logs
4. Verify field IDs match code references

### Make.com Webhook Issues
1. Check scenario is active
2. Verify input array format matches pattern
3. Test with Make.com's "Run once" feature
4. Check for rate limiting

---

## Session Tracking

### Session History
This section updated at end of each significant session.

**2025-12-09: Phone Sharing & Event Handler Fixes (v1.0.9)**
- Implemented phone number sharing logic with 3 scenarios (block/block/confirm based on name match and ownership)
- Added `pendingShareableConflicts` tracking to block form submission until phone conflicts resolved
- Added auto-submit when user clicks "Share Contact" and no other conflicts remain
- Fixed event handler accumulation causing spinning wheels and KTL timeout warnings
- Added namespaced jQuery events (`.phoneShare`) with `.off()` calls to prevent handler buildup
- Updated `hasNoErrors()` to check both `fieldErrors` AND `pendingShareableConflicts`
- Attempted HTTPS local dev server setup (mkcert certificates generated) but reverted due to KTL CDN loading from HTTP
- HTTPS server files retained in `C:\Code\Lib\KTL\NodeJS\` for future use when KTL CDN is updated
- Local dev server remains at `http://localhost:3000`

**2025-11-24: File Reorganization**
- Moved 8 Make.com JS files to `./make_scenarios/`
- Moved 2 key reference docs to `./docs/`
- Created comprehensive Claude.md
- Updated .gitignore to prevent doc proliferation
- Updated Serena memory with new file locations
- Cleaned up backup files
- Optimized for running Claude from GreenlightOnline directory
- File count reduced from 4,686 to ~25 for faster performance

---

## Quick Reference

### Common Commands
```bash
# Git
git status
git add .
git commit -m "message"
git push

# PowerShell (Windows)
Get-ChildItem                        # List files
Get-Content file.js                  # Read file
(Get-Content file.js).Count          # Count lines

# Notification
powershell.exe -ExecutionPolicy Bypass -File "C:\Code\notify.ps1" -Title "Done" -Message "Task complete" -Type "success"
```

### Key File Locations
- Main code: `./GreenlightOnline.js`
- Styles: `./GreenlightOnline.css`
- Make scenarios: `./make_scenarios/*.js`
- Archive: `C:\Code\make_scenarios\Data Validation Project\`

### Important Line Numbers (GreenlightOnline.js)
- APP_VERSION: Line 1
- KTL Config: Lines 50-200
- Form Validation System: Lines 2800-5500
- Notification System: Lines 4020-4353
- Change Detection: Lines 4034-4090
- Auto-refresh: Lines 5600-5800

---

**End of Project Guide**
