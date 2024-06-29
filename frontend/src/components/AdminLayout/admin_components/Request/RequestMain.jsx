import { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/components/Header";
import AddDialog from "@/components/AddDialog";
import RequestForm from "../../../Request/RequestForm";
import RequestTable from "./request_components/RequestTable";
import { useAuthContext } from "@/hooks/useAuthContext";
const RequestMain = () => {
    const { token } = useAuthContext();
    const [requests, setRequests] = useState([]);
    console.log("req ", token);
    // useEffect(() => {
    //     axios
    //         .get("http://localhost:4000/api/request")
    //         .then((response) => {
    //             setRequests(response.data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }, []);
    return (
        <div className="flex flex-col grow gap-8">
            <Header title="Manage Requests">
                <AddDialog entity="Request">
                    <RequestForm />
                </AddDialog>
            </Header>
            <div className="grow" id="main">
                <RequestTable requests={requests} />
            </div>
        </div>
    );
};

export default RequestMain;
