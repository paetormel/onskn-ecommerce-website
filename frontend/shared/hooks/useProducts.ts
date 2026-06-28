import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "~/features/products/api/productsApi";
import type { ProductRecord } from "~/features/products/types/product.types";

function normalizeProduct(product: ProductRecord): ProductRecord {
  return {
    id: product.id,
    name: product.name,
    isActive: product.isActive,
    price: Number(product.price ?? 0),
    compareAtPrice:
      product.compareAtPrice != null
        ? Number(product.compareAtPrice)
        : null,
    sizeLabel: product.sizeLabel ?? "100ml",
    primaryImage: product.primaryImage ?? "",
    hoverImage: product.hoverImage ?? "",
  };
}

export function useProducts() {
  return useQuery<ProductRecord[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetchProducts();
      return res.map(normalizeProduct);
    },
    staleTime: 1000 * 60 * 5,
  });
}
