import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminHomepage from "./pages/home/AdminHomepage";
import UserHomepage from "./pages/home/UserHomepage";
import TechnicianHomepage from "./pages/home/TechnicianHomepage";
import AdminSignup from "./pages/signup/AdminSignupPage";
import TechnicianSignup from "./pages/signup/TechnicianSignupPage";
import UserSignup from "./pages/signup/UserSignupPage";

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
