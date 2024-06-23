// components/RoleBasedRedirect.js
import { useAuthContext } from "@/hooks/useAuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const RoleBasedRedirect = () => {
    const navigate = useNavigate();
    const { token } = useAuthContext();
    const decoded = jwtDecode(token);
    const role = decoded.role;
    console.log(role, "role")

    useEffect(() => {
        if (!role) {
            navigate("/");
        } else {
            switch (role) {
                case "helper_admin":
                    navigate("/helper_desk");
                    break;
                case "normal_user":
                    navigate("/user");
                    break;
                case "technician_user":
                    navigate("/technician");
                    break;
                case "super_admin":
                    navigate("/admin");
                    break;
                default:
                    navigate("/unauthorized");
                    break;
            }
        }
    }, [role, navigate]);

    return null; 
};

export default RoleBasedRedirect;
