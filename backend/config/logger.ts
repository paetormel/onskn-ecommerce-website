import pino, { type Logger } from "pino";
import { env } from "./env.js";

const VALID_LOG_LEVELS = new Set([
  "fatal",
  "error",
  "warn",
  "info",
  "debug",
  "trace",
  "silent",
]);

function resolveLogLevel(logLevel: string): pino.LevelWithSilent {
  return VALID_LOG_LEVELS.has(logLevel)
    ? (logLevel as pino.LevelWithSilent)
    : "info";
}

const REDACT_PATHS = [
  "req.headers.authorization",
  "req.headers.cookie",
  "res.headers['set-cookie']",
  "headers.authorization",
  "headers.cookie",
  "authorization",
  "cookie",
  "password",
  "body.password",
  "token",
  "body.token",
  "refreshToken",
  "body.refreshToken",
  "accessToken",
  "body.accessToken",
];

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

export const logger: Logger = pino({
  level: resolveLogLevel(env.LOG_LEVEL),
  base: undefined,
  redact: {
    paths: REDACT_PATHS,
    censor: "[REDACTED]",
  },
  transport: createTransport(),
});

export function createLogger(bindings: Record<string, unknown> = {}): Logger {
  return logger.child(bindings);
}
