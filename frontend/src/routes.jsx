import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminHomepage from "./pages/Admin/AdminHomepage";
import UserHomepage from "./pages/User/UserHomepage";
import TechnicianHomepage from "./pages/Technnician/TechnicianHomepage";
import AdminSignup from "./pages/Admin/AdminSignupPage";
import TechnicianSignup from "./pages/Technnician/TechnicianSignupPage";
import UserSignup from "./pages/User/UserSignupPage";
import AdminMain from "./components/Admin/AdminMain";
import AdminEditCard from "./components/Admin/AdminEditCard";
import UserMain from "./components/User/UserMain";
import UserEditForm from "./components/User/UserEditForm";
import Dashboard from "./components/Admin/Dashboard";

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
            { path: "edit/:id", element: <AdminEditCard /> },
        ],
    },
    // Admin Signup
    { path: "/admin/signup", element: <AdminSignup /> },
    // Technician Dashboard
    { path: "/technician", element: <TechnicianHomepage /> },
    { path: "/technician/signup", element: <TechnicianSignup /> },
]);

export default router;
