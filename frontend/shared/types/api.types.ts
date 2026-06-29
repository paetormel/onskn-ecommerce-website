export type ApiResponse<T> = {
  success: boolean;
  data: T;
};

export type ApiErrorBody = {
  success?: boolean;
  message?: string;
  error?: string;
  errors?: {
    fieldErrors?: Record<string, string[]>;
    formErrors?: string[];
  };
};

export type CreateProductResponse = ApiResponse<{
  productId: string;
  message: string;
}>;
