import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import decodeToken from "@/lib/jwtDecode";
import apiClient from "@/lib/apiClient";

export const useLogin = () => {
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data) => {
      const response = await apiClient.post("/auth/signin", data);
      return response.data;
    },
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      const decodedToken = decodeToken(data.token);
      const role = decodedToken?.role;

      switch (role) {
        case "NormalUser":
          navigate("/user");
          break;
        case "TechnicianUser":
          navigate("/technician");
          break;
        case "HelperAdmin":
          navigate("/helper_desk/dashboard");
          break;
        case "SuperAdmin":
          navigate("/admin/dashboard");
          break;
        default:
          navigate("/");
          break;
      }
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "An error occurred during login";
      throw new Error(errorMessage);
    },
  });
};
