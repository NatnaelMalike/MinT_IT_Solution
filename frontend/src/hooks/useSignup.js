import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";


export const useSignup = () => {
    const navigate = useNavigate()
    return useMutation({
        mutationFn: async(data)=>{
            await apiClient.post("/auth/signup", data)
        }
        ,
        onSuccess: (data) => {
            navigate('/')
        },
        onError: (error) => {
            const errorMessage =
              error.response?.data?.message || "An error occurred during login";
            throw new Error(errorMessage);
          },
    })
};
