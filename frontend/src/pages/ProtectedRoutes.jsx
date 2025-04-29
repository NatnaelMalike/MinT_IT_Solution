import { Navigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";

// Accepts a single role or an array of roles
const ProtectedRoutes = ({ children, role }) => {
    const { token, user } = useAuthStore();

    if (!token || !user) {
        return <Navigate to="/" />;
    }

    // Allow role to be a string or array
    const allowedRoles = Array.isArray(role) ? role : [role];
    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default ProtectedRoutes;