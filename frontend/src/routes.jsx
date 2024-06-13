import {
    Navigate,
    RouterProvider,
    createBrowserRouter,
} from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import AdminHomepage from "./pages/Admin/AdminHomepage";
import UserHomepage from "./pages/User/UserHomepage";
import TechnicianHomepage from "./pages/Technnician/TechnicianHomepage";
import AdminSignup from "./pages/Admin/AdminSignupPage";
import TechnicianSignup from "./pages/Technnician/TechnicianSignupPage";
import UserSignup from "./pages/User/UserSignupPage";
import AdminMain from "./components/Admin/AdminMain";
import Dashboard from "./components/AdminLayout/admin_components/Dashboard/Dashboard";
import TechnicianMain from "./components/AdminLayout/admin_components/Technician/TechnicianMain";
import DepartmentMain from "./components/AdminLayout/admin_components/Department/DepartmentMain";
import UserMain from "./components/AdminLayout/admin_components/User/UserMain";
import HelperHomepage from "./pages/HelperDesk/HelperHomepage";
import RequestMain from "./components/AdminLayout/admin_components/Request/RequestMain";
import ForgetPassword from "./pages/reset_password/ForgetPassword";
import RequestPage from "./pages/User/user_components/RequestPage";
import RequestTable from "./components/Helper_Admin/RequestTable";
import UnAuthorized from "./pages/UnAuthorized";
import ProtectedRoutes from "./pages/ProtectedRoutes";

const router = createBrowserRouter([
    // Login Page
    {
        path: "/",
        element: <LoginPage />,
    },

    // User Dashboard
    {
        path: "/user",
        element: (
            <ProtectedRoutes role="normal">
                <UserHomepage />
            </ProtectedRoutes>
        ),
        children: [{ path: "requests", element: <RequestPage /> }],
    },

    // User Signup
    {
        path: "/signup",
        element: <UserSignup />,
    },

    // Forgot Password
    {
        path: "/forget-password",
        element: <ForgetPassword />,
    },

    // UnAuthorized
    {
        path: "/unauthorized",
        element: <UnAuthorized />,
    },
    // Helper Admin Dashboard
    {
        path: "/helper_desk",
        element:  <ProtectedRoutes role={'admin'}><HelperHomepage /></ProtectedRoutes>,
        children: [
            { index: true, element: <RequestTable /> },
            { path: "profile", element: <RequestTable /> },
            { path: "requests", element: <RequestTable /> },
            { path: "assign_request", element: <RequestTable /> },
            { path: "escalated_requests", element: <RequestTable /> },
            { path: "closed_requests", element: <RequestTable /> },
            { path: "technicians", element: <RequestTable /> },
        ],
    },
    // Admin Dashboard
    {
        path: "/admin",
        element:  <AdminHomepage />,
        children: [
            { path: "dashboard", element: <Dashboard /> },
            { path: "requests", element: <RequestMain /> },
            { path: "admin_users", element: <AdminMain /> },
            { path: "users", element: <UserMain /> },
            { path: "technicians", element: <TechnicianMain /> },
            { path: "departments", element: <DepartmentMain /> },
        ],
    },
    // Admin Signup
    { path: "/admin/signup", element: <AdminSignup /> },
    // Technician Dashboard
    {
        path: "/technician",
        element:  <ProtectedRoutes role={'technician'}><TechnicianHomepage /></ProtectedRoutes>,
        children: [
            { index: true, element: <RequestTable /> },
            { path: "profile", element: <RequestTable /> },
            { path: "requests", element: <RequestTable /> },
            { path: "assign_request", element: <RequestTable /> },
            { path: "escalated_requests", element: <RequestTable /> },
            { path: "closed_requests", element: <RequestTable /> },
            { path: "technicians", element: <RequestTable /> },
        ],
    },
    { path: "/technician/signup", element: <TechnicianSignup /> },
]);

export default router;
