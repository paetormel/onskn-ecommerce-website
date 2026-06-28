import dotenv from "dotenv";
import { cleanEnv, num, str, bool } from "envalid";

dotenv.config();

export const env = cleanEnv(process.env, {
  NODE_ENV: str({
    choices: ["development", "test", "production"],
    default: "development",
  }),
  DATABASE_URL: str(),
  PORT: num({ default: 5000 }),

  CORS_ORIGIN: str({ default: "" }),
  CORS_CREDENTIALS: bool({ default: false }),

  RATE_LIMIT_WINDOW_MS: num({ default: 15 * 60 * 1000 }),
  RATE_LIMIT_MAX: num({ default: 100 }),

  AUTH_RATE_LIMIT_WINDOW_MS: num({ default: 10 * 60 * 1000 }),
  AUTH_RATE_LIMIT_MAX: num({ default: 5 }),

  LOG_LEVEL: str({
    choices: ["fatal", "error", "warn", "info", "debug", "trace", "silent"],
    default: "info",
  }),

  TRUST_PROXY: bool({ default: false }),

  JWT_SECRET: str({ devDefault: "dev-jwt-secret-change-in-production" }),
  JWT_EXPIRES_IN: str({ default: "15m" }),
  GOOGLE_CLIENT_ID: str({ default: "" }),

  CLOUDINARY_NAME: str({ default: "" }),
  CLOUDINARY_KEY: str({ default: "" }),
  CLOUDINARY_SECRET: str({ default: "" }),
});
