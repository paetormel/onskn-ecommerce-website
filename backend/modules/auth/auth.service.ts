import { query } from "../../config/db.js";
import type {
  AuthUser,
  CreateUserInput,
  GoogleProfileInput,
} from "./auth.types.js";

const userSelectFields = `
  id,
  full_name AS "fullName",
  email,
  password_hash AS "passwordHash",
  provider,
  google_id AS "googleId",
  avatar_url AS "avatarUrl",
  role,
  status,
  email_verified_at AS "emailVerifiedAt",
  deleted_at AS "deletedAt",
  created_at AS "createdAt"
`;

const authUserWhereActive = `
  WHERE email = $1
    AND deleted_at IS NULL
`;

const mapAuthUser = (row: unknown): AuthUser => row as AuthUser;

const findById = async (id: string): Promise<AuthUser | null> => {
  const sql = `
    SELECT ${userSelectFields}
    FROM users
    WHERE id = $1
      AND deleted_at IS NULL
    LIMIT 1
  `;

  const result = await query(sql, [id]);
  return mapAuthUser(result.rows[0]) ?? null;
};

const findByEmail = async (email: string): Promise<AuthUser | null> => {
  const sql = `
    SELECT ${userSelectFields}
    FROM users
    ${authUserWhereActive}
    LIMIT 1
  `;

  const result = await query(sql, [email]);
  return mapAuthUser(result.rows[0]) ?? null;
};

const findByGoogleId = async (googleId: string): Promise<AuthUser | null> => {
  const sql = `
    SELECT ${userSelectFields}
    FROM users
    WHERE google_id = $1
      AND deleted_at IS NULL
    LIMIT 1
  `;

  const result = await query(sql, [googleId]);
  return mapAuthUser(result.rows[0]) ?? null;
};

const createUser = async ({
  fullName,
  email,
  passwordHash,
  role = "customer",
  status = "active",
  provider = "local",
  googleId = null,
  avatarUrl = null,
  emailVerifiedAt = null,
}: CreateUserInput): Promise<AuthUser> => {
  const sql = `
    INSERT INTO users (
      full_name,
      email,
      password_hash,
      provider,
      google_id,
      avatar_url,
      email_verified_at,
      role,
      status
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING ${userSelectFields}
  `;

  const result = await query(sql, [
    fullName,
    email,
    passwordHash ?? null,
    provider,
    googleId,
    avatarUrl,
    emailVerifiedAt,
    role,
    status,
  ]);

  return mapAuthUser(result.rows[0]);
};

const createGoogleUser = async (profile: GoogleProfileInput): Promise<AuthUser> => {
  return createUser({
    fullName: profile.fullName,
    email: profile.email,
    passwordHash: null,
    provider: "google",
    googleId: profile.googleId,
    avatarUrl: profile.avatarUrl ?? null,
    emailVerifiedAt: profile.emailVerifiedAt ?? null,
  });
};

const linkGoogleAccount = async (
  userId: string,
  profile: GoogleProfileInput
): Promise<AuthUser> => {
  const sql = `
    UPDATE users
    SET
      provider = 'google',
      google_id = $2,
      avatar_url = COALESCE($3, avatar_url),
      email_verified_at = COALESCE($4, email_verified_at),
      full_name = COALESCE(NULLIF(full_name, ''), $5),
      updated_at = NOW()
    WHERE id = $1
      AND deleted_at IS NULL
    RETURNING ${userSelectFields}
  `;

  const result = await query(sql, [
    userId,
    profile.googleId,
    profile.avatarUrl ?? null,
    profile.emailVerifiedAt ?? null,
    profile.fullName,
  ]);

  return mapAuthUser(result.rows[0]);
};

const updateGoogleAccountByEmail = async (
  email: string,
  profile: GoogleProfileInput
): Promise<AuthUser> => {
  const sql = `
    UPDATE users
    SET
      provider = 'google',
      google_id = $2,
      avatar_url = COALESCE($3, avatar_url),
      email_verified_at = COALESCE($4, email_verified_at),
      full_name = COALESCE(NULLIF(full_name, ''), $5),
      updated_at = NOW()
    WHERE email = $1
      AND deleted_at IS NULL
    RETURNING ${userSelectFields}
  `;

  const result = await query(sql, [
    email,
    profile.googleId,
    profile.avatarUrl ?? null,
    profile.emailVerifiedAt ?? null,
    profile.fullName,
  ]);

  return mapAuthUser(result.rows[0]);
};

const authService = {
  findByEmail,
  findByGoogleId,
  findById,
  createUser,
  createGoogleUser,
  linkGoogleAccount,
  updateGoogleAccountByEmail,
};

export default authService;
