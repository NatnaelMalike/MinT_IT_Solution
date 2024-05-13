import { useEffect, useState } from "react";
import axios from "axios";
import AdminTable from "./AdminTable";
import Header from "./Header";

const Main = () => {
    const [admins, setAdmins] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:4000/api/admin")
            .then((response) => {
                setAdmins((response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <div className="flex flex-col grow">
            <Header />
            <div className="grow" id="main">
                <AdminTable admins={admins}/>
            </div>
        </div>
    );
};

export default Main;
