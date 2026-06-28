import type { ProductRecord } from "~/features/products/types/product.types";
import { api } from "~/shared/lib/axios";

type ProductsResponse = {
  success: boolean;
  data: ProductRecord[];
};

export async function fetchProducts(): Promise<ProductRecord[]> {
  const response = await api.get<ProductsResponse>(`/products`);
  return response.data.data ?? [];
}
