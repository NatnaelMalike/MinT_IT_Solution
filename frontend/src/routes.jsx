import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/login/login-page";
import TechnicianHomepage from "./pages/Technnician/TechnicianHomepage";
import UserSignup from "./pages/User/user-signup-page";
import HelperHomepage from "./pages/HelperDesk/HelperHomepage";
import ForgetPassword from "./pages/reset_password/ForgetPassword";
import RequestTable from "./components/Request/RequestTable";
import UnAuthorized from "./pages/UnAuthorized";
import RoleBasedRedirect from "./pages/RoleBasedRedirect";
import TechnicianRequestTable from "./components/Technician/TechnicianRequestTable";
import PasswordReset from "./pages/reset_password/PasswordReset";
import AssignedRequests from "./components/Request/AssignedRequests";
import HelpCenter from "./pages/HelpCenter";
import HelperDashboard from "./components/AdminLayout/admin_components/Dashboard/HelperDashboard";
import AuthProvider from "./components/AuthProvider";
import Userlayout from "./components/User/layout";
import RequestForm from "./components/Form/request-form";
import UserHero from "./components/User/hero";
import ReportTable from "./components/User/report-table";
import ProfilePage from "./components/User/profile-page";
import IssueDetail from "./components/issue-detail";
import IssueDetailView from "./components/User/issue-detail-view";
import UserDetail from "./components/User/user-deatil";
import AdminLayout from "./components/super-admin/layout";
import UsersTable from "./components/super-admin/users-table";
import TechniciansTable from "./components/super-admin/technicians-table";
import AdminsTable from "./components/super-admin/admins-table";
import DepartmentsTable from "./components/super-admin/departments-table";
import HelperLayout from "./components/helper-admin/layout";
const router = createBrowserRouter([
  // Login Page
  {
    path: "/",
    element: (
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    ),
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
      { index: true, element: <UserHero /> },
      { path: "add-request", element: <RequestForm /> },
      { path: "requests", element: <ReportTable /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "test", element: <IssueDetail /> },
      { path: "issue/:id", element: <IssueDetailView /> },
      { path: "id/:id", element: <UserDetail /> },
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
    path: "/helper-admin",
    element: <HelperLayout />,
    children: [
      { index: true, element: <UserHero /> },
      { path: "reports", element: <ReportTable /> },
      { path: "profile", element: <ProfilePage /> },
    ],
  },
  // Admin Dashboard
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <UserHero /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "reports", element: <ReportTable /> },
      { path: "admin_users", element: <AdminsTable /> },
      { path: "users", element: <UsersTable /> },
      { path: "technicians", element: <TechniciansTable /> },
      { path: "departments", element: <DepartmentsTable /> },
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
