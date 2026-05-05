import { withTransaction } from "../../config/db.js";
import {
  insertProduct,
  insertBatch,
  findAllProducts,
  findProductById
} from "./products.repository.js";

/**
 * MAPPERS (transform layer)
 */
const mapVariant = (productId, variant) => [
  productId,
  variant.size_label,
  variant.sku,
  variant.stock_quantity,
  variant.price_override ?? null
];

const mapImage = (productId, image) => [
  productId,
  image.url,
  image.alt_text ?? null,
  image.is_primary ?? false,
  image.display_order ?? 0
];

const mapDetail = (productId, detail) => [
  productId,
  detail.section_name,
  detail.content,
  detail.display_order ?? 0
];

/**
 * CREATE FULL PRODUCT
 */
export const createFullProduct = async (data) => {
  return withTransaction(async (client) => {

    const {
      variants = [],
      images = [],
      details = []
    } = data;

    // 1. insert product
    const productId = await insertProduct(client, data);

    if (!productId) {
      throw new Error("Product creation failed");
    }

    // 2. normalize
    const safeVariants = Array.isArray(variants) ? variants : [];
    const safeImages = Array.isArray(images) ? images : [];
    const safeDetails = Array.isArray(details) ? details : [];

    // 3. transform
    const variantRows = safeVariants.map(v => mapVariant(productId, v));
    const imageRows = safeImages.map(img => mapImage(productId, img));
    const detailRows = safeDetails.map(d => mapDetail(productId, d));

    // 4. persist (batch)
    await insertBatch(
      client,
      "product_variants",
      ["product_id", "size_label", "sku", "stock_quantity", "price_override"],
      variantRows
    );

    await insertBatch(
      client,
      "product_images",
      ["product_id", "url", "alt_text", "is_primary", "display_order"],
      imageRows
    );

    await insertBatch(
      client,
      "product_details",
      ["product_id", "section_name", "content", "display_order"],
      detailRows
    );

    return {
      productId,
      message: "Product created successfully"
    };
  });
};

/**
 * GET ALL PRODUCTS
 */
export const getProducts = async () => {
  return await findAllProducts();
};

/**
 * GET PRODUCT BY ID
 */
export const getProductById = async (id) => {
  return await findProductById(id);
};