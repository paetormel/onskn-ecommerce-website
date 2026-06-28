import axios from "axios";
import type { ProductFormValues } from "../pages/products/validation/product.validation";
import { api } from "~/shared/lib/axios";

type CreateProductResponse = {
  success: boolean;
  data: {
    productId: string;
    message: string;
  };
};

function buildCreateProductFormData(payload: ProductFormValues): FormData {
  const formData = new FormData();

  const variants = [
    {
      sizeLabel: payload.sizeLabel,
      sku: `${payload.slug}-SKU`,
      price: payload.price,
      compareAtPrice: payload.compareAtPrice ?? null,
      stock: payload.stock ?? 0,
    },
  ];

  formData.append("name", payload.name);
  formData.append("slug", payload.slug);
  formData.append("categoryId", payload.categoryId);
  formData.append("baseDescription", payload.baseDescription);
  formData.append("isActive", String(payload.isActive));
  formData.append("sku", `${payload.slug}-SKU`);
  formData.append("texture", payload.texture);
  formData.append("skin_types", JSON.stringify(payload.skinTypes ?? []));
  formData.append("sections", JSON.stringify(payload.sections ?? []));
  formData.append("variants", JSON.stringify(variants));

  const images: File[] = [];

  if (!(payload.primaryImage instanceof File)) {
    throw new Error("Primary image is required");
  }

  images.push(payload.primaryImage);

  if (payload.hoverImage instanceof File) {
    images.push(payload.hoverImage);
  } else {
    images.push(payload.primaryImage);
  }

  const galleryImages = [
    payload.galleryImage1,
    payload.galleryImage2,
    payload.galleryImage3,
  ].filter((file): file is File => file instanceof File);

  if (galleryImages.length !== 3) {
    throw new Error("All 3 gallery images are required");
  }

  images.push(...galleryImages);
  images.forEach((file) => formData.append("images", file));

  return formData;
}

function extractErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as
      | { message?: string; error?: string; errors?: { fieldErrors?: Record<string, string[]>; formErrors?: string[] } }
      | undefined;

    if (data?.message) return data.message;
    if (data?.error) return data.error;

    const fieldErrors = data?.errors?.fieldErrors;
    if (fieldErrors) {
      const firstFieldError = Object.values(fieldErrors).flat()[0];
      if (firstFieldError) return firstFieldError;
    }

    const formErrors = data?.errors?.formErrors;
    if (formErrors?.[0]) return formErrors[0];

    return error.message;
  }

  if (error instanceof Error) return error.message;
  return "Failed to create product";
}

export async function createProduct(
  payload: ProductFormValues
): Promise<string> {
  try {
    const formData = buildCreateProductFormData(payload);

    const response = await api.post<CreateProductResponse>(
      "/products",
      formData
    );

    return response.data.data.productId;
  } catch (error) {
    throw new Error(extractErrorMessage(error) || "Failed to create product");
  }
}

export type CategoryOption = {
  id: string;
  name: string;
};

export async function fetchCategories(): Promise<CategoryOption[]> {
  const response = await api.get<{ success: boolean; data: CategoryOption[] }>(
    "/categories"
  );
  return response.data.data ?? [];
}
