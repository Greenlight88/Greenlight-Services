# New Endpoint Checklist

When adding a new API endpoint, **ALL THREE** locations must be updated. Missing any one will cause the endpoint to fail in local dev mode.

## Required Locations

### 1. Create the Endpoint File
**Location:** `api/<category>/<endpoint>.js`

Example: `api/company/proceed.js`

```javascript
async function handler(req, res) {
    // ... handler code
}
module.exports = handler;
```

### 2. Register in server.js
**Location:** `server.js`

Two changes required:

**A. Import the handler** (around line 50):
```javascript
const companyProceedHandler = require('./api/company/proceed');
```

**B. Add routes** (after other routes):
```javascript
app.post('/api/company/proceed', (req, res) => {
    companyProceedHandler(req, res);
});

app.options('/api/company/proceed', (req, res) => {
    companyProceedHandler(req, res);
});
```

**C. Update startup message** (optional but helpful):
```javascript
console.log(`    POST /api/company/proceed`);
```

### 3. Add Dev Mode Redirect in Frontend
**Location:** `GreenlightOnline.js`

For **validation endpoints** (pre-submission), add in `fireWebhookWithDuplicateCheck()`:
```javascript
if (useLocalApi && config.formType === 'company-creation') {
    webhookUrl = 'http://localhost:3001/api/company/validate';
    console.log(`🧪 LOCAL DEV MODE: Using ${webhookUrl} instead of Vercel`);
}
```

For **proceed endpoints** (post-submission), add in `firePostSubmissionWebhook()`:
```javascript
if (useLocalApi && config.formType === 'company-creation') {
    webhookUrl = 'http://localhost:3001/api/company/proceed';
    console.log(`🧪 LOCAL DEV MODE: Using ${webhookUrl} instead of Vercel`);
}
```

## Verification

After adding an endpoint, verify all 3 locations are updated:

```bash
# Should return 3 files for a complete endpoint
grep -l "company/proceed" server.js api/company/proceed.js GreenlightOnline.js
```

## Quick Checklist

Copy this checklist when adding a new endpoint:

```
### New Endpoint: /api/<category>/<name>
- [ ] Created `api/<category>/<name>.js`
- [ ] Imported handler in `server.js`
- [ ] Added POST route in `server.js`
- [ ] Added OPTIONS route in `server.js`
- [ ] Added dev mode redirect in `GreenlightOnline.js`
- [ ] Tested locally with dev mode enabled
- [ ] Updated `docs/make-migration.md` status table (if migrating from Make.com)
```

## Common Mistakes

1. **Forgetting server.js registration** - Endpoint file exists but 404 in local dev
2. **Forgetting dev mode redirect** - Local dev calls Vercel instead of localhost
3. **Missing OPTIONS route** - CORS preflight fails
4. **Wrong formType in dev mode check** - Redirect doesn't trigger for your form

## Current Endpoints

| Endpoint | server.js | Dev Mode Redirect |
|----------|-----------|-------------------|
| `/api/company/validate` | ✓ | ✓ (company-creation) |
| `/api/company/proceed` | ✓ | ✓ (company-creation) |
| `/api/contact/validate` | ✓ | ✓ (contact-creation) |
| `/api/contact/proceed` | ✓ | ✓ (contact-creation) |
