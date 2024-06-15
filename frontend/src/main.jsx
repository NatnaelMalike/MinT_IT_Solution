import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AuthContextProvider } from "./contexts/AuthContext";
import { RouterProvider } from "react-router-dom";
import router from "./routes.jsx";
import { TechnicianContextProvider } from "./contexts/TechnicianContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthContextProvider>
            <TechnicianContextProvider>
                <RouterProvider router={router} />
            </TechnicianContextProvider>
        </AuthContextProvider>
    </React.StrictMode>
);
