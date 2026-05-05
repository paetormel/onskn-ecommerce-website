import authService from "./auth.service.js";
import bcrypt from "bcrypt";
import { signAccessToken } from "./auth.token.js";
import { loginSchema, registerSchema } from "./auth.validation.js";

const isProduction = process.env.NODE_ENV === "production";

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "strict" : "lax",
  maxAge: 15 * 60 * 1000,
};

export const registerUser = async (req, res) => {
  try {
    const parsed = registerSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten()
      });
    }

    let { fullName, email, password } = parsed.data;

    // 🔐 normalize email
    email = email.toLowerCase().trim();

    const existingUser = await authService.findByEmail(email);

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already exists"
      });
    }

    // 🔒 hash password
    const passwordHash = await bcrypt.hash(password, 12);

    const user = await authService.createUser({
      fullName,
      email,
      passwordHash,
      role: "customer",
      status: "active"
    });

    // 🔥 AUTO LOGIN (important UX)
    const accessToken = signAccessToken({
      id: user.id,
      role: user.role
    });

    res.cookie("access_token", accessToken, cookieOptions);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user.id,
        fullName: user.full_name ?? user.fullName,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Register user error:", {
      message: error.message,
      stack: error.stack
    });

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

export const login = async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      error: parsed.error.flatten()
    });
  }

  const { email, password } = parsed.data;

  const user = await authService.findByEmail(email);

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password"
    });
  }

  if (user.status !== "active") {
    return res.status(403).json({
      success: false,
      message: "Account is not active"
    });
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!isPasswordValid) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password"
    });
  }

  // 🔐 generate token
  const accessToken = signAccessToken({
    id: user.id,
    role: user.role
  });

  // 🍪 SET COOKIE (IMPORTANT)
  res.cookie("access_token", accessToken, cookieOptions);

  // ✅ DO NOT send token in body
  return res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      id: user.id,
      fullName: user.full_name,
      email: user.email,
      role: user.role,
      status: user.status
    }
  });
};

export const logout = async (req, res) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "strict" : "lax"
  });

  return res.status(200).json({
    success: true,
    message: "Logout successful"
  });
};

export const meController = async(req, res) => {
  const user = req.user

  if(!user){
    return res.statuc(401).json({
      success: false,
      message: "unauthorized"
    })
  }

  return res.status(200).json({
    success: true,
    data: {
      email: user.email,
      role: user.role
    }
  })
}

export default registerUser;
