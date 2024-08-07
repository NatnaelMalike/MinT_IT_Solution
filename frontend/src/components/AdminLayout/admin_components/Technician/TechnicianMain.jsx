import { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/components/Header";
import AddDialog from "@/components/AddDialog";
import TechnicianForm from "./technician_components/TechnicianForm";
import { useTechnicianContext } from "@/hooks/useTechnicianContext";
import EntityTable from "@/components/EntityTable";
import { technicianConfig } from "@/config/tables";

const TechnicianMain = () => {
    const [loading, setLoading] = useState(false);
    const { technicians, dispatch } = useTechnicianContext();
    
        useEffect(() => {
                setLoading(true);
                axios
                    .get("http://localhost:4000/api/technician")
                    .then((response) => {
                        dispatch({
                            type: "SET_TECHNICIANS",
                            payload: response.data,
                        });
                        setLoading(false);
                    })
                    .catch((error) => {
                        setLoading(false);
                        console.log(error);
                    });
            
        }, []);
    return (
        <div className="flex flex-col gap-8">
            <Header title="Manage Technicians">
                <AddDialog entity="Technician">
                    <TechnicianForm />
                </AddDialog>
            </Header>
            <div className="grow" id="main">
                {/* <TechnicianTable /> */}
                <EntityTable
                    entities={technicians}
                    loading={loading}
                    config={technicianConfig}
                />
            </div>
        </div>
    );
};

export default TechnicianMain;
