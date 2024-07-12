import { Toaster } from "@/components/ui/sonner";
import Aside from "../../Layouts/User/Aside";
import Main from "../../Layouts/User/Main";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useRequestContext } from "@/hooks/useRequestContext";
import axios from "axios";
import { useEffect } from "react";

const UserHomepage = () => {
    const { token } = useAuthContext();
    const { dispatch } = useRequestContext();

    useEffect(() => {
        if (token) {
            axios
                .get("http://localhost:4000/api/request", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then((response) => {
                    dispatch({ type: 'SET_REQUESTS', payload: response.data });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [token]);
    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] bg-background overflow-hidden">
            <Aside />
            <Main />
            <Toaster />
        </div>
    );
};

export default UserHomepage;
