import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const {
  DATABASE_URL,
  NODE_ENV = "development",
  DB_SSL = "false",
  DB_POOL_MAX = "20",
  DB_IDLE_TIMEOUT_MS = "30000",
  DB_CONNECTION_TIMEOUT_MS = "20000",
} = process.env;

if (!DATABASE_URL) {
  throw new Error("Missing DATABASE_URL");
}

const ssl =
  DB_SSL === "true"
    ? { rejectUnauthorized: false }
    : false;

export const pool = new Pool({
  connectionString: DATABASE_URL,
  max: Number(DB_POOL_MAX),
  idleTimeoutMillis: Number(DB_IDLE_TIMEOUT_MS),
  connectionTimeoutMillis: Number(DB_CONNECTION_TIMEOUT_MS),
  ssl,
});

/**
 * Logs
 */
pool.on("connect", () => {
  console.log("[db] connected");
});

pool.on("error", (err) => {
  console.error("[db] pool error", {
    message: err.message,
    code: err.code,
  });
});

/**
 * Basic query wrapper
 */
export async function query(text, params = []) {
  const start = Date.now();

  try {
    const result = await pool.query(text, params);

    console.log("[db] query", {
      duration: Date.now() - start,
      rows: result.rowCount,
    });

    return result;
  } catch (error) {
    console.error("[db] query error", {
      duration: Date.now() - start,
      message: error.message,
      code: error.code,
    });

    throw error;
  }
}

/**
 * Transaction helper (GOD TIER)
 */
export async function withTransaction(callback) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const result = await callback(client);

    await client.query("COMMIT");

    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

/**
 * Health check
 */
export async function connectDB() {
  try {
    await query("SELECT 1");
    console.log("[db] health check ok");
  } catch (error) {
    console.error("[db] health check failed", error);
    throw error;
  }
}

/**
 * Graceful shutdown
 */
export async function closeDB() {
  await pool.end();
  console.log("[db] pool closed");
}