# Greenlight Services - Form Validation Project

## Project Overview

Building a form validation and webhook system for Greenlight Services Knack application. The system validates and normalizes contact/company data before submission, checks for duplicates via Make.com webhooks, and handles various response scenarios (proceed, block, confirm).

## Completed Work

### Infrastructure
- **CDN Deployment**: Code deploys via GitHub → jsDelivr CDN (`git push` to deploy)
- **Form Validation Framework**: Reusable system adaptable for multiple forms
- **Notification System**: Inline notifications below fields (no modal popups)
- **Change Detection Framework**: Tracks field changes, determines revalidation needs

### Completed Forms

| Form | View ID | Status |
|------|---------|--------|
| Create Company | view_4059 | Complete |
| Update Company | view_5605 | Complete |
| Create Contact | view_5612 | Complete |
| Update Contact | view_5626 | Complete |
| Create Contact with Company | view_5631 | Complete |
| Quick Create Contact | view_5685 | Complete |

#### 1. Create Company Form (view_4059)
- Pre-submission webhook for duplicate company detection
- Post-submission webhook for ECN creation
- Company name normalization and searching
- Address field handling

#### 2. Update Company Form (view_5605)
- Processing status polling
- Change detection for selective revalidation
- Original value tracking from hidden views

#### 3. Create Contact Form (view_5612)
- Form config added to viewConfigs
- contactFormHandler with payload builders
- Pre-submission webhook for duplicate detection
- Post-submission webhook for COM creation
- Smart name formatting implemented
- Phone sharing logic with 3 scenarios (block/block/confirm)
- pendingShareableConflicts tracking to block submission until resolved
- Auto-submit after "Share Contact" when no other conflicts
- Namespaced event handlers to prevent accumulation

#### 4. Update Contact Form (view_5626)
- Hidden view config for original values and record IDs
- Change detection for selective revalidation
- Pre-submission webhook for conflict detection
- Post-submission webhook for COM updates
- Phone/email sharing scenarios

#### 5. Create Contact with Company Form (view_5631)
- Links contact to company (parent record)
- Parent record ID capture from hidden view
- Pre-submission webhook for duplicate detection
- Post-submission webhook for COM creation
- Company Role field (checkbox)
- Job Title field

#### 6. Quick Create Contact Form (view_5685)
- Part of streamlined Company → Contact → Project/Proposal workflow
- Top-level form on scene_2435 (no modal)
- Reuses same webhooks as view_5631
- Parent record ID stored in hidden field_4358 (text field)
- Company record ID passed via `window._newCompanyRecordId`
- Dual submit buttons: "Create Project" (green) and "Create Proposal" (grey)
- Next action tracked via `window._quickCreateNextAction`
- Redirects to Project or Proposal creation after successful submission

### UI Enhancements

#### ECN Type-Based Visibility (scene_2397)
- **view_5601 buttons** visibility controlled by field_4219 (ECN Type)
- Update Company button: visible for all organization types
- Update Contact button: visible for Individual only
- Add Contact button: visible for organizations only (not Individual)
- **view_5634** (Staff Details): visible for organizations only

#### New Contact Pending Message
- When contact created via modal (view_5631), shows "New Contact pending..." above view_5634
- Uses `window._newContactPending` flag
- Message clears automatically when webhook completes and view refreshes
- Provides visual feedback during async COM creation

## Quick Create Workflow

### Purpose
Streamlines the common workflow: Create Company → Create Contact → Create Project/Proposal

### Flow Architecture
```
1. User creates new Company (view_4059)
   ↓
2. On successful submission, redirects to scene_2435
   - Company ECN ID stored in window._newCompanyEcnId
   - Company Record ID stored in window._newCompanyRecordId
   ↓
3. Quick Create Contact form (view_5685) renders
   - Prefills parent_record_id (field_4358) from stored company ID
   - User enters contact details
   - Two submit buttons: "Create Project" (green) / "Create Proposal" (grey)
   ↓
4. User clicks either button
   - Button sets window._quickCreateNextAction = 'project' or 'proposal'
   - Form submits with standard validation and webhooks
   ↓
5. On successful submission, redirects based on next action
   - 'project' → Project creation form (TBD)
   - 'proposal' → Proposal creation form (TBD)
```

### Technical Details
- **Scene**: scene_2435 (`#contacts6/add-contact-to-company2/`)
- **Parent ID Field**: field_4358 (hidden text field)
- **Webhooks**: Same as view_5631 (Create Contact with Company)
- **Window Flags**: `_newCompanyRecordId`, `_newCompanyEcnId`, `_quickCreateNextAction`, `_parentRecordId`

## Current Focus: Backend Replacement for Make.com

### Overview
Replacing Make.com webhook scenarios with a custom Node.js backend deployed to Vercel. This eliminates Make.com complexity (slow, finicky) while maintaining the same form validation flow.

### Architecture
```
DEVELOPMENT (Local Testing)
┌─────────────────────────────────────────────────────────┐
│  Browser (Knack App with local dev mode)                │
│    ↓                                                    │
│  localhost:3000 → KTL FileServer (JS/CSS files)         │
│  localhost:3001 → Backend API (validation endpoints)    │
└─────────────────────────────────────────────────────────┘

PRODUCTION (After git push)
┌─────────────────────────────────────────────────────────┐
│  Browser (Knack App)                                    │
│    ↓                                                    │
│  jsDelivr CDN → JS/CSS files (existing)                 │
│  Vercel → Backend API (new)                             │
└─────────────────────────────────────────────────────────┘
```

### Deployment
- **Production URL**: https://greenlight-services-3.vercel.app/
- **Health Check**: https://greenlight-services-3.vercel.app/api/health
- **Validation Endpoint**: https://greenlight-services-3.vercel.app/api/company/validate

### New Files Created
```
C:\Code\KnackApps\GreenlightOnline\
├── api/                         # Vercel serverless functions
│   ├── company/
│   │   └── validate.js          # Pre-submission endpoint (✓ working)
│   ├── db/
│   │   ├── init.js              # Database initialization
│   │   └── logs.js              # View request logs
│   └── cron/
│       └── cleanup.js           # Daily log cleanup (90 day retention)
├── db/                          # Database layer
│   ├── client.js                # Postgres client & logging functions
│   └── schema.sql               # Table definitions
├── lib/                         # Shared backend code
│   ├── knack-api.js             # Knack API helper
│   ├── mailersend.js            # Email validation (permissive)
│   └── duplicate-detection.js   # Conflict analysis logic
├── tools/                       # Development utilities
│   └── db-query.js              # Direct database query tool
├── server.js                    # Local dev server (Express, port 3001)
├── vercel.json                  # Vercel deployment config
├── package.json                 # Dependencies
├── .env.local                   # Local secrets (gitignored)
└── .env.example                 # Template for environment variables
```

### Database (Neon Postgres)

**Connection:** Neon serverless Postgres via Vercel integration (Sydney region)

**Request Logging:** All API calls logged with:
- Request/response payloads (JSONB)
- Outcome (proceed, block, confirm, error)
- Duration in milliseconds
- Debug traces for entity lookups

**Query Tool:**
```bash
# Recent logs
node tools/db-query.js "SELECT id, endpoint, outcome, created_at FROM request_log ORDER BY created_at DESC LIMIT 5"

# Check debug trace
node tools/db-query.js "SELECT response_payload->'_debug' FROM request_log ORDER BY created_at DESC LIMIT 1"

# Full response payload
node tools/db-query.js "SELECT response_payload FROM request_log WHERE id = 1"
```

### Environment Variables (Vercel Dashboard)
- `KNACK_APP_ID` - Knack application ID
- `KNACK_API_KEY` - Knack REST API key
- `MAILERSEND_API_KEY` - MailerSend API token
- `POSTGRES_URL` - Neon connection string (auto-added by Vercel integration)
- `ADMIN_SECRET` - Secret for protected endpoints (db init, logs)

### Current Status

| Component | Status |
|-----------|--------|
| Project setup (package.json, vercel.json) | ✓ Complete |
| Knack API helper (lib/knack-api.js) | ✓ Complete |
| MailerSend helper (lib/mailersend.js) | ✓ Complete |
| Pre-submission endpoint (api/company/validate.js) | ✓ Complete |
| Post-submission endpoint (api/company/process.js) | ❌ Not started |
| Frontend integration (GreenlightOnline.js) | ✓ Complete |
| DevServer.bat (one-click local startup) | ✓ Complete |
| nodemon (auto-restart on file changes) | ✓ Complete |
| **Postgres database (Neon)** | ✓ Complete |
| **Request logging** | ✓ Complete |
| **Debug trace system** | ✓ Complete |
| **Database query tool** | ✓ Complete |

### Testing Results
- **Block case**: ✓ Working - duplicate companies return `action_required: "block"`
- **Proceed case**: ✓ Working - unique companies return `action_required: "proceed"`
- **Confirm case**: ✓ Working - conflicts detected, entity names resolved correctly
- **Entity name lookup**: ✓ Fixed - uses `field_4080` (calculated field for both Companies and Individuals)
- **Speed**: Instant response vs Make.com delays - significant UX improvement confirmed
- **Logging**: All requests logged to Postgres with full payloads and debug traces

### Knack Object/Field Reference
```
ENT (Entities):        object_54
  - company_search:    field_4059
  - company_short:     field_4134
  - entity_name:       field_4080  (calculated - works for both Companies and Individuals)
  - company_name:      field_977   (Companies only)
  - person_name:       field_3860  (Individuals only - Name field type)
  - entity_type:       field_3845  ("Company" or "Individual")

ECN (Entity Connections): object_187
  - entity_link:       field_3858  (connection to ENT)

CCN (Communication Connections): object_189
  - channel_normalised: field_4064
  - ecn_link:          field_4121  (connection to ECN)

COM (Communication Channels): object_188
```

### Next Steps
1. ~~**Fix CCN field mappings**~~ ✓ Complete - entity names now resolve correctly via `field_4080`
2. ~~**Test all scenarios**~~ ✓ Complete - block, proceed, and confirm all working
3. **Create post-submission endpoint** (`api/company/process.js`) - for ECN/COM creation after form submission
4. **Migrate remaining Make.com webhooks** - Contact forms, Update forms

### Local Development
```bash
# ONE COMMAND - starts both servers:
C:\Code\KnackApps\GreenlightOnline\DevServer.bat

# Opens two windows:
# - FileServer (Port 3000): JS/CSS files
# - API Server (Port 3001): Backend API with nodemon auto-restart

# Then in browser console, enable local dev mode:
localStorage.setItem('Greenl_56ea_dev', '');
# Refresh the page
```

**Note:** nodemon watches for file changes - no manual restart needed when editing API code.

### How the Toggle Works
The same `Greenl_56ea_dev` localStorage flag controls both JS and API sources:

| Flag State | JS Source | API Source |
|------------|-----------|------------|
| Not set (production) | jsDelivr CDN | Vercel (`greenlight-services-3.vercel.app`) |
| Set (local dev) | localhost:3000 | localhost:3001 |

**viewConfigs.view_4059.webhook.url** now points to Vercel production URL. When `Greenl_56ea_dev` flag exists, the code overrides to localhost:3001.

---

## Form Refinements (Lower Priority)

### Remaining Items

#### 1. Company Role & Job Title Validation (view_5631)
- Review validation rules for Company Role and Job Title fields
- Ensure proper on-form validation behavior

#### 2. Conditional Fields on Update Contact (view_5626)
- Add Company Role and Job Title fields to Update Contact form
- Fields should only be visible when editing a Company Contact (not Personal Contact)
- Requires conditional visibility logic based on contact type

#### 3. Personal Contact Association (In Design)
**Problem:** Company contacts sometimes reach out as individuals. Need ability to:
- A. Create a personal contact association when needed
- B. View existing personal association if it exists

**Status:** Still being designed - approach TBD

## Form Fields Reference

### Contact Forms (view_5612, view_5626, view_5631)

| Field ID | Description | Validation Rule |
|----------|-------------|-----------------|
| field_3860 | Name (First/Last composite) | name-fields |
| field_3861 | Preferred name | proper-case-text |
| field_4164 | Email | company-email |
| field_4165 | Mobile | mobile-number |
| field_4056 | Phone | landline-number |
| contact_group | At least one contact method | contact-group |

### Smart Name Formatting
The system includes intelligent name formatting for both prefill (from search) and on-form validation:

**Special Patterns Handled:**
- Hyphenated names: `inglis-brown` → `Inglis-Brown`
- Mc prefix: `mcdonald` → `McDonald`
- Mac prefix: `macdonald` → `MacDonald`
- O' prefix: `o'brien` → `O'Brien`
- d' prefix: `d'arcy` → `d'Arcy`
- Fitz prefix: `fitzgerald` → `FitzGerald`

**Surname Prefixes:**
- Dutch `van` → Always capitalised: `van der berg` → `Van der Berg`
- `de` → Default lowercase, but mixed case preserved: `de la mora` → `de la Mora`, `De Jong` → `De Jong`
- Other lowercase: `von`, `di`, `la`, `le`, `del`, `della`, `dos`, `das`, `du`

**Prefill Behavior (from search):**
- 1 word: First name only, focus on Last name
- 2 words: First/Last split, focus on Preferred field
- 3+ words: First word to First, rest to Last, focus on Preferred field

## Webhook Configuration

> **Note:** Make.com webhooks are being replaced with Vercel backend.
> New backend URL: `https://greenlight-services-3.vercel.app/api/company/validate`
> See "Backend Replacement for Make.com" section above for status.

### Contact Forms
```
Pre-submission: https://hook.us1.make.com/nwacilwm8c5sg3w5w2xd7qxwwp250fbu
Post-submission: https://hook.us1.make.com/ov8njud5b8cwbuwaf39shqxx2jijmysl
```

### Update Contact (view_5626)
```
Pre-submission: https://hook.us1.make.com/oj9c65b964r1wr4a3w7livb4a469nlgh
Post-submission: https://hook.us1.make.com/bs93x9sc5km5xiqgnb8w7dq6x78m0lhb
```

### Quick Create Contact (view_5685)
```
Pre-submission: https://hook.us1.make.com/hhfz1ywcik857a3j3drfxzr221m4tois
Post-submission: https://hook.us1.make.com/s4n6e3ajcvh9sm4i0yf3vtzjp46bglqp
```
Note: Uses same webhooks as view_5631 (Create Contact with Company)

### Company Forms
```
Create Pre-submission: https://hook.us1.make.com/k5x6x9cgrnxeotdocoqmkvfspe495am4
Create Post-submission: https://hook.us1.make.com/kncqr2skxuof3i5swdbnk2o9bbcoeqvw
Update Pre-submission: https://hook.us1.make.com/e9oq91sfh4mpdzaxrfr0khlf7ftqn8sj
Update Post-submission: https://hook.us1.make.com/m7gcd3gof5fihmsel37nlxhjnu8mlvp7
```

## Payload Structures

### Pre-submission Payload (Contact Creation)
```javascript
{
    view: 'view_5612',
    form_type: 'contact-creation',
    allow_shared_contacts: true,
    timestamp: ISO string,
    tenant_id: string,
    current_user: { id, email },
    first_name: string,
    last_name: string,
    first_name_search: string (lowercase),
    last_name_search: string (lowercase),
    full_name_search: string (lowercase),
    preferred_name: string,
    email_normalised: string,
    mobile_normalised: string,
    phone_normalised: string,
    data: { ... same fields ... }
}
```

### Post-submission Payload (Contact Creation)
Uses on-form values captured at submission time (user may have resolved conflicts by deleting values).

```javascript
{
    view: 'view_5612',
    form_type: 'contact-creation',
    timestamp: ISO string,
    tenant_id: string,
    current_user: { id, email },
    contact_id: string,           // ENT record ID from Knack submission
    entity_id: string,            // Same as contact_id
    first_name: string,
    last_name: string,
    first_name_search: string,
    last_name_search: string,
    full_name_search: string,
    preferred_name: string,
    email_normalised: string,
    mobile_normalised: string,
    phone_normalised: string,
    knack_api_payloads: string,   // ::: delimited JSON payloads for COM creation
    com_action_type: string,      // 'create_all' or other action from pre-submission
    shared_com_ids: string,       // Any shared COM IDs from pre-submission
    is_test: boolean,
    is_post_submission: true,
    data: { ... same fields ... }
}
```

**knack_api_payloads format:**
Each communication channel (email, mobile, phone) gets a JSON payload stringified and joined with `:::`:
```javascript
// Email payload
{
    field_3988: 'Email',          // Communication type
    field_3869: 'email@domain',   // Email normalized
    field_3968: 'Email@Domain',   // Email as entered
    field_3969: 'domain.com',     // Domain
    field_3970: 'Email',          // Contact name from local part
    field_3982: 'Person',         // Entity type
    field_3876: 'Active',         // Status
    field_3881: 'user_id',        // Created by
    field_4016: 'tenant_id'       // Tenant ID
}

// Mobile/Phone payload
{
    field_3988: 'Mobile',         // or 'Phone'
    field_3886: '+61412345678',   // Full international number
    field_3971: '412345678',      // National number
    field_3885: '61',             // Country code
    field_3982: 'Person',
    field_3876: 'Active',
    field_3881: 'user_id',
    field_4016: 'tenant_id'
}
```

## Key Files

### Main Application
- `C:\Code\KnackApps\GreenlightOnline\GreenlightOnline.js` (~10,500 lines)
- `C:\Code\KnackApps\GreenlightOnline\GreenlightOnline.css`

### Make.com Webhook Scripts
- `C:\Code\KnackApps\GreenlightOnline\make_scenarios\company_duplicate_detection_lightweight.js`
- `C:\Code\KnackApps\GreenlightOnline\make_scenarios\shared_contacts_processor.js`
- `C:\Code\KnackApps\GreenlightOnline\make_scenarios\company_search_outcome_processor.js`

### Documentation
- `C:\Code\KnackApps\GreenlightOnline\CLAUDE.md` - Main project guide
- `C:\Code\KnackApps\GreenlightOnline\prompt.md` - This file (Form Validation Project)

## Code Architecture

### Key Modules in GreenlightOnline.js

| Module | Purpose |
|--------|---------|
| viewConfigs | Form field configurations (6 forms) |
| validationRuleTypes | Reusable validation rules |
| companyFormHandler | Company form payload building |
| contactFormHandler | Contact form payload building |
| webhookManager | Webhook firing and response handling |
| fieldChangeStrategies | Change detection per form |
| notificationSystem | Inline notifications |

### Form Event Handlers
```javascript
// Form render
$(document).on('knack-view-render.view_5612', function(event, view, data) { ... });

// Form submit
$(document).on('knack-form-submit.view_5612', function(event, view, response) { ... });
```

## Testing Notes

- Test locally via local development mode (no commit required)
- Enable local dev: `localStorage.setItem('Greenl_56ea_dev', 'true')`
- Check browser console for detailed logging
- Test name formatting with various inputs:
  - `john smith` → John / Smith
  - `john abel smith` → John / Abel Smith
  - `mary o'brien` → Mary / O'Brien
  - `james mcdonald` → James / McDonald
  - `anna van der berg` → Anna / Van der Berg
  - `carlos de la cruz` → Carlos / de la Cruz

## Current Todos

### Completed
- [x] Create Company form (view_4059)
- [x] Update Company form (view_5605)
- [x] Create Contact form (view_5612)
- [x] Update Contact form (view_5626)
- [x] Create Contact with Company form (view_5631)
- [x] Quick Create Contact form (view_5685)
- [x] Remove defunct view_5518 config
- [x] ECN Type-based button/view visibility (scene_2397)
- [x] New Contact pending message for view_5634
- [x] Backend project setup (Vercel, package.json, env vars)
- [x] Knack API helper library
- [x] MailerSend email validation helper
- [x] Pre-submission endpoint with full duplicate detection (block/proceed/confirm)
- [x] Deploy to Vercel (greenlight-services-3.vercel.app)
- [x] **Postgres database setup (Neon via Vercel integration)**
- [x] **Request logging system with JSONB payloads**
- [x] **Debug trace for entity name lookup (CCN → ECN → ENT)**
- [x] **Database query tool (tools/db-query.js)**
- [x] **Entity name resolution (field_4080 for both Companies and Individuals)**
- [x] **Neon CLI installed and authenticated**

### In Progress
- [ ] **Backend: Post-submission endpoint** - api/company/process.js for ECN/COM creation

### Lower Priority
- [ ] Review Company Role & Job Title validation (view_5631)
- [ ] Add conditional Company Role/Job Title fields to Update Contact (view_5626)
- [ ] Complete Quick Create flow redirects (pending Project/Proposal form creation)

### Future
- [ ] Design and implement Personal Contact Association feature
- [ ] Create Project form (for Quick Create flow)
- [ ] Create Proposal form (for Quick Create flow)
- [ ] Migrate remaining Make.com webhooks to Vercel backend
