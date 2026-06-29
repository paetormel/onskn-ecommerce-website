import { useQuery } from "@tanstack/react-query";
import { authMe } from "~/features/auth/api/authApi";
import type { AuthUser } from "~/features/auth/types/auth.type";

export const useUser = () => {
  return useQuery<AuthUser, Error>({
    queryKey: ["user"],
    queryFn: authMe,
    staleTime: 1000 * 60 * 5,
  });
};

export default useUser;
