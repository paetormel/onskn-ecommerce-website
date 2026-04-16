/**
 * @file logger.js
 * @description Centralized application logger configuration.
 *
 * Logging policy:
 * - JSON logs outside development for machine-readable production logging
 * - Pretty logs in development for local readability
 * - Sensitive fields are redacted before output
 * - Default pino metadata is removed to keep logs concise
 *
 * Usage:
 *   import { logger, createLogger } from "./logger.js";
 *
 *   logger.info("Server started");
 *   logger.error({ err }, "Unhandled error");
 *
 *   const productLogger = createLogger({ module: "products" });
 *   productLogger.info({ productId }, "Product created");
 */

import pino from "pino";
import { env } from "./env.js";

/**
 * Allowed Pino log levels.
 * Keep this aligned with env validation.
 */
const VALID_LOG_LEVELS = new Set([
  "fatal",
  "error",
  "warn",
  "info",
  "debug",
  "trace",
  "silent",
]);

/**
 * Normalize the log level.
 * Falls back to "info" if env validation is missing or misconfigured.
 */
function resolveLogLevel(logLevel) {
  return VALID_LOG_LEVELS.has(logLevel) ? logLevel : "info";
}

/**
 * Central list of sensitive fields to redact.
 *
 * Notes:
 * - Redaction only applies to object paths.
 * - It does not protect secrets manually interpolated into strings.
 * - Developers must never log raw tokens, passwords, cookies, or secrets in messages.
 */
const REDACT_PATHS = [
  // common request/response header shapes
  "req.headers.authorization",
  "req.headers.cookie",
  "res.headers['set-cookie']",

  // alternative object shapes often logged by middleware or app code
  "headers.authorization",
  "headers.cookie",
  "authorization",
  "cookie",

  // common payload fields
  "password",
  "body.password",
  "token",
  "body.token",
  "refreshToken",
  "body.refreshToken",
  "accessToken",
  "body.accessToken",
];

/**
 * Development-only transport for readable console output.
 * Keep undefined outside development so production emits structured JSON.
 */
function createTransport() {
  if (env.NODE_ENV !== "development") {
    return undefined;
  }

  return {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:standard",
      ignore: "pid,hostname",
    },
  };
}

/**
 * Shared root logger instance.
 */
export const logger = pino({
  level: resolveLogLevel(env.LOG_LEVEL),
  base: undefined,
  redact: {
    paths: REDACT_PATHS,
    censor: "[REDACTED]",
  },
  transport: createTransport(),
});

/**
 * Create a child logger with structured context.
 *
 * Use child loggers for module, request, or job-specific metadata.
 *
 * Example:
 *   const log = createLogger({ module: "auth" });
 *   log.info({ userId }, "Login succeeded");
 */
export function createLogger(bindings = {}) {
  return logger.child(bindings);
}