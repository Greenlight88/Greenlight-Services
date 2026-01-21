/**
 * Cron Job: Cleanup Old Logs
 * Runs daily at 3am UTC (configured in vercel.json)
 *
 * Deletes request_log entries older than 90 days
 */

const { cleanupOldLogs } = require('../../db/client');

const DAYS_TO_KEEP = 90;

module.exports = async function handler(req, res) {
    // Verify this is a legitimate cron request from Vercel
    // In production, Vercel adds this header automatically
    const authHeader = req.headers.authorization;
    const cronSecret = process.env.CRON_SECRET;

    // If CRON_SECRET is set, verify it (optional security layer)
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
        console.warn('Unauthorized cron attempt');
        return res.status(401).json({ error: 'Unauthorized' });
    }

    console.log(`🧹 Starting log cleanup (keeping last ${DAYS_TO_KEEP} days)...`);

    try {
        const deletedCount = await cleanupOldLogs(DAYS_TO_KEEP);

        console.log(`✅ Cleanup complete: ${deletedCount} old entries deleted`);

        return res.status(200).json({
            success: true,
            deleted: deletedCount,
            retention_days: DAYS_TO_KEEP,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('❌ Cleanup failed:', error);

        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
