import { useEffect, useState } from "react";
import axios from "axios";
import UserHeader from "./UserHeader";
import UserCard from "../AdminLayout/admin_components/User/user_components/UserCard";

const UserMain = () => {
    const [user, setUser] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:4000/api/user")
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <div className="flex flex-col grow">
            <UserHeader />
            <div className="grow" id="main">
                <UserCard user={user} />
            </div>
        </div>
    );
};

export default UserMain;
