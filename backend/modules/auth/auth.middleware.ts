import type { NextFunction, Request, Response } from "express";
import authService from "./auth.service.js";
import { verifyAccessToken } from "./auth.token.js";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        message: "Missing or invalid authorization header",
      });
      return;
    }

    const [scheme, token] = authorization.split(" ");

    if (scheme !== "Bearer" || !token) {
      res.status(401).json({ message: "Invalid authorization header" });
      return;
    }

    const payload = verifyAccessToken(token);

    req.auth = {
      userId: payload.sub,
      role: payload.role,
    };

    next();
  } catch {
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const cookieToken = req.cookies?.access_token as string | undefined;
  const header = req.headers.authorization;
  const bearerToken =
    header && header.startsWith("Bearer ") ? header.slice(7).trim() : null;
  const token = cookieToken || bearerToken;

  if (!token) {
    res.status(401).json({ success: false, message: "Unauthorized" });
    return;
  }

  try {
    const decoded = verifyAccessToken(token);
    const user = await authService.findById(decoded.sub);
    req.user = user;
    next();
  } catch {
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};
