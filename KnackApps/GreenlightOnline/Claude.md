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
| Form validation system | `docs/form-validation.md` |
| Local development setup | `docs/local-development.md` |
| Make.com migration | `docs/make-migration.md` |
| Database & Knack schema | `docs/database.md` |
| Troubleshooting | `docs/troubleshooting.md` |
| Session history | `docs/session-history.md` |
| CCN block processing | `docs/CCN_BLOCK_PROCESSOR_INTEGRATION_GUIDE.md` |
| Shared contacts blocking | `docs/SHARED_CONTACTS_BLOCKING_GUIDE.md` |

---

## Current Focus

**Active:** Backend migration - replacing Make.com webhooks with Vercel functions.

**Status:**
- Company duplicate detection endpoint complete (`/api/company/validate`)
- Request logging with Postgres working
- Post-submission processing planned next

**Key forms in play:**
- view_4059: Create Company (main validation)
- view_5612: Create Contact (duplicate detection)
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
