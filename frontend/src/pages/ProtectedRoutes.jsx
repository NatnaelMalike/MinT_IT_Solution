import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Correct import
import useAuthStore from "@/store/authStore";

const ProtectedRoutes = ({ children, role }) => {
    const { token } = useAuthStore();

    if (!token) {
        return <Navigate to="/" />;
    }

    let decoded;
    try {
        decoded = jwtDecode(token);
    } catch (e) {
        // console.error("Invalid token:", e);
        return <Navigate to="/" />;
    }

    if (decoded.role !== role) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default ProtectedRoutes;
