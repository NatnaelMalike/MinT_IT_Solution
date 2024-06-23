import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";
import { useTechnicianContext } from "./useTechnicianContext";

export const useSignup = () => {

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();
    // const {dispatch: techDispatch}= useTechnicianContext()
    const signup =  async(data) => {
        setIsLoading(true);
        await axios
            .post(`http://localhost:4000/api/user`, data)
            .then((res) => {
                console.log(res.data)
                localStorage.setItem("user", JSON.stringify(res.data))
                dispatch({ type: 'LOGIN', payload: res.data.token });
                // techDispatch({ type: action, payload: res.data.populatedUser });
                setIsLoading(false)
            })
            .catch((error) => {
                setIsLoading(false)
                setError(error.response.data);
            });
    };
    return {signup, isLoading, error}
};
