import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AuthContextProvider } from "./contexts/AuthContext";
import { RouterProvider } from "react-router-dom";
import router from "./routes.jsx";
import { TechnicianContextProvider } from "./contexts/TechnicianContext";
import { AdminContextProvider } from "./contexts/AdminContext";
import { DepartmentContextProvider } from "./contexts/DepartmentContext";
import { RequestContextProvider } from "./contexts/RequestContext";
import { UserContextProvider } from "./contexts/UserContext";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <AdminContextProvider>
        <TechnicianContextProvider>
          <DepartmentContextProvider>
            <RequestContextProvider>
              <UserContextProvider>
                <QueryClientProvider client={queryClient}>
                  <RouterProvider router={router} />
                </QueryClientProvider>
              </UserContextProvider>
            </RequestContextProvider>
          </DepartmentContextProvider>
        </TechnicianContextProvider>
      </AdminContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
