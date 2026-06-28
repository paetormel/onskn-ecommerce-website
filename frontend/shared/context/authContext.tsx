import { createContext } from "react";
import useUser from "../hooks/useUser";
import {
 
  type LoginPayload,
} from "~/features/auth/api/authApi";
import { useLogin } from "../hooks/useLogin";
import { useLogout } from "../hooks/useLogout";

type AuthContextType = {
  user: ReturnType<typeof useUser>["data"] | null;
  isLoading: ReturnType<typeof useUser>["isLoading"];
  login: (data: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
  loginError: Error | null;
  isLoginError: boolean;
  isLoginLoading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: user = null, isLoading, refetch } = useUser();
  const loginMutation = useLogin();
  const logoutMutation = useLogout();

  const login = async (data: LoginPayload) => {
    await loginMutation.mutateAsync(data);
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        loginError: loginMutation.error,
        isLoginError: loginMutation.isError,
        isLoginLoading: loginMutation.isPending,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
