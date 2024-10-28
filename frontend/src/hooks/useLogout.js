import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import { useRequestContext } from "./useRequestContext";
export const useLogout = () => {
const navigate = useNavigate();
    const { dispatch } = useAuthContext();
    const { dispatch:  dispatchRequest } = useRequestContext();


    const logout = () => {
        localStorage.removeItem("token");
        dispatch({ type: "LOGOUT" });
        dispatchRequest({ type: 'CLEAR_REQUESTS' });
        navigate('/')

    };
    return {logout}
};
