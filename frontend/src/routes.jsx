import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import AdminHomepage from "./pages/Admin/AdminHomepage";
import UserHomepage from "./pages/User/UserHomepage";
import TechnicianHomepage from "./pages/Technnician/TechnicianHomepage";
import AdminSignup from "./pages/Admin/AdminSignupPage";
import TechnicianSignup from "./pages/Technnician/TechnicianSignupPage";
import UserSignup from "./pages/User/UserSignupPage";
import AdminMain from "./components/Admin/AdminMain";
import UserEditForm from "./components/User/UserEditForm";
import Dashboard from "./components/AdminLayout/admin_components/Dashboard/Dashboard";
import TechnicianMain from "./components/AdminLayout/admin_components/Technician/TechnicianMain";
import DepartmentMain from "./components/AdminLayout/admin_components/Department/DepartmentMain";
import UserMain from "./components/AdminLayout/admin_components/User/UserMain";

const router = createBrowserRouter([
    // Login Page
    { path: "/login", element: <LoginPage /> },

    // User Dashboard
    {
        path: "/user",
        element: <UserHomepage />,
        children: [
            { index: true, element: <UserMain /> },
            { path: "edit", element: <UserEditForm /> },
        ],
    },
    // User Signup
    { path: "/user/signup", element: <UserSignup /> },

    // Admin Dashboard
    {
        path: "/admin",
        element: <AdminHomepage />,
        children: [
            { index: true, element: <Dashboard /> },
            { path: "admin_users", element: <AdminMain /> },
            { path: "users", element: <UserMain /> },
            { path: "technicians", element: <TechnicianMain /> },
            { path: "departments", element: <DepartmentMain /> },
        ],
    },
    // Admin Signup
    { path: "/admin/signup", element: <AdminSignup /> },
    // Technician Dashboard
    { path: "/technician", element: <TechnicianHomepage /> },
    { path: "/technician/signup", element: <TechnicianSignup /> },
]);

export default router;
