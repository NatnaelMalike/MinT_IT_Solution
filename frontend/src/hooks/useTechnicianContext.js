import { TechnicianContext } from "@/contexts/TechnicianContext";
import { useContext } from "react";

export const useTechnicianContext = () => {
    const context = useContext(TechnicianContext);
    if (!context) {
        throw Error("useTechnicianContext Must be in TechnicianContextProvider");
    }
    return context;
};