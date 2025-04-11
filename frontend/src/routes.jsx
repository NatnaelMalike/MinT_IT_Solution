import {
  createBrowserRouter,
} from "react-router-dom";
import LoginPage from "./pages/login/login-page";
import AdminHomepage from "./pages/Admin/AdminHomepage";
import TechnicianHomepage from "./pages/Technnician/TechnicianHomepage";
import UserSignup from "./pages/User/user-signup-page";
import AdminMain from "./components/Admin/AdminMain";
import Dashboard from "./components/AdminLayout/admin_components/Dashboard/Dashboard";
import TechnicianMain from "./components/AdminLayout/admin_components/Technician/TechnicianMain";
import DepartmentMain from "./components/AdminLayout/admin_components/Department/DepartmentMain";
import UserMain from "./components/AdminLayout/admin_components/User/UserMain";
import HelperHomepage from "./pages/HelperDesk/HelperHomepage";
import ForgetPassword from "./pages/reset_password/ForgetPassword";
import RequestTable from "./components/Request/RequestTable";
import UnAuthorized from "./pages/UnAuthorized";
import RoleBasedRedirect from "./pages/RoleBasedRedirect";
import TechnicianRequestTable from "./components/Technician/TechnicianRequestTable";
import PasswordReset from "./pages/reset_password/PasswordReset";
import AdminRequestTable from "./components/Request/AdminRequestTable";
import AssignedRequests from "./components/Request/AssignedRequests";
import HelpCenter from "./pages/HelpCenter";
import HelperDashboard from "./components/AdminLayout/admin_components/Dashboard/HelperDashboard";
import AuthProvider from "./components/AuthProvider";
import Userlayout from "./components/User/layout";
import RequestForm from "./components/Form/request-form";
import UserHero from "./components/User/hero";
import TestComponent from "./components/User/report-table";
import ProfilePage from "./components/User/profile-page";
import IssueDetail from "./components/issue-detail";
import IssueDetailView from "./components/User/issue-detail-view";
import UserDetail from "./components/User/user-deatil";
const router = createBrowserRouter([
  // Login Page
  {
    path: "/",
    element: 
    <AuthProvider>
        <LoginPage />
    </AuthProvider>
    ,
  },

  // Role Based Redirect
  {
    path: "/redirect",
    element: <RoleBasedRedirect />,
  },

  // User Dashboard
  {
    path: "/user",
    element: <Userlayout />,
    children: [
      {index: true, element: <UserHero />},
      { path: "add-request", element: <RequestForm /> },
      { path: "requests", element: <TestComponent /> },
      { path: "profile", element: <ProfilePage /> },
      {path: "test", element: <IssueDetail/>},
      {path: "issue/:id", element: <IssueDetailView/>},
      {path: "id/:id", element: <UserDetail/>}
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
    element: <HelpCenter />,
  },
  {
    path: "/reset-password/:email",
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
    element: <HelperHomepage />,
    children: [
      { path: "requests", element: <RequestTable /> },
      { path: "dashboard", element: <HelperDashboard /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "assignments", element: <AssignedRequests /> },
    ],
  },
  // Admin Dashboard
  {
    path: "/admin",
    element: <AdminHomepage />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "requests", element: <AdminRequestTable /> },
      { path: "admin_users", element: <AdminMain /> },
      { path: "users", element: <UserMain /> },
      { path: "technicians", element: <TechnicianMain /> },
      { path: "departments", element: <DepartmentMain /> },
      { path: "forgot-password", element: <ForgetPassword /> },
      { path: "reset-password/:email", element: <PasswordReset /> },
    ],
  },

  // Technician Dashboard
  {
    path: "/technician",
    element: <TechnicianHomepage />,
    children: [
      { path: "requests", element: <TechnicianRequestTable /> },
      { path: "profile", element: <ProfilePage /> },
    ],
  },
]);

export default router;
