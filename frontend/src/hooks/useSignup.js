import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


export const useSignup = () => {
    const navigate = useNavigate()
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();
    const signup =  (data) => {
        setIsLoading(true);
         axios
            .post(`http://localhost:4000/api/user`, data)
            .then((res) => {
                localStorage.setItem("token", JSON.stringify(res.data))
                dispatch({ type: 'LOGIN', payload: res.data.token });
                setIsLoading(false)
                toast.success("User Registered Successfully!")
                navigate('/')
            })
            .catch((error) => {
                setIsLoading(false)
                setError(error.response.data.message);
            });
    };
    return {signup, isLoading, error}
};
