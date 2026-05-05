import axios from "axios";
import type { CreateProductInput, ProductRecord } from "~/features/products/types/product.types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api";

type ProductsResponse = {
  success: boolean;
  data: ProductRecord[];
};

type CreateProductResponse = {
  success: boolean;
  data: {
    productId: number;
    message: string;
  };
};

export async function fetchProducts(): Promise<ProductRecord[]> {
  const response = await axios.get<ProductsResponse>(`${API_BASE_URL}/v1/products`);
  return response.data.data ?? [];
}

export async function createFullProduct(payload: CreateProductInput): Promise<number> {
  try {
    const formData = new FormData();
    formData.append("name", payload.name);
    formData.append("sku", payload.sku);
    formData.append("slug", payload.slug);
    formData.append("description", payload.description);
    formData.append("long_description", payload.longDescription);
    formData.append("base_price", String(payload.basePrice));
    formData.append("compare_at_price", String(payload.compareAtPrice ?? payload.basePrice));
    formData.append("texture", payload.texture ?? "");
    formData.append("skin_types", payload.skinTypes ?? "");
    formData.append(
      "variants",
      JSON.stringify([
        {
          size_label: payload.sizeLabel ?? "100ml",
          sku: `${payload.sku}-STD`,
          stock_quantity: 20,
          price_override: null,
        },
      ]),
    );
    formData.append(
      "details",
      JSON.stringify([
        {
          section_name: "Overview",
          content: payload.description,
          display_order: 0,
        },
      ]),
    );
    formData.append("images", payload.primaryImageFile);
    if (payload.hoverImageFile) {
      formData.append("images", payload.hoverImageFile);
    }

    const response = await axios.post<CreateProductResponse>(`${API_BASE_URL}/v1/products`, formData);
    return response.data.data.productId;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        (error.response?.data as { message?: string } | undefined)?.message ??
        (error.response?.data as { error?: string } | undefined)?.error ??
        error.message;
      throw new Error(message || "Failed to create product");
    }

    throw new Error("Failed to create product");
  }
}
