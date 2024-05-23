import { useState, useEffect } from "react";
import UserTable from "./user_components/UserTable";
import axios from "axios";
const UserMain = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:4000/api/user")
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <div className="flex flex-col grow gap-8">
            <UserTable users={users} />
        </div>
    );
};

export default UserMain;
