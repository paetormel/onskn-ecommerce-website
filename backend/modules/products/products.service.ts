import {
  createProduct,
  findAllProducts,
  findProductById,
} from "./products.repository.js";
import type { CreateProductInput, CreateProductResult } from "./products.types.js";
import type { ProductListItem } from "./products.repository.js";

export const createFullProduct = async (
  data: CreateProductInput
): Promise<CreateProductResult> => {
  const product = await createProduct(data);

  return {
    productId: product.id,
    message: "Product created successfully",
  };
};

export const getProducts = async (): Promise<ProductListItem[]> => {
  return findAllProducts();
};

export const getProductById = async (id: string) => {
  return findProductById(id);
};
