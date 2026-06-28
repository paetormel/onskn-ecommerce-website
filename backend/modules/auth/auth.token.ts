import jwt, { type SignOptions } from "jsonwebtoken";
import { env } from "../../config/env.js";
import type { AccessTokenPayload, AuthUser } from "./auth.types.js";

const signOptions: SignOptions = {
  expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
  issuer: "ecommerce-api",
  audience: "ecommerce-client",
};

export const signAccessToken = (user: Pick<AuthUser, "id" | "role">): string => {
  return jwt.sign(
    {
      sub: String(user.id),
      role: user.role,
    },
    env.JWT_SECRET,
    signOptions
  );
};

export const verifyAccessToken = (token: string): AccessTokenPayload => {
  const payload = jwt.verify(token, env.JWT_SECRET, {
    issuer: "ecommerce-api",
    audience: "ecommerce-client",
  });

  if (typeof payload === "string") {
    throw new Error("Invalid token payload");
  }

  return payload as AccessTokenPayload;
};
