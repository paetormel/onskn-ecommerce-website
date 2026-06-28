import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
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

      if (!isProduction) {
        const devAllowedOrigins = [
          "http://localhost:5173",
          "http://127.0.0.1:5173",
        ];

        if (devAllowedOrigins.includes(origin)) {
          return callback(null, true);
        }

        return callback(new Error("CORS origin denied"));
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS origin denied"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

app.use(
  express.json({
    limit: "1mb",
    strict: true,
  })
);

app.use(cookieParser());

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/v1", routes);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

app.use(
  (
    error: Error & { status?: number },
    req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    const isJsonSyntaxError =
      error instanceof SyntaxError &&
      error.status === 400 &&
      "body" in error;

    if (isJsonSyntaxError) {
      res.status(400).json({
        message: "Invalid JSON payload",
      });
      return;
    }

    if (error.message === "CORS origin denied") {
      res.status(403).json({
        message: "Origin not allowed",
      });
      return;
    }

    console.error("[app] Unhandled error", {
      method: req.method,
      path: req.originalUrl,
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      message: "Internal server error",
    });
  }
);

export default app;
