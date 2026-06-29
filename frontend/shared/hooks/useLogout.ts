import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutRequest } from "~/features/auth/api/authApi";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutRequest,

    onSuccess: async () => {
      queryClient.setQueryData(["user"], null);

      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};
