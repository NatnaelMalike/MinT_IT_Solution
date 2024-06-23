import { HelperAdminContext } from "@/contexts/HelperAdminContext";
import { useContext } from "react";

export const useHelperAdminContext = () => {
    const context = useContext(HelperAdminContext);
    if (!context)
        throw new Error(
            "useHelperAdminContext Must be in HelperAdmin ContextProvider"
        );
    return context;
};
