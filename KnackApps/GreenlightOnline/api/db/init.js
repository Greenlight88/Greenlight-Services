/**
 * Database Initialization Endpoint
 * POST /api/db/init
 *
 * Run this once after deployment to create the database tables.
 * Protected by ADMIN_SECRET environment variable.
 */

const { initializeDatabase } = require('../../db/client');

module.exports = async function handler(req, res) {
    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Require admin secret for security
    const adminSecret = process.env.ADMIN_SECRET;
    const providedSecret = req.headers['x-admin-secret'] || req.body?.admin_secret;

    if (!adminSecret) {
        return res.status(500).json({
            error: 'ADMIN_SECRET not configured',
            hint: 'Add ADMIN_SECRET to your Vercel environment variables'
        });
    }

    if (providedSecret !== adminSecret) {
        return res.status(401).json({ error: 'Invalid admin secret' });
    }

    console.log('🔧 Initializing database...');

    try {
        const result = await initializeDatabase();

        if (result.success) {
            console.log('✅ Database initialized successfully');
            return res.status(200).json({
                success: true,
                message: 'Database tables created successfully',
                timestamp: new Date().toISOString()
            });
        } else {
            console.error('❌ Database initialization failed:', result.error);
            return res.status(500).json({
                success: false,
                error: result.error
            });
        }
    } catch (error) {
        console.error('❌ Database initialization error:', error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
