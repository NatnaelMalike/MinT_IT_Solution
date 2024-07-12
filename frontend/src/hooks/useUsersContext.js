import { UserContext } from "@/contexts/UserContext";
import { useContext } from "react";

export const useUsersContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUsersContext Must be in UserContextProvider");
    }
    return context;
};