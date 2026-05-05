import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../shared/lib/axios";

// ✅ central query keys (IMPORTANT)
export const authKeys = {
  all: ["auth"] as const,
  user: () => [...authKeys.all, "user"] as const,
};

// 🔐 API layer (separate for reuse)
const getMe = async () => {
  const res = await api.get("/auth/me");
  return res.data.user;
};

const logoutRequest = async () => {
  await api.post("/auth/logout");
};

// 🔐 AUTH QUERY
export const useUser = () => {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: getMe,
    retry: false,
    staleTime: 1000 * 60 * 10, // 10 min
    gcTime: 1000 * 60 * 30, // cache retention
  });
};

// 🔓 LOGOUT MUTATION
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutRequest,

    onSuccess: () => {
      // ✅ only clear auth-related cache
      queryClient.setQueryData(authKeys.user(), null);

      // optional: invalidate instead of clear
      queryClient.invalidateQueries({ queryKey: authKeys.all });
    },
  });
};