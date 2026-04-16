import helmet from "helmet";

/**
 * Security headers middleware for the Express app.
 *
 * Responsibility:
 * - applies Helmet's default security headers
 * - customizes the referrer policy for a practical privacy and compatibility balance
 *
 * Usage:
 * - register once near the top of the middleware stack
 * - example: app.use(securityMiddleware)
 *
 * Important notes:
 * - `strict-origin-when-cross-origin` keeps full referrer data for same-origin requests
 *   and sends only the origin for cross-origin requests
 * - this is a good default for most apps because it improves privacy without breaking
 *   analytics, debugging, or common third-party integrations as often as `no-referrer`
 */
export const securityMiddleware = helmet({
  referrerPolicy: { policy: "strict-origin-when-cross-origin" },
});