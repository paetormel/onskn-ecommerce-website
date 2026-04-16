import { verifyAccessToken } from "./auth.token.js";

export const requireAuth = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Missing or invalid authorization header",
      });
    }

    const [scheme, token] = authorization.split(" ");
    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({ message: "Invalid authorization header" });
    }
    const payload = verifyAccessToken(token);

    req.auth = {
        userId: payload.sub,
        email: payload.email,
        role: payload.role
    }

    return next();
  } catch (error) {
    return res.status(401).json({success: false, message: 'Invalid or expired token'})
  }
};
