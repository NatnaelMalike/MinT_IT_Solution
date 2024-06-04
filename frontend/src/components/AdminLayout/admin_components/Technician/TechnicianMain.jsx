import { useEffect, useState } from "react";
import axios from "axios";
import TechnicianTable from "./technician_components/TechnicianTable";
import Header from "@/components/Header";
import AddDialog from "@/components/AddDialog";
import TechnicianForm from "./technician_components/TechnicianForm";

const TechnicianMain = () => {
    const [technicians, setTechnicians] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:4000/api/technician")
            .then((response) => {
                setTechnicians(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <div className="flex flex-col grow gap-8">
            <Header title="Manage Technicians">
                <AddDialog entity="Technician">
                    <TechnicianForm />
                </AddDialog>
            </Header>
            <div className="grow" id="main">
                <TechnicianTable technicians={technicians} />
            </div>
        </div>
    );
};

export default TechnicianMain;
