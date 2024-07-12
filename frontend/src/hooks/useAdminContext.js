import { AdminContext } from "@/contexts/AdminContext";
import { useContext } from "react";

export const useAdminContext = () => {
    const context = useContext(AdminContext);
    if (!context)
        throw new Error(
            "useAdminContext Must be in AdminContextProvider"
        );
    return context;
};
