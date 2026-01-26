# Make.com Scenario Migration Tracking

## Overview
This document tracks which Make.com scenarios have been processed and their migration status.

## Scenario Categories

### Company Forms
| Scenario ID | Name | Processed | Migrated | Endpoint |
|-------------|------|-----------|----------|----------|
| 2414-1 | New Entity (Company) - Pre-Form | ? | Yes | `/api/company/validate` |
| 2414-2 | New Entity (Company) - Proceed | ? | Partial? | TBD |

### Contact Forms
| Scenario ID | Name | Processed | Migrated | Endpoint |
|-------------|------|-----------|----------|----------|
| 2415-1 | New Entity (Contact to Company) - Pre-Form | Yes | Yes | `/api/contact/validate` |
| 2415-2 | New Entity (Contact to Company) - Proceed | Yes | Yes | `/api/contact/proceed` |

## Detailed Analysis

### 2415-2: New Entity (Contact to Company) - Proceed

**Processed:** 2026-01-26

**Blueprint Flow:**
1. Webhook receives: entity_id, tenant_id, company_id, current_user, is_test, knack_api_payloads
2. Update ENT with tenant connection
3. Create Self-ECN (person's self-connection)
4. Create Staff-ECN (person -> company connection)
5. Create SCN (Site Connection) using "no_site_record_id" variable
6. Iterate over COM payloads:
   - Create COM record
   - Update COM with self-ref
   - Create CCN linking COM to ECN/SCN
   - Update CCN with self-ref
7. Handle shared COMs (create CCNs for existing COMs)
8. Update SCN with CCN IDs
9. Update Self-ECN with self-ref
10. Update Staff-ECN with CCN IDs
11. Update ENT with primary ECN reference
12. Respond with ECN ID

**Key Objects/Views:**
- ENT: scene_141/view_2216 (object_54)
- ECN: scene_2353/view_5492 (object_187)
- SCN: scene_2392/view_5577 (object_199)
- COM: scene_2355/view_5497 (object_188)
- CCN: scene_2356/view_5498 (object_189)

**Current Implementation Gaps:** (FIXED 2026-01-26)
- [x] Self-ECN not created (only Staff-ECN) - IMPLEMENTED
- [x] SCN not created - IMPLEMENTED (uses NO_SITE_RECORD_ID)
- [x] ENT missing tenant_id field - IMPLEMENTED
- [x] ECN missing primary CCN connection fields - IMPLEMENTED
- [x] COMs marked as "Personal" instead of "Work" - Was already "Company" in lib/com-processing.js
- [x] Company role not defaulting to "General Staff" - IMPLEMENTED

---

## Notes

- Always process blueprints before analyzing: `node tools/blueprint-processor.js "blueprint.json"`
- Raw blueprints are ~200KB, processed versions are ~2-5KB
- Check `make_scenarios/` folder for JS modules used in ExecuteCode steps
