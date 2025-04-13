import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import authApiClient from "@/lib/apiClient";
import decodeToken from "@/lib/jwtDecode";

const AuthProvider = ({ children }) => {
  const { setAuth, logout, token, user } = useAuthStore();
  const navigate = useNavigate();

  // ✅ Check token expiration on app load
  useEffect(() => {
    if (token) {
      const decodedToken = decodeToken(token);

      // Token expired? Clear Zustand store + Persistent Storage
      if (!decodedToken || decodedToken.exp * 1000 < Date.now()) {
        logout(); // Clears Zustand state
        localStorage.removeItem("auth-storage"); // Clear persisted token
        navigate("/");
      }else{
        handleNavigation(decodedToken.role);
      }
      
      
    }
  }, [token, logout, navigate]);

  // ✅ Fetch user data only if `token` is valid
  const { data: userData, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const response = await authApiClient.get("/user/me");
      return response.data;
    },
    enabled: !!token,
    retry: false,
    staleTime: Infinity,
    initialData: user ? { user } : undefined,
    onSuccess: (data) => {
      setAuth(data.user, token);
      handleNavigation(data.user.role);
    },
    onError: () => {
      logout();
      localStorage.removeItem("auth-storage"); // Clear token on error
      navigate("/");
    },
  });

  // ✅ Centralized navigation logic
  const handleNavigation = (role) => {
    const routes = {
      NormalUser: "/user",
      TechnicianUser: "/technician",
      HelperAdmin: "/helper_desk/dashboard",
      SuperAdmin: "/admin",
    };
    navigate(routes[role] || "/");
  };

  if (isLoading && token) return <div>Loading...</div>;

  return children;
};

export default AuthProvider;
