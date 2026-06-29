import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import authService from "./auth.service.js";
import { signAccessToken } from "./auth.token.js";
import {
  googleAuthSchema,
  loginSchema,
  registerSchema,
} from "./auth.validation.js";
import { env } from "../../config/env.js";
import type { GoogleProfileInput } from "./auth.types.js";

const isProduction = env.NODE_ENV === "production";

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? ("strict" as const) : ("lax" as const),
  maxAge: 15 * 60 * 1000,
};

type GoogleTokenInfo = {
  aud?: string;
  email?: string;
  email_verified?: string | boolean;
  name?: string;
  picture?: string;
  sub?: string;
  iss?: string;
};

async function verifyGoogleCredential(credential: string): Promise<GoogleProfileInput> {
  if (!env.GOOGLE_CLIENT_ID) {
    throw new Error("Google client id is not configured");
  }

  const response = await fetch(
    `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`
  );

  if (!response.ok) {
    throw new Error("Invalid Google credential");
  }

  const payload = (await response.json()) as GoogleTokenInfo;

  if (payload.aud !== env.GOOGLE_CLIENT_ID) {
    throw new Error("Google credential audience mismatch");
  }

  if (!payload.sub || !payload.email) {
    throw new Error("Incomplete Google profile");
  }

  const emailVerified =
    payload.email_verified === true || payload.email_verified === "true";

  if (!emailVerified) {
    throw new Error("Google email is not verified");
  }

  return {
    googleId: payload.sub,
    email: payload.email.toLowerCase().trim(),
    fullName: payload.name?.trim() || payload.email.split("@")[0] || "Google User",
    avatarUrl: payload.picture ?? null,
    emailVerifiedAt: new Date(),
  };
}

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const parsed = registerSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten(),
      });
      return;
    }

    let { fullName, email, password } = parsed.data;
    email = email.toLowerCase().trim();

    const existingUser = await authService.findByEmail(email);

    if (existingUser) {
      res.status(409).json({
        success: false,
        message: "Email already exists",
      });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await authService.createUser({
      fullName,
      email,
      passwordHash,
    });

    const accessToken = signAccessToken({
      id: user.id,
      role: user.role,
    });

    res.cookie("access_token", accessToken, cookieOptions);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    const err = error as Error;

    console.error("Register user error:", {
      message: err.message,
      stack: err.stack,
    });

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      error: parsed.error.flatten(),
    });
    return;
  }

  let { email, password } = parsed.data;
  email = email.toLowerCase().trim();

  const user = await authService.findByEmail(email);

  if (!user || !user.passwordHash) {
    res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
    return;
  }

  if (user.status !== "active") {
    res.status(403).json({
      success: false,
      message: "Account is not active",
    });
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
    return;
  }

  const accessToken = signAccessToken({
    id: user.id,
    role: user.role,
  });

  res.cookie("access_token", accessToken, cookieOptions);

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      status: user.status,
    },
  });
};

export const googleAuth = async (
  req: Request,
  res: Response
): Promise<void> => {
  const parsed = googleAuthSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      error: parsed.error.flatten(),
    });
    return;
  }

  try {
    const profile = await verifyGoogleCredential(parsed.data.credential);

    let user =
      (await authService.findByGoogleId(profile.googleId)) ??
      (await authService.findByEmail(profile.email));

    if (user && user.googleId !== profile.googleId) {
      user = await authService.updateGoogleAccountByEmail(profile.email, profile);
    } else if (user && user.googleId === profile.googleId) {
      user = await authService.linkGoogleAccount(user.id, profile);
    } else if (!user) {
      user = await authService.createGoogleUser(profile);
    }

    if (user.status !== "active") {
      res.status(403).json({
        success: false,
        message: "Account is not active",
      });
      return;
    }

    const accessToken = signAccessToken({
      id: user.id,
      role: user.role,
    });

    res.cookie("access_token", accessToken, cookieOptions);

    res.status(200).json({
      success: true,
      message: "Google authentication successful",
      data: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    const err = error as Error;

    console.error("Google auth error:", {
      message: err.message,
      stack: err.stack,
    });

    res.status(400).json({
      success: false,
      message: err.message || "Google authentication failed",
    });
  }
};

export const logout = async (_req: Request, res: Response): Promise<void> => {
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "strict" : "lax",
  });

  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};

export const meController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const user = req.user;

  if (!user) {
    res.status(401).json({
      success: false,
      message: "unauthorized",
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      status: user.status,
    },
  });
};
