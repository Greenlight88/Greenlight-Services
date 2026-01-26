# Session Pickup - 26 Jan 2026

## What We Did
1. Fixed contact proceed endpoint - added Self-ECN, SCN, tenant, is_test fields
2. Fixed company proceed endpoint - added tenant field, registered in server.js
3. Added dev mode redirect for company/proceed in frontend
4. Created `docs/new-endpoint-checklist.md` to prevent missing registrations
5. Updated CLAUDE.md with explicit 3-location requirement for endpoints
6. **Set up Playwright E2E testing framework**

## Playwright Testing Status

### What's Working
- `npm run test:api` - API smoke tests pass
- ECN creation confirmed working (Self-ECN + Staff-ECN)
- Server logging shows full request flow

### What Needs Testing
- Full browser flow (Create Company → Create Contact)
- Requires test credentials configured:
  ```bash
  set TEST_USER_EMAIL=your@email.com
  set TEST_USER_PASSWORD=yourpassword
  npm run test:headed
  ```

### Test Commands
```bash
npm test              # Run all tests (headless)
npm run test:headed   # Run with visible browser
npm run test:debug    # Debug mode (step through)
npm run test:ui       # Playwright UI (interactive)
npm run test:api      # API tests only (no browser)
```

## Outstanding Issues to Verify
From earlier testing, these fields may still need verification:
- [ ] Company ENT tenant_id (field_1502)
- [ ] Contact ENT is_test (field_3927)
- [ ] ECN tenant (field_3833) for both Staff and Self types
- [ ] Primary CCN fields on ECNs (field_4041, 4042, 4043)
- [ ] COMs created with correct ownership
- [ ] CCNs linked properly

## Orphaned Test Records
API tests created orphaned ECN records in Knack (no parent entities):
- `6977646f7424d1cb8803ca1f` (company ECN)
- `697764707424d1cb8803d400` (contact Self-ECN)
- `697764717424d1cb8803eb9d` (contact Staff-ECN)

Consider deleting these test records.

## Next Steps
1. Configure test credentials
2. Run full browser test: `npm run test:headed`
3. Verify all fields are populated correctly in Knack
4. Fix any remaining issues
5. Consider adding more specific assertions to tests

## Git Status
- 2 commits ahead of origin/master (unpushed)
- Ready to push when verified working
