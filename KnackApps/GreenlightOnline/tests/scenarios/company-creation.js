/**
 * Company Creation Test Scenarios
 * Comprehensive test cases for validate and proceed endpoints
 */

const addresses = require('../fixtures/addresses');

module.exports = [
    // === FULL PROCESSING SCENARIOS ===
    {
        name: 'Full company - address + email + phone',
        input: {
            company_name: 'Test Full Company',
            email: 'testfull@example.com',
            phone: '0390001111',
            address: addresses[0] // Melbourne
        },
        expect: {
            validate: 'proceed',
            proceed: {
                ecn: true,
                ent_updated: true,
                site: 'created_or_found',
                scn: true,
                coms: 2,
                ccns: 2,
                google_maps: true
            }
        }
    },
    {
        name: 'Company - address + email only',
        input: {
            company_name: 'Test Address Email',
            email: 'addremail@example.com',
            address: addresses[1] // Sydney
        },
        expect: {
            validate: 'proceed',
            proceed: {
                ecn: true,
                site: 'created_or_found',
                scn: true,
                coms: 1,
                ccns: 1,
                google_maps: true
            }
        }
    },
    {
        name: 'Company - address + phone only',
        input: {
            company_name: 'Test Address Phone',
            phone: '0390002222',
            address: addresses[2] // Brisbane
        },
        expect: {
            validate: 'proceed',
            proceed: {
                ecn: true,
                site: 'created_or_found',
                scn: true,
                coms: 1,
                ccns: 1,
                google_maps: true
            }
        }
    },

    // === NO CONTACT SCENARIOS ===
    {
        name: 'Company - address only, no contacts',
        input: {
            company_name: 'Test Address Only',
            address: addresses[3] // Adelaide
        },
        expect: {
            validate: 'proceed',
            proceed: {
                ecn: true,
                site: 'created_or_found',
                scn: true,
                coms: 0,
                ccns: 0,
                google_maps: true
            }
        }
    },

    // === NO SITE SCENARIOS (uses placeholder) ===
    {
        name: 'Company - no address (uses No Site placeholder)',
        input: {
            company_name: 'Test No Address',
            email: 'noaddr@example.com'
        },
        expect: {
            validate: 'proceed',
            proceed: {
                ecn: true,
                site: 'no_site',
                scn: true,
                coms: 1,
                ccns: 1,
                google_maps: false
            }
        }
    },
    {
        name: 'Company - email only',
        input: {
            company_name: 'Test Email Only',
            email: 'emailonly@example.com'
        },
        expect: {
            validate: 'proceed',
            proceed: {
                ecn: true,
                site: 'no_site',
                coms: 1,
                ccns: 1,
                google_maps: false
            }
        }
    },
    {
        name: 'Company - phone only',
        input: {
            company_name: 'Test Phone Only',
            phone: '0390003333'
        },
        expect: {
            validate: 'proceed',
            proceed: {
                ecn: true,
                site: 'no_site',
                coms: 1,
                ccns: 1,
                google_maps: false
            }
        }
    },
    {
        name: 'Company - email + phone, no address',
        input: {
            company_name: 'Test Email Phone Only',
            email: 'emailphone@example.com',
            phone: '0390004444'
        },
        expect: {
            validate: 'proceed',
            proceed: {
                ecn: true,
                site: 'no_site',
                coms: 2,
                ccns: 2,
                google_maps: false
            }
        }
    },

    // === BLOCK SCENARIOS ===
    {
        name: 'Duplicate company name - blocked',
        input: {
            // This should match an existing company in the database
            company_name: 'Existing Test Company'
        },
        expect: {
            validate: 'block',
            reason: 'duplicate_company'
        },
        setup: {
            // Note: This scenario requires a pre-existing company in the test database
            requires_seed_data: true
        }
    },
    {
        name: 'Invalid email format - blocked',
        input: {
            company_name: 'Test Invalid Email',
            email: 'notanemail'
        },
        expect: {
            validate: 'block',
            reason: 'invalid_email'
        },
        setup: {
            // Requires MailerSend API key to validate email format
            requires_mailersend_api: true
        }
    },

    // === CONFIRM SCENARIOS (contact conflicts) ===
    {
        name: 'Email conflict - requires confirmation',
        input: {
            company_name: 'Test Email Conflict',
            email: 'shared@existingcompany.com' // Pre-seeded
        },
        expect: {
            validate: 'confirm',
            conflict_type: 'email'
        },
        setup: {
            requires_seed_data: true
        }
    },
    {
        name: 'Phone conflict - requires confirmation',
        input: {
            company_name: 'Test Phone Conflict',
            phone: '0412345678' // Pre-seeded
        },
        expect: {
            validate: 'confirm',
            conflict_type: 'phone'
        },
        setup: {
            requires_seed_data: true
        }
    },
    {
        name: 'Both email and phone conflict',
        input: {
            company_name: 'Test Both Conflicts',
            email: 'shared@existingcompany.com',
            phone: '0412345678'
        },
        expect: {
            validate: 'confirm',
            conflict_count: 2
        },
        setup: {
            requires_seed_data: true
        }
    }
];
