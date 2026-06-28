import prisma from "../../src/lib/prisma.js";
import type { Prisma } from "../../prisma/generated/client/client.js";
import type { CreateProductInput } from "./products.types.js";
import { normalizeCreateProductInput } from "./products.mapper.js";

const productListSelect = {
  id: true,
  name: true,
  slug: true,
  isActive: true,
  variants: {
    select: {
      sizeLabel: true,
      price: true,
      compareAtPrice: true,
    },
    take: 1,
  },
  images: {
    select: {
      url: true,
      type: true,
    },
  },
} satisfies Prisma.ProductSelect;

export type ProductListItem = Prisma.ProductGetPayload<{
  select: typeof productListSelect;
}>;

export const createProduct = async (data: CreateProductInput) => {
  const normalized = normalizeCreateProductInput(data);

  return prisma.product.create({
    data: {
      name: normalized.name,
      slug: normalized.slug,
      categoryId: normalized.categoryId,
      texture: normalized.texture ?? null,
      baseDescription: normalized.baseDescription,
      isActive: normalized.isActive,
      variants: {
        create: (normalized.variants ?? []).map((variant) => ({
          sizeLabel: variant.sizeLabel,
          sku: variant.sku,
          price: variant.price,
          compareAtPrice: variant.compareAtPrice ?? null,
          stock: variant.stock ?? 0,
        })),
      },
      images: {
        create: (normalized.images ?? []).map((image) => ({
          url: image.url,
          type: image.type,
        })),
      },
      sections: {
        create: (normalized.sections ?? []).map((section) => ({
          type: section.type,
          title: section.title ?? null,
          content: section.content,
          order: section.order ?? 0,
        })),
      },
      skinTypes: {
        create: (normalized.skin_types ?? []).map((name) => ({
          skinType: {
            connectOrCreate: {
              where: { name },
              create: { name },
            },
          },
        })),
      },
    },
  });
};

export const findAllProducts = async (): Promise<ProductListItem[]> => {
  return prisma.product.findMany({
    select: productListSelect,
    orderBy: { createdAt: "desc" },
  });
};

export const findProductById = async (slug: string) => {
  return prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      variants: true,
      images: true,
      sections: {
        orderBy: { order: "asc" },
      },
      skinTypes: {
        include: { skinType: true },
      },
    },
  });
};
