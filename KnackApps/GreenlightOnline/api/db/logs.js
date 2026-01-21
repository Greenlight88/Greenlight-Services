/**
 * View Request Logs Endpoint
 * GET /api/db/logs
 *
 * Query recent API request logs for debugging.
 * Protected by ADMIN_SECRET environment variable.
 *
 * Query params:
 *   - limit: number of records (default 50, max 500)
 *   - outcome: filter by outcome (proceed, block, confirm, error)
 *   - endpoint: filter by endpoint
 *   - view_id: filter by Knack view ID
 */

const { getRecentLogs } = require('../../db/client');

module.exports = async function handler(req, res) {
    // Only allow GET
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Require admin secret for security
    const adminSecret = process.env.ADMIN_SECRET;
    const providedSecret = req.headers['x-admin-secret'] || req.query.secret;

    if (!adminSecret) {
        return res.status(500).json({
            error: 'ADMIN_SECRET not configured'
        });
    }

    if (providedSecret !== adminSecret) {
        return res.status(401).json({ error: 'Invalid admin secret' });
    }

    // Parse query parameters
    const limit = Math.min(parseInt(req.query.limit) || 50, 500);
    const { outcome, endpoint, view_id } = req.query;

    try {
        const logs = await getRecentLogs({
            limit,
            outcome,
            endpoint,
            viewId: view_id
        });

        return res.status(200).json({
            success: true,
            count: logs.length,
            logs
        });
    } catch (error) {
        console.error('Failed to fetch logs:', error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
