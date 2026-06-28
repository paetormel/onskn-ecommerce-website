import { useQuery } from "@tanstack/react-query";
import { fetchProductBySlug } from "~/features/products/api/productsApi";
import type { ProductDetail } from "~/features/products/types/product.types";

export function useProduct(slug: string | undefined) {
  return useQuery<ProductDetail>({
    queryKey: ["product", slug],
    queryFn: () => fetchProductBySlug(slug!),
    enabled: Boolean(slug),
    staleTime: 1000 * 60 * 5,
  });
}
