import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createFullProduct, fetchProducts } from "~/features/products/api/productsApi";
import type { CreateProductInput } from "~/features/products/types/product.types";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateProductInput) => createFullProduct(payload),
    onSuccess: async () => {
      toast.success("Product created successfully");
      await queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Failed to create product");
    },
  });
}
