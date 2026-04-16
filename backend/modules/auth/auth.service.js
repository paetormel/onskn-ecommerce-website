import { query } from '../../config/db.js';

const findByEmail = async (email) => {
  const sql = `
    SELECT id, full_name AS "fullName", email, password_hash AS "passwordHash", role, status
    FROM users
    WHERE email = $1
      AND deleted_at IS NULL
    LIMIT 1
  `;

  const result = await query(sql, [email]);
  return result.rows[0] ?? null;
};

const createUser = async ({ fullName, email, passwordHash }) => {
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
  return result.rows[0];
};

const authService = {
  findByEmail,
  createUser,
};

export default authService;
