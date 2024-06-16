import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";
import { useTechnicianContext } from "./useTechnicianContext";

export const useSignup = () => {

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();
    const {dispatch: techDispatch}= useTechnicianContext()
    const signup =  (data, type, action) => {
        setIsLoading(true);
         axios
            .post(`http://localhost:4000/api/${type}`, data)
            .then((res) => {
                console.log(res.data)
                localStorage.setItem("user", JSON.stringify(res.data))
                dispatch({ type: 'LOGIN', payload: res.data.token });
                techDispatch({ type: action, payload: res.data.populatedUser });
                setIsLoading(false)
            })
            .catch((error) => {
                setIsLoading(false)
                setError(error.response.data.message);
            });
    };
    return {signup, isLoading, error}
};
