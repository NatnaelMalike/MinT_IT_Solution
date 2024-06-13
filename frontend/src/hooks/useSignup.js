import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useSignup = () => {

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();
    const signup = async (data, type) => {
        setIsLoading(true);
        await axios
            .post(`http://localhost:4000/api/${type}`, data)
            .then((res) => {
                console.log(res.data)
                localStorage.setItem("user", JSON.stringify(res.data))
                dispatch({ type: "LOGIN", payload: res.data });
                setIsLoading(false)
            })
            .catch((error) => {
                setIsLoading(false)
                setError(error.response.data.message);
            });
    };
    return {signup, isLoading, error}
};
