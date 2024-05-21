import { useEffect, useState } from "react";
import axios from "axios";
import TechnicianHeader from "./technician_components/TechnicianHeader";
import TechnicianTable from "./technician_components/TechnicianTable";

const TechnicianMain = () => {
    const [technicians, setTechnicians] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:4000/api/admin")
            .then((response) => {
                setTechnicians(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <div className="flex flex-col grow gap-8">
            <TechnicianHeader />
            <div className="grow" id="main">
                <TechnicianTable technicians={technicians} />
            </div>
        </div>
    );
};

export default TechnicianMain;
