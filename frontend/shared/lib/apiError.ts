import axios from "axios";
import type { ApiErrorBody } from "~/shared/types/api.types";

export function extractApiErrorMessage(
  error: unknown,
  fallback = "Something went wrong"
): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as ApiErrorBody | undefined;

    if (data?.message && data.message !== "Validation failed") {
      return data.message;
    }
    if (data?.error) return data.error;

    const fieldErrors = data?.errors?.fieldErrors;
    if (fieldErrors) {
      const messages = Object.values(fieldErrors).flat();
      if (messages[0]) return messages[0];
    }

    const formErrors = data?.errors?.formErrors;
    if (formErrors?.[0]) return formErrors[0];

    if (data?.message) return data.message;

    return error.message;
  }

  if (error instanceof Error) return error.message;
  return fallback;
}
