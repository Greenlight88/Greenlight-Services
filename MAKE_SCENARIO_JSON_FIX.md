# Make.com Scenario JSON Bug Fix

## Issue Found

The Make.com duplicate detection scenario is returning **invalid JSON** which is causing parsing errors.

## Current (Broken) JSON Response

```json
{
    "duplicate_field": "Full Name"     ❌ MISSING COMMA HERE
    "action_required": "block",
    "block_reason": "duplicate_company",
    "existing_company_id": "6923655712414cfaaaea82c8",
    "existing_company_name": "Elite 4433222",
    "messages": {
        "block_message": "Company 'Elite 4433222' already exists in the system.",
        "action_instruction": "Please update the existing company instead of creating a new one, or clear the form to start over.",
        "view_link": "https://app.greenlightservices.com.au/greenlight-online#contacts6/view-contact3/6923655b2685a0c6d72faba9/"
    }
}
```

## Fixed JSON Response

```json
{
    "duplicate_field": "Full Name",    ✅ ADDED COMMA
    "action_required": "block",
    "block_reason": "duplicate_company",
    "existing_company_id": "6923655712414cfaaaea82c8",
    "existing_company_name": "Elite 4433222",
    "messages": {
        "block_message": "Company 'Elite 4433222' already exists in the system.",
        "action_instruction": "Please update the existing company instead of creating a new one, or clear the form to start over.",
        "view_link": "https://app.greenlightservices.com.au/greenlight-online#contacts6/view-contact3/6923655b2685a0c6d72faba9/"
    }
}
```

## Where to Fix in Make.com

1. Open the Make.com scenario for **Create Company - Pre-submission Duplicate Detection**
2. Find the module that builds the "block" response JSON
3. Look for the line with `"duplicate_field"`
4. Add a comma after the value: `"duplicate_field": "{{duplicate_field}}",`

## JavaScript Fix Applied

I've also updated `GreenlightOnline.js` to handle Make.com's wrapped response format:

- Make.com returns: `[{ "body": "{...}", "status": 200 }]`
- JavaScript now extracts and parses the `body` content automatically
- This provides better error messages when JSON is invalid

## Testing After Fix

Once you fix the Make.com JSON:

1. Test duplicate company detection
2. Check console for: `✅ Parsed inner body content:`
3. Verify error message displays correctly on the form field
4. Test with "Full Name", "Short Name", and "Both" scenarios
