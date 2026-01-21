-- Greenlight Online Database Schema
-- Provider: Neon (Vercel Postgres)
-- Last updated: 2025-01-21

-- ============================================================================
-- REQUEST LOG
-- Tracks all API requests for debugging, auditing, and analytics
-- ============================================================================
CREATE TABLE IF NOT EXISTS request_log (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Request details
    endpoint VARCHAR(100) NOT NULL,
    method VARCHAR(10) DEFAULT 'POST',

    -- Payloads (JSONB for queryability)
    request_payload JSONB,
    response_payload JSONB,

    -- Outcome tracking
    outcome VARCHAR(20),  -- proceed, block, confirm, error
    duration_ms INTEGER,
    error_message TEXT,

    -- Context
    related_entity_id VARCHAR(50),  -- Knack record ID if applicable
    view_id VARCHAR(20),            -- Knack view that triggered request
    user_id VARCHAR(50),            -- Knack user ID
    tenant_id VARCHAR(50),          -- Multi-tenant support

    -- Request metadata
    ip_address VARCHAR(45),
    user_agent TEXT
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_request_log_created_at ON request_log(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_request_log_outcome ON request_log(outcome);
CREATE INDEX IF NOT EXISTS idx_request_log_endpoint ON request_log(endpoint);
CREATE INDEX IF NOT EXISTS idx_request_log_view_id ON request_log(view_id);

-- ============================================================================
-- FUTURE TABLES (placeholder for migration from Knack)
-- ============================================================================
-- As you migrate from Knack, add new table definitions here
-- Examples:
-- - entities (companies, people)
-- - entity_connections
-- - communication_channels
-- - etc.
