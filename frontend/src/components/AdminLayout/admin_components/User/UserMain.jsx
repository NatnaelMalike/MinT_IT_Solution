import { useState, useEffect } from "react";
import axios from "axios";
import { useUsersContext } from "@/hooks/useUsersContext";
import EntityTable from "@/components/EntityTable";
import { usersConfig } from "@/config/tables";
const UserMain = () => {
    const {users, dispatch} = useUsersContext()
    const [loading, setLoading] = useState(false);

     useEffect(() => {
        setLoading(true)
        axios
            .get("http://localhost:4000/api/user")
            .then((response) => {
                dispatch({type: "SET_USERS", payload: response.data})
                setLoading(false)
            })
            .catch((error) => {
                console.log(error);
                setLoading(false)
            });
    }, []);
    return (
        <div className="flex flex-col grow gap-8">
            <EntityTable entities={users} loading={loading} config={usersConfig}/>
        </div>
    );
};

export default UserMain;
