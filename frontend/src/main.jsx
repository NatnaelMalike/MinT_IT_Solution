import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AuthContextProvider } from "./contexts/AuthContext";
import { RouterProvider } from "react-router-dom";
import router from "./routes.jsx";
import { TechnicianContextProvider } from "./contexts/TechnicianContext";
import { HelperAdminContextProvider } from "./contexts/HelperAdminContext";
import { DepartmentContextProvider } from "./contexts/DepartmentContext";
import { RequestContextProvider } from "./contexts/RequestContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthContextProvider>
            <HelperAdminContextProvider>
                <TechnicianContextProvider>
                    <DepartmentContextProvider>
                        <RequestContextProvider>
                            <RouterProvider router={router} />
                        </RequestContextProvider>
                    </DepartmentContextProvider>
                </TechnicianContextProvider>
            </HelperAdminContextProvider>
        </AuthContextProvider>
    </React.StrictMode>
);
