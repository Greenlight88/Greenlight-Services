-- Migration: 001_create_request_log
-- Created: 2025-01-21
-- Description: Initial request logging table

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
    outcome VARCHAR(20),
    duration_ms INTEGER,
    error_message TEXT,

    -- Context
    related_entity_id VARCHAR(50),
    view_id VARCHAR(20),
    user_id VARCHAR(50),
    tenant_id VARCHAR(50),

    -- Request metadata
    ip_address VARCHAR(45),
    user_agent TEXT
);

CREATE INDEX IF NOT EXISTS idx_request_log_created_at ON request_log(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_request_log_outcome ON request_log(outcome);
CREATE INDEX IF NOT EXISTS idx_request_log_endpoint ON request_log(endpoint);
CREATE INDEX IF NOT EXISTS idx_request_log_view_id ON request_log(view_id);
