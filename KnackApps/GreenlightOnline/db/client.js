/**
 * Database Client
 * Wrapper around @vercel/postgres for Greenlight Online
 */

const { sql } = require('@vercel/postgres');

/**
 * Log an API request to the database
 * @param {object} logEntry - The log entry data
 */
async function logRequest(logEntry) {
    const {
        endpoint,
        method = 'POST',
        requestPayload,
        responsePayload,
        outcome,
        durationMs,
        errorMessage,
        relatedEntityId,
        viewId,
        userId,
        tenantId,
        ipAddress,
        userAgent
    } = logEntry;

    try {
        await sql`
            INSERT INTO request_log (
                endpoint,
                method,
                request_payload,
                response_payload,
                outcome,
                duration_ms,
                error_message,
                related_entity_id,
                view_id,
                user_id,
                tenant_id,
                ip_address,
                user_agent
            ) VALUES (
                ${endpoint},
                ${method},
                ${JSON.stringify(requestPayload)}::jsonb,
                ${JSON.stringify(responsePayload)}::jsonb,
                ${outcome},
                ${durationMs},
                ${errorMessage},
                ${relatedEntityId},
                ${viewId},
                ${userId},
                ${tenantId},
                ${ipAddress},
                ${userAgent}
            )
        `;
        return true;
    } catch (error) {
        // Don't let logging failures break the main flow
        console.error('Failed to log request:', error.message);
        return false;
    }
}

/**
 * Query recent logs (for debugging)
 * @param {object} options - Query options
 */
async function getRecentLogs(options = {}) {
    const { limit = 50, outcome, endpoint, viewId } = options;

    try {
        let result;

        if (outcome) {
            result = await sql`
                SELECT * FROM request_log
                WHERE outcome = ${outcome}
                ORDER BY created_at DESC
                LIMIT ${limit}
            `;
        } else if (endpoint) {
            result = await sql`
                SELECT * FROM request_log
                WHERE endpoint = ${endpoint}
                ORDER BY created_at DESC
                LIMIT ${limit}
            `;
        } else if (viewId) {
            result = await sql`
                SELECT * FROM request_log
                WHERE view_id = ${viewId}
                ORDER BY created_at DESC
                LIMIT ${limit}
            `;
        } else {
            result = await sql`
                SELECT * FROM request_log
                ORDER BY created_at DESC
                LIMIT ${limit}
            `;
        }

        return result.rows;
    } catch (error) {
        console.error('Failed to query logs:', error.message);
        return [];
    }
}

/**
 * Delete old log entries
 * @param {number} daysToKeep - Number of days to retain logs
 */
async function cleanupOldLogs(daysToKeep = 90) {
    try {
        const result = await sql`
            DELETE FROM request_log
            WHERE created_at < NOW() - INTERVAL '1 day' * ${daysToKeep}
        `;
        return result.rowCount;
    } catch (error) {
        console.error('Failed to cleanup logs:', error.message);
        return 0;
    }
}

/**
 * Run a migration file
 * @param {string} migrationSql - The SQL to execute
 */
async function runMigration(migrationSql) {
    try {
        await sql.query(migrationSql);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

/**
 * Initialize database (run migrations)
 * Call this once to set up tables
 */
async function initializeDatabase() {
    const createTableSql = `
        CREATE TABLE IF NOT EXISTS request_log (
            id SERIAL PRIMARY KEY,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            endpoint VARCHAR(100) NOT NULL,
            method VARCHAR(10) DEFAULT 'POST',
            request_payload JSONB,
            response_payload JSONB,
            outcome VARCHAR(20),
            duration_ms INTEGER,
            error_message TEXT,
            related_entity_id VARCHAR(50),
            view_id VARCHAR(20),
            user_id VARCHAR(50),
            tenant_id VARCHAR(50),
            ip_address VARCHAR(45),
            user_agent TEXT
        );

        CREATE INDEX IF NOT EXISTS idx_request_log_created_at ON request_log(created_at DESC);
        CREATE INDEX IF NOT EXISTS idx_request_log_outcome ON request_log(outcome);
        CREATE INDEX IF NOT EXISTS idx_request_log_endpoint ON request_log(endpoint);
        CREATE INDEX IF NOT EXISTS idx_request_log_view_id ON request_log(view_id);
    `;

    return runMigration(createTableSql);
}

module.exports = {
    sql,
    logRequest,
    getRecentLogs,
    cleanupOldLogs,
    runMigration,
    initializeDatabase
};
