import pkg, { type PoolClient, type QueryResult } from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const {
  DATABASE_URL,
  DB_SSL = "false",
  DB_POOL_MAX = "20",
  DB_IDLE_TIMEOUT_MS = "30000",
  DB_CONNECTION_TIMEOUT_MS = "20000",
} = process.env;

if (!DATABASE_URL) {
  throw new Error("Missing DATABASE_URL");
}

const ssl = DB_SSL === "true" ? { rejectUnauthorized: false } : false;

export const pool = new Pool({
  connectionString: DATABASE_URL,
  max: Number(DB_POOL_MAX),
  idleTimeoutMillis: Number(DB_IDLE_TIMEOUT_MS),
  connectionTimeoutMillis: Number(DB_CONNECTION_TIMEOUT_MS),
  ssl,
});

pool.on("connect", () => {
  console.log("[db] connected");
});

pool.on("error", (err: Error & { code?: string }) => {
  console.error("[db] pool error", {
    message: err.message,
    code: err.code,
  });
});

export async function query(
  text: string,
  params: unknown[] = []
): Promise<QueryResult> {
  const start = Date.now();

  try {
    const result = await pool.query(text, params);

    console.log("[db] query", {
      duration: Date.now() - start,
      rows: result.rowCount,
    });

    return result;
  } catch (error) {
    const err = error as Error & { code?: string };

    console.error("[db] query error", {
      duration: Date.now() - start,
      message: err.message,
      code: err.code,
    });

    throw error;
  }
}

export async function withTransaction<T>(
  callback: (client: PoolClient) => Promise<T>
): Promise<T> {
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

export async function connectDB(): Promise<void> {
  try {
    await query("SELECT 1");
    console.log("[db] health check ok");
  } catch (error) {
    console.error("[db] health check failed", error);
    throw error;
  }
}

export async function closeDB(): Promise<void> {
  await pool.end();
  console.log("[db] pool closed");
}
