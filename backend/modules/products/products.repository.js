import { pool } from "../../config/db.js";

/**
 * Insert product
 */
export const insertProduct = async (client, data) => {
  const {
    name,
    sku,
    slug,
    description,
    long_description,
    base_price,
    compare_at_price,
    texture,
    skin_types
  } = data;

  const result = await client.query(
    `
    INSERT INTO products (
      name, sku, slug, description, long_description,
      base_price, compare_at_price, texture, skin_types
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    RETURNING product_id
    `,
    [
      name,
      sku,
      slug,
      description,
      long_description,
      base_price,
      compare_at_price,
      texture,
      skin_types
    ]
  );

  return result.rows[0]?.product_id;
};

/**
 * Generic batch insert
 */
export const insertBatch = async (client, table, columns, rows) => {
  if (!Array.isArray(rows) || rows.length === 0) return;

  const values = [];
  let index = 1;

  const placeholders = rows.map(row => {
    const rowPlaceholders = row.map(() => `$${index++}`);
    values.push(...row);
    return `(${rowPlaceholders.join(", ")})`;
  }).join(", ");

  const sql = `
    INSERT INTO ${table} (${columns.join(", ")})
    VALUES ${placeholders}
  `;

  await client.query(sql, values);
};

/**
 * Queries
 */
export const findAllProducts = async () => {
  const { rows } = await pool.query(`
    SELECT 
      p.*,
      primary_image.url AS primary_image_url,
      COALESCE(hover_image.url, primary_image.url) AS hover_image_url
    FROM products p
    LEFT JOIN LATERAL (
      SELECT pi.url
      FROM product_images pi
      WHERE pi.product_id = p.product_id
      ORDER BY pi.is_primary DESC, pi.display_order ASC
      LIMIT 1
      ) primary_image ON TRUE
    LEFT JOIN LATERAL (
      SELECT pi.url
      FROM product_images pi
      WHERE pi.product_id = p.product_id
      ORDER BY pi.is_primary ASC, pi.display_order ASC
      LIMIT 1
      ) hover_image ON TRUE
  `);
  return rows;
};

export const findProductById = async (id) => {
  const { rows } = await pool.query(
    `SELECT * FROM products WHERE product_id = $1`,
    [id]
  );
  return rows[0] ?? null;
};

// export const findBestSellers = async (limit = 10) => {
//   const { rows } = await pool.query(`
//     SELECT 
//      p.name AS product_name,
//      p.base_price,
//      p.compare_at_price,
//      pi.url AS primary_image_url,
//      pi.display_order,
//     SUM(oi.quantity) AS total_sold
// }
