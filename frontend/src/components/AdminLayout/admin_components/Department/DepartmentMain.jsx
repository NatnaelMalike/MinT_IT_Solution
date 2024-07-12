import { useEffect } from "react";
import axios from "axios";
import AddDialog from "@/components/AddDialog";
import Header from "@/components/Header";
import DepartmentForm from "./department_components/DepartmentForm";
import { useDepartmentContext } from "@/hooks/useDepartmentContext";
import EntityTable from "@/components/EntityTable";
import { deptConfig } from "@/config/tables";

const DepartmentMain = () => {
    const { departments,dispatch } = useDepartmentContext();
   !departments && useEffect(() => {
         axios
            .get("http://localhost:4000/api/department")
            .then((response) => {
                dispatch({ type: "SET_DEPARTMENTS", payload: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <div className="flex flex-col grow gap-8">
            <Header title="Manage Departments">
                <AddDialog entity="Department">
                    <DepartmentForm />
                </AddDialog>
            </Header>
            <div className="grow" id="main">
                <EntityTable entities={departments} config={deptConfig}/>
            </div>
        </div>
    );
};

export default DepartmentMain;
