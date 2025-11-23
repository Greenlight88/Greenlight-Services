# Shared Contacts Blocking - Make.com Update Guide

## Overview

Company creation forms (view_4059) now **block** shared contacts instead of allowing them with confirmation. The Make.com scenario needs to be updated to respect the `allow_shared_contacts` flag.

## JavaScript Changes Applied

### 1. Configuration Flag Added

**File:** `GreenlightOnline.js` - Line 2145

```javascript
view_4059: {
    formType: 'company-creation',
    allow_shared_contacts: false,  // ← NEW: Company creation does NOT allow shared contacts
    webhook: { ... },
    // ... rest of config
}
```

### 2. Flag Sent in Webhook Payload

The `allow_shared_contacts` flag is now sent to Make.com in the pre-submission webhook:

```javascript
{
    "view": "view_4059",
    "form_type": "company-creation",
    "allow_shared_contacts": false,  // ← NEW FLAG
    "company_name_normalised": "...",
    "email_normalised": "...",
    "phone_normalised": "...",
    "data": {
        "allow_shared_contacts": false,  // ← Also in data object
        // ... rest of data
    }
}
```

### 3. New Block Handler Added

**File:** `GreenlightOnline.js` - Lines 4961-4978

Handles `block_reason: 'shared_contacts_not_allowed'` with field-level errors.

---

## Make.com Scenario Updates Required

### Location: Company Duplicate Detection Scenario
**Webhook URL:** `https://hook.us1.make.com/k5x6x9cgrnxeotdocoqmkvfspe495am4`

### Step 1: Extract `allow_shared_contacts` Flag

Add a variable at the beginning of the scenario:

```
Variable: allow_shared_contacts
Value: {{webhook_data.allow_shared_contacts}}
Default: true
```

### Step 2: Update CCN Contact Conflict Logic

**Current Flow (Soft Fail):**
```
If CCN email/phone matches found
  → Return action_required: "confirm"
  → Show confirmation dialog
```

**New Flow (Conditional):**
```
If CCN email/phone matches found
  → Check allow_shared_contacts flag

  If allow_shared_contacts = false (Company Creation)
    → Return action_required: "block"
    → block_reason: "shared_contacts_not_allowed"
    → conflicts: [array of conflicts]

  If allow_shared_contacts = true (Other Forms)
    → Return action_required: "confirm"
    → Show confirmation dialog (existing behavior)
```

### Step 3: Build Block Response for Shared Contacts

**Response Format:**

```json
{
    "action_required": "block",
    "block_reason": "shared_contacts_not_allowed",
    "conflicts": [
        {
            "type": "email",
            "field_id": "field_4057",
            "submitted_value": "info@company.com.au",
            "existing_entity": "Existing Company Name",
            "existing_ccn_id": "CCN123",
            "existing_com_id": "COM123",
            "existing_ecn_id": "ECN123",
            "conflict_message": "This email is already used by Existing Company Name.",
            "view_link": "https://app.greenlightservices.com.au/greenlight-online#contacts6/view-contact3/ECN123/"
        },
        {
            "type": "phone",
            "field_id": "field_4056",
            "submitted_value": "+61390484411",
            "existing_entity": "Another Company",
            "existing_ccn_id": "CCN456",
            "existing_com_id": "COM456",
            "existing_ecn_id": "ECN456",
            "conflict_message": "This phone is already used by Another Company.",
            "view_link": "https://app.greenlightservices.com.au/greenlight-online#contacts6/view-contact3/ECN456/"
        }
    ],
    "messages": {
        "block_message": "Contact details are already in use.",
        "action_instruction": "Please clear the conflicting email or phone number to proceed."
    }
}
```

### Step 4: Router Logic

Add a router after CCN search results:

```
Path 1: No conflicts found
  → Proceed as normal

Path 2: Conflicts found + allow_shared_contacts = true
  → Build "confirm" response (existing soft fail)

Path 3: Conflicts found + allow_shared_contacts = false
  → Build "block" response (new hard fail)
```

---

## Make.com Implementation Example

### Router Module Configuration

**Filter for Path 2 (Soft Fail - Confirm):**
```
{{1.conflicts_found}} = true
AND
{{1.allow_shared_contacts}} = true
```

**Filter for Path 3 (Hard Fail - Block):**
```
{{1.conflicts_found}} = true
AND
{{1.allow_shared_contacts}} = false
```

### JSON Module for Path 3 (Block Response)

```javascript
{
  "action_required": "block",
  "block_reason": "shared_contacts_not_allowed",
  "conflicts": {{map(conflicts; "type"; "email"; "field_id"; "field_4057"; "submitted_value"; email_normalised; "existing_entity"; entity_name; "conflict_message"; conflict_message; "view_link"; view_link)}},
  "messages": {
    "block_message": "Contact details are already in use.",
    "action_instruction": "Please clear the conflicting email or phone number to proceed."
  }
}
```

---

## Testing Checklist

### Test 1: Company Creation with Shared Email (Hard Fail)
- [  ] Open Create Company form (view_4059)
- [ ] Enter company name: "New Company Ltd"
- [ ] Enter email: `existing@email.com` (exists in database)
- [ ] Click "Validate"
- [ ] **Expected:** Field-level error appears under email field
- [ ] **Expected:** Error message: "This email is already used by [Existing Entity]."
- [ ] **Expected:** View link appears: "View existing record"
- [ ] **Expected:** Submit button remains disabled

### Test 2: Clear Email and Proceed
- [ ] From Test 1, clear the email field completely
- [ ] **Expected:** Error message disappears
- [ ] **Expected:** Field error state clears
- [ ] **Expected:** Submit button re-enables
- [ ] Click "Validate" again
- [ ] **Expected:** No errors, form proceeds

### Test 3: Company Creation with Shared Phone (Hard Fail)
- [ ] Open Create Company form
- [ ] Enter company name: "Another Company Pty Ltd"
- [ ] Enter phone: `03 9048 4411` (exists in database)
- [ ] Click "Validate"
- [ ] **Expected:** Field-level error appears under phone field
- [ ] **Expected:** Error message: "This phone is already used by [Existing Entity]."
- [ ] **Expected:** Submit button disabled

### Test 4: Both Email and Phone Shared (Multiple Errors)
- [ ] Open Create Company form
- [ ] Enter both shared email AND shared phone
- [ ] Click "Validate"
- [ ] **Expected:** Error appears under BOTH fields
- [ ] **Expected:** Each error shows correct existing entity
- [ ] **Expected:** Each error has view link
- [ ] Clear email field only
- [ ] **Expected:** Email error clears, phone error remains
- [ ] **Expected:** Submit still disabled (phone error present)
- [ ] Clear phone field
- [ ] **Expected:** All errors cleared, submit enabled

### Test 5: Future Contact Form (Soft Fail - Still Works)
**Note:** This will be tested when contact forms are implemented

- [ ] Contact forms should still get `allow_shared_contacts: true`
- [ ] Should show confirmation dialog (existing behavior)
- [ ] Should allow user to choose "Share contacts" or "Cancel"

---

## JSON Syntax Fix (CRITICAL)

**Also fix the missing comma in duplicate company response:**

### Before (Broken):
```json
{
    "duplicate_field": "Full Name"     ❌ MISSING COMMA
    "action_required": "block",
```

### After (Fixed):
```json
{
    "duplicate_field": "Full Name",    ✅ ADDED COMMA
    "action_required": "block",
```

---

## Summary of Changes

| Form Type | `allow_shared_contacts` | Shared Contact Behavior |
|-----------|-------------------------|-------------------------|
| Company Creation (view_4059) | `false` | **BLOCK** - Hard fail, clear fields to proceed |
| Company Update (view_2406) | `true` (default) | **CONFIRM** - Soft fail, user chooses |
| Create Contact (future) | `true` (default) | **CONFIRM** - Soft fail, user chooses |
| Update Contact (future) | `true` (default) | **CONFIRM** - Soft fail, user chooses |

---

## Deployment Steps

1. [ ] Update Make.com scenario with new logic
2. [ ] Fix JSON syntax errors (missing commas)
3. [ ] Test all scenarios above
4. [ ] Commit JS changes to Git
5. [ ] Push to GitHub (CDN will update)
6. [ ] Final production test

---

## Console Verification

When testing, watch for these console messages:

### Webhook Sent:
```
🏢 Building company-creation payload for view_4059
📦 Built company-creation payload: { allow_shared_contacts: false, ... }
🔗 Firing webhook with duplicate check for view_4059
```

### Webhook Response Received:
```
📡 Raw webhook response: [{"body": "...", "status": 200}]
🔄 Detected Make.com wrapped response - extracting body
✅ Parsed inner body content: { action_required: "block", block_reason: "shared_contacts_not_allowed", ... }
```

### Block Handler:
```
🚫 Blocking submission with field errors
❌ Field error for field_4057: This email is already used by Company XYZ.
```

### Field Cleared:
```
✅ Field error cleared for field_4057
✅ No field errors remaining - form can be submitted
```
