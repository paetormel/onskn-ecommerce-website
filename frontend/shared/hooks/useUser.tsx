import { useQuery } from "@tanstack/react-query";
import { authMe } from "~/features/auth/api/authApi";

interface User{
    id: number;
    fullName: string;
    email: string;
    role: string;
    status: boolean;
}

export  const useUser = () => {
    return useQuery<User, Error>({
        queryKey: ["user"],
        queryFn: authMe,
        staleTime: 1000 * 60 * 5, // 5 minutes cache
    })
} 

export default useUser;