import { createBrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Homepage from "./pages/Homepage";

const router = createBrowserRouter([
    {path: '/', element: <Homepage/>},
    {path: '/login', element: <Login/>},
    {path: '/signup', element: <Signup/>}


])

export default router