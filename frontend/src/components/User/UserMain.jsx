import { useEffect, useState } from "react";
import axios from "axios";
import AdminTable from "./AdminTable";
import AdminHeader from "./AdminHeader";
const UserMain = () => {
    const [user, setUser] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:4000/api/user")
            .then((response) => {
                setAdmins((response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <div className="flex flex-col grow">
            <AdminHeader />
            <div className="grow" id="main">
                <AdminTable admins={admins}/>
            </div>
        </div>
    );
};

export default UserMain;
