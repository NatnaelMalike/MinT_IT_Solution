import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext Must be in AuthContextProvider");
    }
    return context;
};
