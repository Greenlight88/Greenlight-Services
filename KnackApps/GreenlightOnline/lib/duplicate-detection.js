/**
 * Duplicate Detection Logic for Company Creation
 * Ported from make_scenarios/company_duplicate_detection_lightweight.js
 *
 * Checks for:
 * 1. Duplicate company names (HARD FAIL - block)
 * 2. Existing contact details in CCN (SOFT FAIL - confirm)
 */

/**
 * Normalize string for comparison
 */
function normalizeForComparison(str) {
    return str ? str.toLowerCase().trim() : '';
}

/**
 * Analyze CCN search results for contact conflicts
 * @param {array} ccnResults - CCN records from Knack search
 * @param {string} emailNormalised - Email from form (normalized)
 * @param {string} phoneNormalised - Phone from form (normalized)
 * @returns {object} - { email_matches: [], phone_matches: [] }
 */
function analyzeCCNConflicts(ccnResults, emailNormalised, phoneNormalised) {
    const contactAnalysis = {
        email_matches: [],
        phone_matches: []
    };

    if (!Array.isArray(ccnResults) || ccnResults.length === 0) {
        console.log('✓ No CCN matches found');
        return contactAnalysis;
    }

    console.log(`📋 Analyzing ${ccnResults.length} CCN record(s)`);

    const normalizedFormEmail = normalizeForComparison(emailNormalised);
    const normalizedFormPhone = normalizeForComparison(phoneNormalised);

    ccnResults.forEach((ccnRecord, index) => {
        // Extract fields from CCN record
        const ccnId = ccnRecord.id;
        const contactValue = ccnRecord.field_4064 || ccnRecord.field_4001 || '';
        const contactType = ccnRecord.field_4012 || ''; // "Email" or "Phone"
        const ownershipType = ccnRecord.field_4011 || '';
        const comId = ccnRecord.field_4010_raw?.[0]?.id || null;
        const ecnId = ccnRecord.field_4121_raw?.[0]?.id || null;
        // Use enriched entity name from secondary lookups, fallback to raw identifier
        const ecnIdentifier = ccnRecord._enriched_entity_name || ccnRecord.field_4121_raw?.[0]?.identifier || 'Unknown Entity';

        const normalizedContactValue = normalizeForComparison(contactValue);

        // Check for email match
        if (contactType === 'Email' && normalizedContactValue && normalizedFormEmail === normalizedContactValue) {
            contactAnalysis.email_matches.push({
                type: 'email',
                contact_value: contactValue,
                ccn_id: ccnId,
                com_id: comId,
                ecn_id: ecnId,
                entity_identifier: ecnIdentifier,
                ownership_type: ownershipType,
                conflict_message: `This email is already used by ${ecnIdentifier}`
            });
            console.log(`   ⚠️ EMAIL MATCH: ${contactValue} (${ecnIdentifier})`);
        }

        // Check for phone match
        if (contactType === 'Phone' && normalizedContactValue && normalizedFormPhone === normalizedContactValue) {
            contactAnalysis.phone_matches.push({
                type: 'phone',
                contact_value: contactValue,
                ccn_id: ccnId,
                com_id: comId,
                ecn_id: ecnId,
                entity_identifier: ecnIdentifier,
                ownership_type: ownershipType,
                conflict_message: `This phone is already used by ${ecnIdentifier}`
            });
            console.log(`   ⚠️ PHONE MATCH: ${contactValue} (${ecnIdentifier})`);
        }
    });

    return contactAnalysis;
}

/**
 * Deduplicate matches by contact value
 * Handles cases where same email/phone exists in multiple COM records
 */
function deduplicateMatches(matches) {
    const seenContactValues = new Set();
    const deduplicatedMatches = [];

    matches.forEach(match => {
        const key = `${match.type}:${normalizeForComparison(match.contact_value)}`;
        if (!seenContactValues.has(key)) {
            seenContactValues.add(key);
            deduplicatedMatches.push(match);
        }
    });

    return deduplicatedMatches;
}

/**
 * Build the response object based on analysis results
 * @param {object} params - Analysis parameters
 * @returns {object} - Response for webhook
 */
function buildResponse({
    companyDuplicate,
    contactAnalysis,
    emailValidation,
    companyNameNormalised,
    isTest
}) {
    // Priority 1: Company name duplicate (HARD BLOCK)
    if (companyDuplicate) {
        console.log('🚫 HARD FAIL: Duplicate company name found');
        return {
            action_required: 'block',
            duplicates_encountered: true,
            messages: {
                block_message: `A company with this name already exists.`,
                title: 'Duplicate Company',
                view_link: companyDuplicate.view_link || null
            },
            duplicate_record_id: companyDuplicate.id,
            is_test: isTest
        };
    }

    // Priority 2: Email validation failure (HARD BLOCK)
    if (emailValidation && emailValidation.action === 'block') {
        console.log(`🚫 HARD FAIL: Email validation failed - ${emailValidation.status}`);
        return {
            action_required: 'block',
            duplicates_encountered: false,
            messages: {
                block_message: emailValidation.message,
                title: 'Invalid Email Address'
            },
            email_validation: emailValidation,
            is_test: isTest
        };
    }

    // Priority 3: Contact conflicts (SOFT FAIL - ask for confirmation)
    const allMatches = [
        ...contactAnalysis.email_matches,
        ...contactAnalysis.phone_matches
    ];
    const deduplicatedMatches = deduplicateMatches(allMatches);

    if (deduplicatedMatches.length > 0) {
        console.log(`⚠️ SOFT FAIL: Found ${deduplicatedMatches.length} contact conflict(s)`);

        const conflicts = deduplicatedMatches.map(match => {
            let fieldId = '';
            if (match.type === 'email') fieldId = 'field_4057';
            if (match.type === 'phone') fieldId = 'field_4056';

            return {
                type: match.type,
                field_id: fieldId,
                submitted_value: match.contact_value,
                existing_entity: match.entity_identifier,
                existing_ccn_id: match.ccn_id,
                existing_com_id: match.com_id,
                existing_ecn_id: match.ecn_id,
                ownership_type: match.ownership_type,
                conflict_message: match.conflict_message,
                suggestion: match.ownership_type === 'Company' || match.ownership_type === 'Shared'
                    ? "This contact may be legitimately shared between companies."
                    : "This contact is marked as Personal/Work and may not be appropriate to share."
            };
        });

        return {
            action_required: 'confirm',
            duplicates_encountered: true,
            conflicts,
            resolution_options: {
                can_share: true,
                message: "One or more contact details are already in use. These may be shared resources or data entry errors.",
                options: {
                    proceed_anyway: "Proceed with creating company and shared contacts",
                    modify_details: "Go back and modify the contact details",
                    cancel: "Cancel company creation"
                }
            },
            email_validation: emailValidation,
            com_action_type: 'pending_user_action',
            shared_com_ids: '',
            knack_api_payloads: '',
            is_test: isTest
        };
    }

    // No issues - PROCEED
    console.log('✅ PROCEED: No duplicates or conflicts found');
    return {
        action_required: 'proceed',
        duplicates_encountered: false,
        message: 'No duplicates found. Creating company record.',
        company_name: companyNameNormalised,
        email_validation: emailValidation,
        com_action_type: 'create_all',
        shared_com_ids: '',
        knack_api_payloads: '',
        is_test: isTest
    };
}

module.exports = {
    normalizeForComparison,
    analyzeCCNConflicts,
    deduplicateMatches,
    buildResponse
};
