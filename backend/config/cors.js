import cors from "cors";
import { env } from "./env.js";

function parseAllowedOrigins(corsOrigin) {
  if (!corsOrigin) return new Set();

  return new Set(
    corsOrigin
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean)
  );
}

const allowedOrigins = parseAllowedOrigins(env.CORS_ORIGIN);

function isOriginAllowed(origin) {
  if (!origin) {
    return true;
  }

  if (env.NODE_ENV !== "production" && allowedOrigins.size === 0) {
    return true;
  }

  return allowedOrigins.has(origin);
}

export const corsMiddleware = cors({
  origin(origin, callback) {
    if (isOriginAllowed(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS origin denied: ${origin}`));
  },
  credentials: env.CORS_CREDENTIALS,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
});