import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import apiClient from "@/lib/publicApiClient";
import useAuthStore from "@/store/authStore";
import decodeToken from "@/lib/jwtDecode";
import authApiClient from "@/lib/authApiClient";

export const useLogin = () => {
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data) => {
      const response = await authApiClient.post("/auth/signin", data);
      return response.data;
    },
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken);
      const decodedToken = decodeToken(data.accessToken);
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
