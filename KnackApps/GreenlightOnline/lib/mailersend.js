/**
 * MailerSend Email Validation Helper
 * Validates email addresses using MailerSend's verification API
 * Uses permissive approach: only blocks definite failures
 */

const MAILERSEND_API = 'https://api.mailersend.com/v1';

// Only block when we KNOW the email doesn't exist
const BLOCK_STATUSES = ['mailbox_not_found', 'syntax_error'];

/**
 * Validate an email address using MailerSend
 * @param {string} email - Email address to validate
 * @param {boolean} allowAll - If true, bypass validation entirely (for testing)
 * @returns {Promise<object>} - { status, action: 'allow'|'block', message }
 */
async function validateEmail(email, allowAll = false) {
    // Bypass validation if allowAll is set (for testing with fake emails)
    if (allowAll) {
        console.log('📧 Email validation bypassed (allow_emails=Yes)');
        return {
            status: 'valid',
            action: 'allow',
            message: ''
        };
    }

    // No email provided - nothing to validate
    if (!email || !email.trim()) {
        return {
            status: 'not_provided',
            action: 'allow',
            message: ''
        };
    }

    // Mock mode for testing (basic syntax check without API call)
    if (process.env.MOCK_MAILERSEND === 'true') {
        console.log('📧 MailerSend mock mode - checking syntax only');
        const isValidFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!isValidFormat) {
            return {
                status: 'syntax_error',
                action: 'block',
                message: 'The email address has invalid formatting.'
            };
        }
        return {
            status: 'valid',
            action: 'allow',
            message: ''
        };
    }

    // Check if MailerSend API key is configured
    if (!process.env.MAILERSEND_API_KEY) {
        console.log('📧 MailerSend API key not configured - skipping validation');
        return {
            status: 'not_configured',
            action: 'allow',
            message: ''
        };
    }

    try {
        const response = await fetch(`${MAILERSEND_API}/email-verification/verify`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.MAILERSEND_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`📧 MailerSend API error (${response.status}): ${errorText}`);
            // API error - allow the email through (don't block user for our issues)
            return {
                status: 'api_error',
                action: 'allow',
                message: ''
            };
        }

        const result = await response.json();
        const status = result.status;

        console.log(`📧 MailerSend validation result for ${email}: ${status}`);

        // Permissive approach: only block definite failures
        if (BLOCK_STATUSES.includes(status)) {
            const messages = {
                'mailbox_not_found': "This email address doesn't exist.",
                'syntax_error': "The email address has invalid formatting."
            };

            return {
                status,
                action: 'block',
                message: messages[status] || `Invalid email: ${status}`
            };
        }

        // Everything else is allowed
        return {
            status: status || 'valid',
            action: 'allow',
            message: ''
        };

    } catch (error) {
        console.error('📧 MailerSend validation error:', error.message);
        // Network error - allow the email through
        return {
            status: 'network_error',
            action: 'allow',
            message: ''
        };
    }
}

module.exports = {
    validateEmail,
    BLOCK_STATUSES
};
