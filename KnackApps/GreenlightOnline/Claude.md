# Greenlight Online

**Version:** 1.0.14 | **Developer:** Michael Tierney

---

## Rules

### Documentation Policy
- Do NOT create markdown files unless explicitly requested
- Provide summaries in chat instead of creating documents
- Update this file only when prompted

### Tool Usage (Serena MCP)

**For reading/searching:** Use Serena tools (`search_for_pattern`, `read_file`, `find_file`, `list_dir`, `find_symbol`, `get_symbols_overview`)

**For editing:**
- Default to built-in `Edit` tool for most changes (reliable, predictable)
- Serena symbolic tools (`replace_symbol_body`, `insert_after_symbol`, `insert_before_symbol`) are allowed when they're the right fit (e.g., rewriting entire methods, adding new functions to classes)
- **Caution with `replace_regex`:** Use only for genuine pattern replacements. Never for simple edits like version bumps. History: overly broad regex once deleted entire file.
- For files outside project (e.g., KTL at `C:\Code\Lib\KTL`): use built-in tools

### Notifications
Use Windows notifications for: completed commits, multi-step task completion, before asking questions, blocking errors, long operations.
```bash
powershell.exe -ExecutionPolicy Bypass -File "C:\Code\notify.ps1" -Title "Title" -Message "Message" -Type "success"
```

---

## Project Context

### What This Is
Knack application for Greenlight Services - enquiries management with custom JS/CSS enhancements.

### Tech Stack
- **Platform:** Knack (low-code database/app)
- **Frontend:** JavaScript (ES6+), CSS
- **Library:** KTL (Knack Toolkit Library)
- **Backend:** Vercel serverless functions (replacing Make.com)
- **Deployment:** jsDelivr CDN from GitHub
- **Database:** Neon Postgres (request logging)

### Key Concepts (ENT/ECN/COM/CCN)
- **ENT** (Entities): Companies and People
- **ECN** (Entity Connections): Relationships between entities (staff, contacts, self-connections)
- **COM** (Communication Channels): Emails, phones - can be Personal or Company-owned
- **CCN** (Communication Connections): Links COMs to ECNs, enables sharing and end-dating

### File Structure
```
GreenlightOnline.js      Main application code (~6500 lines)
GreenlightOnline.css     Styling
KNACK_LOADER.js          CDN loader for Knack settings
api/                     Vercel serverless functions
lib/                     Shared backend code
db/                      Database layer
tools/                   Dev utilities (blueprint-processor, db-query)
make_scenarios/          Make.com JS modules (being replaced)
docs/                    Reference documentation
```

---

## How to Work

### Session Startup Checks
**At the start of each session, verify both dev servers are running:**
```bash
netstat -ano | findstr ":3001 :3000"
```
- **Port 3000**: KTL/Frontend server (serves local JS/CSS)
- **Port 3001**: API server (local endpoints)

If port 3001 is not listening, start the API server:
```bash
node server.js  # Run from GreenlightOnline directory
```

### Development Workflow
1. Edit files locally
2. **Test locally before pushing** (local dev mode available)
3. Commit changes: `git add . && git commit -m "message"`
4. **DO NOT push automatically** - wait for user to request push or suggest at significant milestones
5. When pushing: `git push`, then wait 5-10 min for CDN cache

**Important:** This is a live production system. Always test locally first. Only push when:
- User explicitly requests it
- A significant milestone is reached (suggest push, don't auto-push)
- Never push untested changes - has caused production issues before

### Version Updates
Update `APP_VERSION` in GreenlightOnline.js line 1, then commit.

### Code Style
- ES6+ (const/let, arrow functions, template literals)
- camelCase functions/variables, PascalCase classes, UPPER_SNAKE_CASE constants
- Section headers: `// ======== FEATURE NAME ========`

---

## References

Load these docs when working on specific areas:

| Topic | Document |
|-------|----------|
| **New endpoint setup** | `docs/new-endpoint-checklist.md` |
| Form validation system | `docs/form-validation.md` |
| Local development setup | `docs/local-development.md` |
| Endpoint testing | `docs/endpoint-testing.md` |
| Make.com migration | `docs/make-migration.md` |
| Database & Knack schema | `docs/database.md` |
| Knack dropdown prefill | `docs/knack-dropdown-prefill.md` |
| Flow context & persistence | `docs/flow-context-persistence.md` |
| Troubleshooting | `docs/troubleshooting.md` |
| Session history | `docs/session-history.md` |
| CCN block processing | `docs/CCN_BLOCK_PROCESSOR_INTEGRATION_GUIDE.md` |
| Shared contacts blocking | `docs/SHARED_CONTACTS_BLOCKING_GUIDE.md` |

---

## Task Checklists

### Make.com → Vercel Migration

**STOP: Before writing any code, complete this checklist.**

#### Phase 1: Understand the Make.com Scenario
1. [ ] Get the blueprint JSON file from user
2. [ ] Process blueprint: `node tools/blueprint-processor.js "blueprint.json"`
3. [ ] Identify the ExecuteCode JS module in `make_scenarios/` folder
4. [ ] Read the JS module to understand business logic

#### Phase 2: Review Required Documentation
Read these docs in order:
1. [ ] `docs/make-migration.md` - Migration patterns, status
2. [ ] `docs/form-validation.md` - Response types (block/confirm/proceed)
3. [ ] `docs/database.md` - ENT/ECN/COM/CCN schema
4. [ ] `docs/knack-constants.md` - Object IDs, field mappings
5. [ ] `docs/proceed-endpoint-spec.md` - Example of completed migration (template)
6. [ ] `docs/CCN_BLOCK_PROCESSOR_INTEGRATION_GUIDE.md` - CCN conflict patterns
7. [ ] `docs/SHARED_CONTACTS_BLOCKING_GUIDE.md` - Shared contacts logic

#### Phase 3: Review Existing Implementation
1. [ ] Check existing endpoint in `api/` folder (e.g., `/api/company/validate`)
2. [ ] Review shared libs in `lib/` (knack-api, duplicate-detection, etc.)
3. [ ] Check frontend integration in `GreenlightOnline.js` (viewConfigs, webhookManager)

#### Phase 4: Enter Plan Mode
1. [ ] Create detailed implementation plan
2. [ ] Document API contract (input/output)
3. [ ] Map Make.com modules to Vercel functions
4. [ ] Identify what goes in endpoint vs shared libs
5. [ ] Plan frontend changes to switch webhook URLs
6. [ ] Get user approval before coding

#### Phase 5: Implement

**CRITICAL: All 3 locations must be updated for each endpoint. See `docs/new-endpoint-checklist.md`**

1. [ ] Create/update Vercel endpoint in `api/` folder
2. [ ] Create/update shared libs in `lib/` folder
3. [ ] **Register endpoint in `server.js`** (ALL REQUIRED):
   - [ ] Import handler at top of file
   - [ ] Add POST route
   - [ ] Add OPTIONS route (for CORS)
   - [ ] Update startup message
4. [ ] Update frontend webhook URL in viewConfigs (if new form)
5. [ ] **Add dev mode redirect in GreenlightOnline.js** (REQUIRED):
   - [ ] For validate endpoints: in `fireWebhookWithDuplicateCheck()`
   - [ ] For proceed endpoints: in `firePostSubmissionWebhook()`
6. [ ] **Verify all 3 locations**: `grep -l "endpoint/name" server.js api/*/name.js GreenlightOnline.js`
7. [ ] Test locally with dev mode enabled
8. [ ] Update `docs/make-migration.md` status table

---

## Current Focus

**Active:** Backend migration - replacing Make.com webhooks with Vercel functions.

**Status:**
- Company validation endpoint complete (`/api/company/validate`)
- Company proceed endpoint complete (`/api/company/proceed`)
- Contact validation endpoint complete (`/api/contact/validate`)
- Contact proceed endpoint complete (`/api/contact/proceed`)
- Request logging with Postgres working

**Key forms in play:**
- view_4059: Create Company (main validation) - migrated
- view_5631: Create Contact with Company - migrated
- view_5685: Quick Create Contact - migrated
- view_5612: Create Contact (standalone) - uses same endpoint
- view_4829: Enquiries table (auto-refresh)

---

## Quick Reference

### Key Locations
- APP_VERSION: `GreenlightOnline.js:1`
- Form Validation: `GreenlightOnline.js:2800-5500`
- Auto-refresh: `GreenlightOnline.js:5600-5800`

### Common Commands
```bash
git status && git add . && git commit -m "message" && git push
node tools/db-query.js "SELECT * FROM request_log ORDER BY created_at DESC LIMIT 5"
```

### URLs
- GitHub: https://github.com/Greenlight88/Greenlight-Online
- Production API: https://greenlight-services-3.vercel.app/
- jsDelivr status: https://status.jsdelivr.com/
