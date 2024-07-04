import { Toaster } from "@/components/ui/sonner";
import Aside from "../../Layouts/Technician/Aside";
import Main from "../../Layouts/Technician/Main";
import { useRequestContext } from "@/hooks/useRequestContext";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useEffect } from "react";
import axios from "axios";


const TechnicianHomepage = () => {
    const { token } = useAuthContext();
    const { dispatch } = useRequestContext();

    useEffect(() => {
        if (token) {
            axios
                .get("http://localhost:4000/api/assign_technician",{
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then((response) => {
                    dispatch({ type: 'SET_REQUESTS', payload: response.data });
                    console.log(response.data)
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [token]);
    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] bg-background">
        <Aside/>
        <Main />
        <Toaster/>
    </div>
    );
};

export default TechnicianHomepage;
