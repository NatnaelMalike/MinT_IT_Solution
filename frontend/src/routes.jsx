import { createBrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AdminHomepage from "./pages/home/AdminHomepage";
import UserHomepage from "./pages/home/UserHomepage";
import TechnicianHomepage from "./pages/home/TechnicianHomepage";
import AdminLogin from "./pages/login/AdminLogin";
import UserLogin from "./pages/login/UserLogin";
import TechnicianLogin from "./pages/login/TechnicianLogin";
import AdminSignup from "./pages/signup/AdminSignup";
import TechnicianSignup from "./pages/signup/TechnicianSignup";
import UserSignup from "./pages/signup/UserSignup";

const router = createBrowserRouter([

    {path: '/', element: <UserHomepage/>},
    {path: '/user/login', element: <UserLogin/>},
    {path: '/user/signup', element: <UserSignup/>},
    {path: '/admin', element: <AdminHomepage/>},
    {path: '/admin/login', element: <AdminLogin/>},
    {path: '/admin/signup', element: <AdminSignup/>},
    {path: '/technician', element: <TechnicianHomepage/>},
    {path: '/technician/login', element: <TechnicianLogin/>},
    {path: '/technician/signup', element: <TechnicianSignup/>}

])

export default router