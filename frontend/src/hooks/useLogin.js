import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();
    const navigate = useNavigate()
    const login = async (data) => {
        setIsLoading(true);
        await axios
            .post("http://localhost:4000/api/login", data)
            .then((res) => {
                localStorage.setItem("token", res.data);
                dispatch({ type: "LOGIN", payload: res.data});
                setIsLoading(false);
                navigate('/redirect')
            })
            .catch((error) => {
                setIsLoading(false);
                console.log(error)
                setError(error.response.data);
            });
    };
    return { login, isLoading, error };
};
