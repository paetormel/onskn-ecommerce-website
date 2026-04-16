import express from "express";
import helmet from "helmet";
import cors from "cors";
import routes from "./routes.js";

const app = express();

const isProduction = process.env.NODE_ENV === "production";

const allowedOrigins = (process.env.CORS_ORIGIN ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

if (isProduction) {
  app.set("trust proxy", 1);
}

app.disable("x-powered-by");

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "same-site" },
    referrerPolicy: { policy: "no-referrer" },
  })
);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);

      if (!isProduction) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS origin denied"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,
    optionsSuccessStatus: 204,
  })
);

app.use(
  express.json({
    limit: "1mb",
    strict: true,
  })
);

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/v1", routes);

app.use((req, res) => {
  res.status(404).json({
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

app.use((error, req, res, _next) => {
  const isJsonSyntaxError =
    error instanceof SyntaxError &&
    error.status === 400 &&
    "body" in error;

  if (isJsonSyntaxError) {
    return res.status(400).json({
      message: "Invalid JSON payload",
    });
  }

  const isCorsError = error.message === "CORS origin denied";

  if (isCorsError) {
    return res.status(403).json({
      message: "Origin not allowed",
    });
  }

  console.error("[app] Unhandled error", {
    method: req.method,
    path: req.originalUrl,
    message: error.message,
    stack: error.stack,
  });

  return res.status(500).json({
    message: "Internal server error",
  });
});

export default app;