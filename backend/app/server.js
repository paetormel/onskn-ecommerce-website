import app from "./app.js";
import { connectDB, closeDB } from "../config/db.js";

const PORT = Number(process.env.PORT ?? 5000);

let server = null;
let isShuttingDown = false;
let hasStarted = false;

async function shutdown(signal) {
  if (isShuttingDown) return;
  isShuttingDown = true;

  console.log(`[server] Received ${signal}. Starting graceful shutdown`);

  const forceShutdownTimer = setTimeout(() => {
    console.error("[server] Forced shutdown after timeout");
    process.exit(1);
  }, 10000);

  try {
    if (server) {
      await new Promise((resolve, reject) => {
        server.close((err) => {
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
    console.error("[server] Shutdown failed", {
      message: error.message,
      stack: error.stack,
    });
    process.exit(1);
  }
}

function registerProcessHandlers() {
  process.once("SIGTERM", () => shutdown("SIGTERM"));
  process.once("SIGINT", () => shutdown("SIGINT"));
}

async function startServer() {
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

    server.once("error", (error) => {
      console.error("[server] Server error", {
        message: error.message,
        code: error.code,
        stack: error.stack,
      });
      process.exit(1);
    });
  } catch (error) {
    console.error("[server] Failed to start server", {
      message: error.message,
      stack: error.stack,
    });
    process.exit(1);
  }
}

startServer();