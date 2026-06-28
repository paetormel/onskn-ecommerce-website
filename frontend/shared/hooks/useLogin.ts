import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginRequest, type LoginPayload } from "~/features/auth/api/authApi";

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
