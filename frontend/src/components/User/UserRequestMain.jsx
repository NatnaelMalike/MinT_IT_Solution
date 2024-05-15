import { useEffect, useState } from "react";
import axios from "axios";
import UserHeader from "./UserHeader";
import UserCard from "./UserCard";
import UserTable from "./UserTable";

const UserRequestMain = () => {
    const [user, setUser] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:4000/api/user")
            .then((response) => {
                setUser((response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <div className="flex flex-col grow">
            <UserHeader />
            <div className="grow" id="main">
                <UserTable user={user}/>
            </div>
        </div>
    );
};

export default UserRequestMain;
