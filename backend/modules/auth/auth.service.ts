import { query } from "../../config/db.js";
import type { AuthUser, CreateUserInput } from "./auth.types.js";

const findById = async (id: string): Promise<AuthUser | null> => {
  const sql = `
    SELECT id, full_name AS "fullName", email, role, status
    FROM users
    WHERE id = $1
    LIMIT 1
  `;

  const result = await query(sql, [id]);
  return (result.rows[0] as AuthUser | undefined) ?? null;
};

const findByEmail = async (email: string): Promise<AuthUser | null> => {
  const sql = `
    SELECT id, full_name AS "fullName", email, password_hash AS "passwordHash", role, status
    FROM users
    WHERE email = $1
      AND deleted_at IS NULL
    LIMIT 1
  `;

  const result = await query(sql, [email]);
  return (result.rows[0] as AuthUser | undefined) ?? null;
};

const createUser = async ({
  fullName,
  email,
  passwordHash,
}: CreateUserInput): Promise<AuthUser> => {
  const sql = `
    INSERT INTO users (
      full_name,
      email,
      password_hash
    )
    VALUES ($1, $2, $3)
    RETURNING id, full_name AS "fullName", email, role, status, created_at AS "createdAt"
  `;

  const result = await query(sql, [fullName, email, passwordHash]);
  return result.rows[0] as AuthUser;
};

const authService = {
  findByEmail,
  findById,
  createUser,
};

export default authService;
