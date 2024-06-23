import { RequestContext } from "@/contexts/RequestContext";
import { useContext } from "react";

export const useRequestContext = () => {
    const context = useContext(RequestContext);
    if (!context) {
        throw new Error("useRequestContext Must be in RequestContextProvider");
    }
    return context;
};