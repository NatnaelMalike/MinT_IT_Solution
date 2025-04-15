import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";

export const useSignup = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data) => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      await apiClient.post(`/auth/signup${token ? `?token=${token}` : ''}`, data);

    },
    onSuccess: (data) => {
      navigate("/");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "An error occurred during login";
      throw new Error(errorMessage);
    },
  });
};
