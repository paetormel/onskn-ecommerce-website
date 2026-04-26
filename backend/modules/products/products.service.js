const getProducts = async () => {   
    const sql = `
    SELECT id, name, description, price, created_at AS "createdAt", updated_at AS "updatedAt"
    FROM products
    WHERE deleted_at IS NULL
    ORDER BY created_at DESC
    `
    const result = await query(sql);
    return result.rows;
}

const getProductById = async (id) => {
    const sql = `
    SELECT id, name, description, price, created_at AS "createdAt", updated_at AS "updatedAt"
    FROM products
    WHERE id = $1`

    const result = await query(sql, [id]);
    return result.rows[0] ?? null;
} 

const productService = {
    getProducts,
    getProductById
}

export default productService;