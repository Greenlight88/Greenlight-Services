/**
 * Structured logging utility for Axiom/Vercel
 *
 * Usage:
 *   const logger = require('../lib/logger');
 *   logger.info('user_created', { userId: '123', email: 'test@example.com' });
 *   logger.error('validation_failed', { field: 'email', reason: 'invalid format' });
 */

const LOG_LEVELS = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3
};

// Minimum level to output (can be set via env var)
const MIN_LEVEL = LOG_LEVELS[process.env.LOG_LEVEL] || LOG_LEVELS.info;

function createLogEntry(level, event, data = {}) {
  return {
    timestamp: new Date().toISOString(),
    level,
    event,
    ...data,
    // Add environment context
    env: process.env.VERCEL_ENV || 'development'
  };
}

function log(level, event, data) {
  if (LOG_LEVELS[level] < MIN_LEVEL) return;

  const entry = createLogEntry(level, event, data);

  // Axiom picks up structured JSON from console
  if (level === 'error') {
    console.error(JSON.stringify(entry));
  } else if (level === 'warn') {
    console.warn(JSON.stringify(entry));
  } else {
    console.log(JSON.stringify(entry));
  }

  return entry;
}

module.exports = {
  debug: (event, data) => log('debug', event, data),
  info: (event, data) => log('info', event, data),
  warn: (event, data) => log('warn', event, data),
  error: (event, data) => log('error', event, data),

  // For request tracking - creates a child logger with requestId
  withRequest: (requestId) => ({
    debug: (event, data) => log('debug', event, { ...data, requestId }),
    info: (event, data) => log('info', event, { ...data, requestId }),
    warn: (event, data) => log('warn', event, { ...data, requestId }),
    error: (event, data) => log('error', event, { ...data, requestId })
  })
};
