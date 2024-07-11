import { useEffect, useState } from "react";
import InfoCards from "./InfoCards";
import { useAuthContext } from "@/hooks/useAuthContext";
import axios from "axios";
const Dashboard = () => {
    const { token } = useAuthContext();
    const [data, setData] = useState(null)
    useEffect(() => {
        if (token) {
            axios
                .get("http://localhost:4000/api/dashboard", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then((response) => {
                    console.log(response.data)
                    setData(response.data)
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [token]);
    return (
        <div className="space-y-8">
            {data && <InfoCards data={data}/>}
        </div>
    );
};

export default Dashboard;
