/**
 * Local Development Server
 * Runs the API endpoints locally for testing before deploying to Vercel
 *
 * Usage:
 *   npm run dev
 *   # or
 *   node server.js
 *
 * Then test with:
 *   curl -X POST http://localhost:3001/api/company/validate \
 *     -H "Content-Type: application/json" \
 *     -d '{"company_search":"test company"}'
 */

const express = require('express');
const cors = require('cors');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '.env.local') });

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
    next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        env: {
            KNACK_APP_ID: process.env.KNACK_APP_ID ? '✓ Set' : '✗ Missing',
            KNACK_API_KEY: process.env.KNACK_API_KEY ? '✓ Set' : '✗ Missing',
            MAILERSEND_API_KEY: process.env.MAILERSEND_API_KEY ? '✓ Set' : '✗ Missing'
        }
    });
});

// API Routes - import handlers from api/ folder
const companyValidateHandler = require('./api/company/validate');

// Mount the handlers
// Note: Vercel handlers receive (req, res), same as Express
app.post('/api/company/validate', (req, res) => {
    companyValidateHandler(req, res);
});

app.options('/api/company/validate', (req, res) => {
    companyValidateHandler(req, res);
});

// TODO: Add post-submission endpoint when ready
// const companyProcessHandler = require('./api/company/process');
// app.post('/api/company/process', companyProcessHandler);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not found', path: req.url });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error', message: err.message });
});

// Start server
app.listen(PORT, () => {
    console.log('');
    console.log('========================================');
    console.log('  Greenlight Online API - Local Server');
    console.log('========================================');
    console.log(`  URL: http://localhost:${PORT}`);
    console.log('');
    console.log('  Endpoints:');
    console.log(`    POST /api/company/validate`);
    console.log(`    GET  /api/health`);
    console.log('');
    console.log('  Environment:');
    console.log(`    KNACK_APP_ID: ${process.env.KNACK_APP_ID ? '✓ Set' : '✗ Missing'}`);
    console.log(`    KNACK_API_KEY: ${process.env.KNACK_API_KEY ? '✓ Set' : '✗ Missing'}`);
    console.log(`    MAILERSEND_API_KEY: ${process.env.MAILERSEND_API_KEY ? '✓ Set' : '✗ Missing'}`);
    console.log('');
    console.log('  Press Ctrl+C to stop');
    console.log('========================================');
    console.log('');
});
