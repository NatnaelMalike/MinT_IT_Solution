import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/LoginPage";
import AdminHomepage from "./pages/home/AdminHomepage";
import UserHomepage from "./pages/home/UserHomepage";
import TechnicianHomepage from "./pages/home/TechnicianHomepage";
import AdminSignup from "./pages/signup/AdminSignup";
import TechnicianSignup from "./pages/signup/TechnicianSignup";
import UserSignup from "./pages/signup/UserSignup";

const router = createBrowserRouter([

    {path: '/', element: <Login/>},
    {path: '/user', element: <UserHomepage/>},
    {path: '/user/signup', element: <UserSignup/>},
    {path: '/admin', element: <AdminHomepage/>},
    {path: '/admin/signup', element: <AdminSignup/>},
    {path: '/technician', element: <TechnicianHomepage/>},
    {path: '/technician/signup', element: <TechnicianSignup/>}

])

export default router