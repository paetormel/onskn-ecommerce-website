import axios from "axios";
import {
  ACCORDION_SECTION_FIELDS,
  type ProductFormValues,
} from "../pages/products/validation/product.validation";
import type { CategoryOption } from "~/features/products/types/product.types";
import type {
  ApiResponse,
  CreateProductResponse,
} from "~/shared/types/api.types";
import { extractApiErrorMessage } from "~/shared/lib/apiError";
import { api } from "~/shared/lib/axios";

function buildSectionsPayload(payload: ProductFormValues) {
  return ACCORDION_SECTION_FIELDS.flatMap((section) => {
    const content = payload[section.key]?.trim();
    if (!content) return [];

    return [
      {
        type: section.type,
        content,
        order: section.order,
      },
    ];
  });
}

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
  formData.append("sections", JSON.stringify(buildSectionsPayload(payload)));
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
  ].filter((file): file is File => file instanceof File);

  if (galleryImages.length !== 2) {
    throw new Error("Both gallery images are required");
  }

  images.push(...galleryImages);
  images.forEach((file) => formData.append("images", file));

  return formData;
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
    throw new Error(
      extractApiErrorMessage(error, "Failed to create product")
    );
  }
}

export type { CategoryOption };

export async function fetchCategories(): Promise<CategoryOption[]> {
  const response = await api.get<ApiResponse<CategoryOption[]>>("/categories");
  return response.data.data ?? [];
}
