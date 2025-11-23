# Create Company Form Testing Plan (view_4059)

## Overview
This document outlines the testing approach for the Create Company form validation and duplicate detection system.

## Pre-Test Checklist

### Code Changes Applied
- [x] Fixed `buildPreSubmissionPayload` to use configured field selectors
- [x] Verified `extractFormData` captures all fields correctly
- [ ] Code committed and pushed to GitHub
- [ ] CDN updated (wait 1-2 minutes after push)

### System Architecture Review

**Form Flow:**
1. **Pre-submission Validation** → Field-level validation + normalization
2. **Duplicate Check Webhook** → Make.com scenario returns: block/confirm/proceed
3. **Form Submission** → Knack creates ECN record
4. **Post-submission Webhook** → Make.com creates ENT/COM/CCN records
5. **Redirect** → User sent to contact view

## Test Scenarios

### Scenario 1: Field Validation (Pre-submission)

**Objective:** Verify all field validations work correctly

**Test Cases:**

#### 1.1 Company Name Validation
- [ ] **Required field**: Submit empty company name → Should show error
- [ ] **Proper case formatting**: Enter "test company" → Should format to "Test Company"
- [ ] **Special characters**: Test with apostrophes, hyphens, etc.

#### 1.2 Short Name Validation
- [ ] **Auto-generation**: Enter company name → Should auto-generate short name
- [ ] **Manual override**: Manually change short name → Should accept
- [ ] **Optional field**: Leave empty → Should allow submission

#### 1.3 Email Validation
- [ ] **Valid email**: Enter `info@company.com.au` → Should accept
- [ ] **Invalid format**: Enter `notanemail` → Should show error
- [ ] **Normalization**: Enter ` Info@Company.COM.AU ` → Should normalize to `Info@company.com.au`
- [ ] **Optional field**: Leave empty → Should allow submission

#### 1.4 Phone Validation
- [ ] **Valid landline**: Enter `03 9048 4411` → Should accept and normalize to `+61390484411`
- [ ] **Valid mobile**: Enter `0416 388 825` → Should accept and normalize to `+61416388825`
- [ ] **Invalid format**: Enter `123` → Should show error
- [ ] **1300/1800 numbers**: Test toll-free numbers
- [ ] **Optional field**: Leave empty → Should allow submission

#### 1.5 Address Validation
- [ ] **Complete address**: Enter all fields → Should accept
- [ ] **Partial address**: Enter only street → Should accept (optional)
- [ ] **Empty address**: Leave all fields empty → Should accept (optional)

### Scenario 2: Duplicate Detection - BLOCK (Hard Fail)

**Objective:** Verify system blocks submission when duplicate company name found

**Setup Required:**
- Ensure test company exists in database: "Test Plumbing Pty Ltd"

**Test Steps:**
1. [ ] Open Create Company form (view_4059)
2. [ ] Fill in company name: "Test Plumbing Pty Ltd"
3. [ ] Fill in other required fields
4. [ ] Click "Validate" button
5. [ ] **Expected:** Webhook fires, returns "block" response
6. [ ] **Expected:** Error message displays: "Company already exists"
7. [ ] **Expected:** Form submission prevented
8. [ ] **Expected:** User cannot proceed

**Console Verification:**
- [ ] Check for `🚀 Firing webhook for duplicate check`
- [ ] Check for `📦 Webhook response: action_required: "block"`
- [ ] Check for `🚫 BLOCK: Duplicate company found`

### Scenario 3: Shared Contact Detection - CONFIRM (Soft Fail)

**Objective:** Verify system asks for confirmation when shared contact found

**Setup Required:**
- Ensure contact exists: `shared@company.com.au` linked to another entity

**Test Steps:**
1. [ ] Open Create Company form
2. [ ] Fill in new company name: "New Company Pty Ltd"
3. [ ] Fill in email: `shared@company.com.au` (existing email)
4. [ ] Click "Validate"
5. [ ] **Expected:** Webhook fires, returns "confirm" response
6. [ ] **Expected:** Dialog appears showing:
   - "This email is already used by [Existing Entity]"
   - Option 1: "Proceed with creating company and shared contacts"
   - Option 2: "Go back and modify the contact details"
7. [ ] **Test Option 1 (Share Contacts):**
   - [ ] Click "Proceed with shared contacts"
   - [ ] **Expected:** Form submits successfully
   - [ ] **Expected:** Post-submission webhook fires with `shared_com_ids`
8. [ ] **Test Option 2 (Remove Conflicts):**
   - [ ] Click "Go back and modify"
   - [ ] **Expected:** Dialog closes, user back to form
   - [ ] **Expected:** Can edit email field
   - [ ] [ ] Change email, revalidate → Should proceed if no conflicts

**Console Verification:**
- [ ] Check for `⚠️ SOFT FAIL: Found contact detail matches`
- [ ] Check for `📋 conflicts: [...]` in webhook response
- [ ] Check for `shared_com_ids` in post-submission payload (if shared)

### Scenario 4: Email Validation - RISKY (Warn)

**Objective:** Verify MailerSend email validation warnings

**Test Cases:**

#### 4.1 Catch-All Domain
- [ ] Enter email from catch-all domain
- [ ] **Expected:** Warning message: "The email domain accepts all addresses..."
- [ ] **Expected:** User can still proceed after confirmation

#### 4.2 Role-Based Email
- [ ] Enter email: `info@domain.com`, `support@domain.com`
- [ ] **Expected:** Warning: "This appears to be a role-based email..."
- [ ] **Expected:** User can still proceed

#### 4.3 Invalid Email (BLOCK)
- [ ] Enter email with typo: `user@gmali.com`
- [ ] **Expected:** Error message: "The email address appears to contain a typo"
- [ ] **Expected:** Submission blocked

### Scenario 5: No Duplicates - PROCEED

**Objective:** Verify clean submission path when no conflicts

**Test Steps:**
1. [ ] Open Create Company form
2. [ ] Use "Fill Test Data" button OR enter unique data:
   - Company name: "Brand New Company [timestamp]"
   - Email: `unique-${Date.now()}@test.com.au`
   - Phone: `03 9999 8888`
3. [ ] Click "Validate"
4. [ ] **Expected:** Webhook fires, returns "proceed"
5. [ ] **Expected:** Form submits to Knack
6. [ ] **Expected:** Success message briefly appears
7. [ ] **Expected:** Post-submission webhook fires immediately
8. [ ] **Expected:** User redirected to contact view: `#contacts6/view-contact3/[ecn_id]`
9. [ ] **Expected:** Loading wireframe appears while records being created
10. [ ] **Expected:** Contact details populate once created

**Console Verification:**
- [ ] Check for `✅ PROCEED: No duplicates found`
- [ ] Check for `📝 Form submission completed for view_4059`
- [ ] Check for `🚀 Firing post-submission webhook`
- [ ] Check for `✅ Extracted ECN ID from webhook response`
- [ ] Check for `🔀 Redirecting to contact view`

### Scenario 6: Field Change Detection

**Objective:** Verify revalidation required when fields change after validation

**Test Steps:**
1. [ ] Fill in form and validate successfully (get "proceed" or "confirm")
2. [ ] **Without submitting**, change company name
3. [ ] Click submit button
4. [ ] **Expected:** System detects change
5. [ ] **Expected:** Button shows "Company name changed - rechecking..."
6. [ ] **Expected:** Webhook fires again for revalidation
7. [ ] **Expected:** New validation result applied

**Test Email/Phone Deletion:**
1. [ ] Fill form with email/phone, validate successfully
2. [ ] Delete email field (clear it completely)
3. [ ] Click submit
4. [ ] **Expected:** No revalidation required (deletion allowed)
5. [ ] **Expected:** Form submits directly

### Scenario 7: Post-Submission Webhook

**Objective:** Verify post-submission data and record creation

**Test Steps:**
1. [ ] Submit form successfully (proceed scenario)
2. [ ] Monitor Make.com scenario execution
3. [ ] **Verify payload includes:**
   - [ ] `company_id` (ENT record ID from Knack)
   - [ ] `company_name_normalised`
   - [ ] `email_normalised`
   - [ ] `phone_normalised`
   - [ ] `knack_api_payloads` (COM records to create)
   - [ ] `shared_com_ids` (if applicable)
   - [ ] `tenant_id`
   - [ ] `current_user` (id and email)
4. [ ] **Verify Make.com creates:**
   - [ ] ENT record (if needed)
   - [ ] Self ECN for company
   - [ ] COM records (email and phone)
   - [ ] CCN records linking COM to ECN
5. [ ] **Verify response includes:**
   - [ ] `ecn_id` for redirect
6. [ ] **Verify redirect:**
   - [ ] URL changes to `#contacts6/view-contact3/[ecn_id]`
   - [ ] Contact view loads correctly

## Testing Tools

### Browser DevTools
- Console: Monitor all log messages (look for 🏢, 📋, ✅, ❌, ⚠️ emoji prefixes)
- Network tab: Monitor webhook requests/responses
- Application/Storage: Check `window._preSubmissionFormData`

### Make.com Scenario Monitoring
- Watch scenario execution in real-time
- Check data coming from pre-submission webhook
- Check data coming from post-submission webhook
- Verify record creation in Knack tables

### Test Data Button
- Use "🎲 Fill Test Data" button for quick form filling
- Generates random but valid test data
- Useful for repeated testing

## Known Issues / Notes

### Fixed Issues
- ✅ `buildPreSubmissionPayload` now uses configured selectors instead of hardcoded ones

### Potential Issues to Watch For
- ⚠️ Webhook URL configuration (ensure not placeholder)
- ⚠️ Tenant ID is hardcoded (may need dynamic lookup)
- ⚠️ Address formatting not fully implemented
- ⚠️ Email validation requires MailerSend integration in Make.com

### Future Enhancements
- Better error messages for validation failures
- Loading indicators during webhook calls
- Better handling of network errors
- Retry logic for failed webhooks

## Test Execution Log

**Date:** _____________
**Tester:** _____________
**Browser:** _____________

| Test ID | Test Description | Status | Notes |
|---------|-----------------|---------|-------|
| 1.1 | Company name validation | ☐ Pass ☐ Fail | |
| 1.2 | Short name validation | ☐ Pass ☐ Fail | |
| 1.3 | Email validation | ☐ Pass ☐ Fail | |
| 1.4 | Phone validation | ☐ Pass ☐ Fail | |
| 1.5 | Address validation | ☐ Pass ☐ Fail | |
| 2 | Block duplicate company | ☐ Pass ☐ Fail | |
| 3 | Confirm shared contacts | ☐ Pass ☐ Fail | |
| 4.1 | Email validation - risky | ☐ Pass ☐ Fail | |
| 4.2 | Email validation - block | ☐ Pass ☐ Fail | |
| 5 | Proceed with no duplicates | ☐ Pass ☐ Fail | |
| 6 | Field change detection | ☐ Pass ☐ Fail | |
| 7 | Post-submission webhook | ☐ Pass ☐ Fail | |

## Bugs Found

| Bug # | Description | Severity | Status | Fix Notes |
|-------|------------|----------|---------|-----------|
| | | | | |
| | | | | |
| | | | | |

---

**Next Steps After Testing:**
1. Document all bugs found
2. Fix critical bugs before deployment
3. Update version number in GreenlightOnline.js
4. Commit and push changes
5. Deploy to production (forms go live)
