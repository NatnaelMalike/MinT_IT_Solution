import { useState, useEffect } from "react";
import UserTable from "./user_components/UserTable";
import axios from "axios";
import { useUsersContext } from "@/hooks/useUsersContext";
import EntityTable from "@/components/EntityTable";
import { usersConfig } from "@/config/tables";
const UserMain = () => {
    const {users, dispatch} = useUsersContext()
    !users && useEffect(() => {
        axios
            .get("http://localhost:4000/api/user")
            .then((response) => {
                dispatch({type: "SET_USERS", payload: response.data})
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <div className="flex flex-col grow gap-8">
            <EntityTable entities={users} config={usersConfig}/>
        </div>
    );
};

export default UserMain;
