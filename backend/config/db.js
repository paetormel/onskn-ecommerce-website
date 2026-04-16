import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("Missing required environment variable: DATABASE_URL");
}

const NODE_ENV = process.env.NODE_ENV ?? "development";
const DB_SSL = process.env.DB_SSL ?? "false";

// local/dev default: no ssl
// production can opt in with DB_SSL=true
const ssl =
  DB_SSL === "true"
    ? { rejectUnauthorized: false }
    : false;

export const pool = new Pool({
  connectionString: DATABASE_URL,
  max: Number(process.env.DB_POOL_MAX ?? 20),
  idleTimeoutMillis: Number(process.env.DB_IDLE_TIMEOUT_MS ?? 30000),
  connectionTimeoutMillis: Number(process.env.DB_CONNECTION_TIMEOUT_MS ?? 20000),
  ssl,
});

pool.on("connect", () => {
  console.log("[db] New PostgreSQL client connected");
});

pool.on("error", (err) => {
  console.error("[db] Unexpected PostgreSQL pool error", {
    message: err.message,
    stack: err.stack,
  });
});

export async function connectDB() {
  try {
    await pool.query("SELECT 1");
    console.log("[db] Database connectivity check passed");
  } catch (error) {
    console.error("[db] Database connectivity check failed", {
      message: error.message,
      stack: error.stack,
    });
    throw error;
  }
}

export async function query(text, params = []) {
  const start = Date.now();

  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;

    console.log("[db] Query executed", {
      duration,
      rows: result.rowCount,
    });

    return result;
  } catch (error) {
    const duration = Date.now() - start;

    console.error("[db] Query failed", {
      duration,
      message: error.message,
      code: error.code,
    });

    throw error;
  }
}

export async function closeDB() {
  try {
    await pool.end();
    console.log("[db] PostgreSQL pool closed");
  } catch (error) {
    console.error("[db] Failed to close PostgreSQL pool", {
      message: error.message,
      stack: error.stack,
    });
    throw error;
  }
}