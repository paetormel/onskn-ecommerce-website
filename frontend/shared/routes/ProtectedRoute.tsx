import { Navigate, useLocation } from "react-router";
import { useUser } from "~/features/auth/api/use-auth";

type Role = "admin" | "customer" ;

interface Props {
    children: React.ReactNode;
    allowedRoles: Role;
}

const ProtectedRoute = ({children, allowedRoles}: Props) => {
    const {data: user, isLoading, isError} = useUser();
    const location = useLocation();

    if(isLoading) {
        return <div>Loading...</div>
    }

    if(!user && isError) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }       

    if(allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" state={{ from: location }} replace />
    }
    return children;
}

export default ProtectedRoute;