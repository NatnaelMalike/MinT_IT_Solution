import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { jwtDecode } from "jwt-decode"; // Correct import

const ProtectedRoutes = ({ children, role }) => {
    const { token } = useAuthContext();

    if (!token) {
        return <Navigate to="/" />;
    }

    let decoded;
    try {
        decoded = jwtDecode(token);
    } catch (e) {
        console.error("Invalid token:", e);
        return <Navigate to="/" />;
    }

    if (decoded.role !== role) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default ProtectedRoutes;
