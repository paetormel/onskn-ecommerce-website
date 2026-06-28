import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import authService from "./auth.service.js";
import { signAccessToken } from "./auth.token.js";
import { loginSchema, registerSchema } from "./auth.validation.js";
import { env } from "../../config/env.js";

const isProduction = env.NODE_ENV === "production";

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? ("strict" as const) : ("lax" as const),
  maxAge: 15 * 60 * 1000,
};

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
