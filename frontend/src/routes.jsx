import {
    Navigate,
    RouterProvider,
    createBrowserRouter,
} from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import AdminHomepage from "./pages/Admin/AdminHomepage";
import UserHomepage from "./pages/User/UserHomepage";
import TechnicianHomepage from "./pages/Technnician/TechnicianHomepage";
import UserSignup from "./pages/User/UserSignupPage";
import AdminMain from "./components/Admin/AdminMain";
import Dashboard from "./components/AdminLayout/admin_components/Dashboard/Dashboard";
import TechnicianMain from "./components/AdminLayout/admin_components/Technician/TechnicianMain";
import DepartmentMain from "./components/AdminLayout/admin_components/Department/DepartmentMain";
import UserMain from "./components/AdminLayout/admin_components/User/UserMain";
import HelperHomepage from "./pages/HelperDesk/HelperHomepage";
import ForgetPassword from "./pages/reset_password/ForgetPassword";
import RequestPage from "./components/User/RequestPage";
import RequestTable from "./components/Request/RequestTable";
import UnAuthorized from "./pages/UnAuthorized";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import RoleBasedRedirect from "./pages/RoleBasedRedirect";
import ProfilePage from "./components/ProfilePage";
import TechnicianRequestTable from "./components/Technician/TechnicianRequestTable";
import PasswordReset from "./pages/reset_password/PasswordReset";
import AdminRequestTable from "./components/Request/AdminRequestTable";

const router = createBrowserRouter([
    // Login Page
    {
        path: "/",
        element: <LoginPage />,
    },
    // Role Based Redirect
    {
        path: "/redirect",
        element: <RoleBasedRedirect />,
    },

    // User Dashboard
    {
        path: "/user",
        element: (
            <ProtectedRoutes role={"normal_user"}>
                <UserHomepage />
            </ProtectedRoutes>
        ),
        children: [
            { index: true, element: <RequestPage /> },
            { path: "profile", element: <ProfilePage /> },
        ],
    },

    // User Signup
    {
        path: "/signup",
        element: <UserSignup />,
    },

    // Forgot Password
    {
        path: "/forgot-password",
        element: <ForgetPassword />,
    },
    {
        path: "/reset-password:token",
        element: <PasswordReset />,
    },

    // UnAuthorized
    {
        path: "/unauthorized",
        element: <UnAuthorized />,
    },
    // Helper Admin Dashboard
    {
        path: "/helper_desk",
        element: (
            <ProtectedRoutes role={"helper_admin"}>
                <HelperHomepage />
            </ProtectedRoutes>
        ),
        children: [
            { index: true, element: <RequestTable /> },
            { path: "profile", element: <ProfilePage /> },
        ],
    },
    // Admin Dashboard
    {
        path: "/admin",
        element: (
            <ProtectedRoutes role={"super_admin"}>
                <AdminHomepage />
            </ProtectedRoutes>
        ),
        children: [
            { path: "", element: <Dashboard /> },
            { path: "profile", element: <ProfilePage /> },
            { path: "requests", element: <AdminRequestTable /> },
            { path: "admin_users", element: <AdminMain /> },
            { path: "users", element: <UserMain /> },
            { path: "technicians", element: <TechnicianMain /> },
            { path: "departments", element: <DepartmentMain /> },
        ],
    },


    // Technician Dashboard
    {
        path: "/technician",
        element: (
            <ProtectedRoutes role={"technician_user"}>
                <TechnicianHomepage />
            </ProtectedRoutes>
        ),
        children: [
            { index: true, element: <TechnicianRequestTable /> },
            { path: "profile", element: <ProfilePage /> },
        ],
    },
]);

export default router;
