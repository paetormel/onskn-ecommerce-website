import type { Server } from "node:http";
import app from "./app.js";
import { connectDB, closeDB } from "../config/db.js";
import { env } from "../config/env.js";

const PORT = env.PORT;

let server: Server | null = null;
let isShuttingDown = false;
let hasStarted = false;

async function shutdown(signal: string): Promise<void> {
  if (isShuttingDown) return;
  isShuttingDown = true;

  console.log(`[server] Received ${signal}. Starting graceful shutdown`);

  const forceShutdownTimer = setTimeout(() => {
    console.error("[server] Forced shutdown after timeout");
    process.exit(1);
  }, 10000);

  try {
    if (server) {
      await new Promise<void>((resolve, reject) => {
        server!.close((err) => {
          if (err) return reject(err);
          resolve();
        });
      });

      console.log("[server] HTTP server closed");
    }

    await closeDB();
    clearTimeout(forceShutdownTimer);

    console.log("[server] Graceful shutdown completed");
    process.exit(0);
  } catch (error) {
    clearTimeout(forceShutdownTimer);
    const err = error as Error;

    console.error("[server] Shutdown failed", {
      message: err.message,
      stack: err.stack,
    });
    process.exit(1);
  }
}

function registerProcessHandlers(): void {
  process.once("SIGTERM", () => void shutdown("SIGTERM"));
  process.once("SIGINT", () => void shutdown("SIGINT"));
}

async function startServer(): Promise<void> {
  if (hasStarted) {
    console.error("[server] startServer() called more than once");
    process.exit(1);
  }

  hasStarted = true;

  try {
    await connectDB();
    registerProcessHandlers();

    server = app.listen(PORT, () => {
      console.log(`[server] Server running on port ${PORT}`);
    });

    server.once("error", (error: NodeJS.ErrnoException) => {
      console.error("[server] Server error", {
        message: error.message,
        code: error.code,
        stack: error.stack,
      });
      process.exit(1);
    });
  } catch (error) {
    const err = error as Error;

    console.error("[server] Failed to start server", {
      message: err.message,
      stack: err.stack,
    });
    process.exit(1);
  }
}

void startServer();
