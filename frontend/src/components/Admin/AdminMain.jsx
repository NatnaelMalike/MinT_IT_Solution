import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header";
import AddDialog from "../AddDialog";
import AdminForm from "./admin_components/AdminForm";
import { useAdminContext } from "@/hooks/useAdminContext";
import EntityTable from "../EntityTable";
import { adminConfig } from "@/config/tables";
const AdminMain = () => {
    const {admins, dispatch} = useAdminContext()
    const [loading, setLoading] = useState(false);

   useEffect(() => {
    setLoading(true)
        axios
            .get("http://localhost:4000/api/admin")
            .then((response) => {
               dispatch({type: "SET_ADMINS", payload: response.data})
               setLoading(false)
            })
            .catch((error) => {
                console.log(error);
                setLoading(false)
            });
    }, []);
    return (
        <div className="flex flex-col grow gap-8">
            <Header title="Manage Admins">
                <AddDialog entity="Admin">
                    <AdminForm />
                </AddDialog>
            </Header>
            <div className="grow" id="main">
                <EntityTable entities={admins} loading={loading} config={adminConfig}/>
            </div>
        </div>
    );
};

export default AdminMain;
