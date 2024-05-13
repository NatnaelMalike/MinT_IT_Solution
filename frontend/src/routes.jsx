import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminHomepage from "./pages/Admin/AdminHomepage";
import UserHomepage from "./pages/User/UserHomepage";
import TechnicianHomepage from "./pages/Technnician/TechnicianHomepage";
import AdminSignup from "./pages/Admin/AdminSignupPage";
import TechnicianSignup from "./pages/Technnician/TechnicianSignupPage";
import UserSignup from "./pages/User/UserSignupPage";

const router = createBrowserRouter([
    { path: "/", element: <LoginPage /> },
    { path: "/user", element: <UserHomepage /> },
    { path: "/user/signup", element: <UserSignup /> },

    { path: "/admin", element: <AdminHomepage /> },
    { path: "/admin/signup", element: <AdminSignup /> },
    { path: "/technician", element: <TechnicianHomepage /> },
    { path: "/technician/signup", element: <TechnicianSignup /> },
]);

export default router;
