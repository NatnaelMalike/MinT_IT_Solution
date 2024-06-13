import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();
    const login = async (data) => {
        setIsLoading(true);
        await axios
            .post("http://localhost:4000/api/login", data)
            .then((res) => {
                localStorage.setItem("token", res.data);
                dispatch({ type: "LOGIN", payload: res.data });
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
                setError(error.response.data.message);
            });
    };
    return { login, isLoading, error };
};
