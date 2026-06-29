import helmet from "helmet";

export const securityMiddleware = helmet({
  referrerPolicy: { policy: "strict-origin-when-cross-origin" },
});
