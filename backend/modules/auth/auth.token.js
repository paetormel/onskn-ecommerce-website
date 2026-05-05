import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? "15m";

export const signAccessToken = (user) => {
  return jwt.sign(
    {
      sub: String(user.id),
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_IN,
      issuer: "ecommerce-api",
      audience: "ecommerce-client",
    }
  );
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, JWT_SECRET, {
    issuer: "ecommerce-api",
    audience: "ecommerce-client",
  });
};