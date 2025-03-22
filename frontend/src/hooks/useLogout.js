import publicApiClient from "@/lib/publicApiClient";
import useAuthStore from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => publicApiClient.post("/auth/logout"),
    onSuccess: () => {
      logout();
      navigate("/");
    },
    onError: (error) => {
      console.error("Logout failed:", error.message);
      logout(); // Force logout
      navigate("/");
    },
  });
};
