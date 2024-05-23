import { useEffect, useState } from "react";
import axios from "axios";
import DepartmentTable from "./department_components/DepartmentTable";
import DepartmentHeader from "./department_components/DepartmentHeader";

const DepartmentMain = () => {
    const [departments, setDepartments] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:4000/api/department")
            .then((response) => {
                setDepartments(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <div className="flex flex-col grow gap-8">
            <DepartmentHeader />
            <div className="grow" id="main">
                <DepartmentTable departments={departments} />
            </div>
        </div>
    );
};

export default DepartmentMain;
