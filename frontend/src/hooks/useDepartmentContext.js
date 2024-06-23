import { DepartmentContext } from "@/contexts/DepartmentContext";
import { useContext } from "react";

export const useDepartmentContext = () => {
    const context = useContext(DepartmentContext);
    if (!context) {
        throw new Error("useDepartmentContext Must be in DepartmentContextProvider");
    }
    return context;
};