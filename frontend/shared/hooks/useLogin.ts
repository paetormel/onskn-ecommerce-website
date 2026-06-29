import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginRequest } from "~/features/auth/api/authApi";
import type { LoginPayload } from "~/features/auth/types/auth.type";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginPayload) => loginRequest(data),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      
    },
  });
};
