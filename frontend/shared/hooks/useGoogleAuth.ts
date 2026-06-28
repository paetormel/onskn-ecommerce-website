import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  googleAuthRequest,
  type GoogleAuthPayload,
} from "~/features/auth/api/authApi";

export const useGoogleAuth = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: GoogleAuthPayload) => googleAuthRequest(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};

export default useGoogleAuth;
