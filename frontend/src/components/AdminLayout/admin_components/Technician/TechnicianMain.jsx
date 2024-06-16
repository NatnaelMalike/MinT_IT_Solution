import { useEffect, useState } from "react";
import axios from "axios";
import TechnicianTable from "./technician_components/TechnicianTable";
import Header from "@/components/Header";
import AddDialog from "@/components/AddDialog";
import TechnicianForm from "./technician_components/TechnicianForm";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useTechnicianContext } from "@/hooks/useTechnicianContext";

const TechnicianMain = () => {
    const { technicians, dispatch } = useTechnicianContext();
    useEffect(() => {
        const fetchTechnicians = () => {
             axios
                .get("http://localhost:4000/api/technician")
                .then((response) => {
                    dispatch({
                        type: "SET_TECHNICIANS",
                        payload: response.data,
                    });
                    console.log(technicians)
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        fetchTechnicians();
    }, [dispatch]);
    return (
        <div className="flex flex-col grow gap-8">
            <Header title="Manage Technicians">
                <AddDialog entity="Technician">
                    <TechnicianForm />
                </AddDialog>
            </Header>
            <div className="grow" id="main">
                <TechnicianTable />
            </div>
        </div>
    );
};

export default TechnicianMain;
