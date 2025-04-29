import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/login-page";
import UserSignup from "./pages/user-signup-page";
import ForgetPassword from "./pages/ForgetPassword";
import UnAuthorized from "./pages/UnAuthorized";
import PasswordReset from "./pages/PasswordReset";
import HelpCenter from "./pages/contact-center";
import AuthProvider from "./components/AuthProvider";
import Userlayout from "./components/normal-user/layout";
import RequestForm from "./components/Form/request-form";
import UserHero from "./components/normal-user/hero";
import ReportTable from "./components/normal-user/report-table";
import ProfilePage from "./components/normal-user/profile-page";
import IssueDetail from "./components/issue-detail";
import IssueDetailView from "./components/normal-user/issue-detail-view";
import UserDetail from "./components/normal-user/user-deatil";
import AdminLayout from "./components/super-admin/layout";
import UsersTable from "./components/super-admin/users-table";
import TechniciansTable from "./components/super-admin/technicians-table";
import AdminsTable from "./components/super-admin/admins-table";
import DepartmentsTable from "./components/super-admin/departments-table";
import HelperLayout from "./components/helper-admin/layout";
import ProfessionsTable from "./components/super-admin/professions-table";
import TechnicianLayout from "./components/technician-user/layout";
import NotFound from "./pages/error-page";
import ContactPage from "./pages/contact-center";
import ProtectedRoutes from "./pages/ProtectedRoutes";

const router = createBrowserRouter([
  // Login Page
  {
    path: "/",
    element: (
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    ),
    errorElement: <NotFound/>
  },

  // User Signup
  {
    path: "/signup",
    element: <UserSignup />,
  },

  // User Dashboard (NormalUser only)
  {
    path: "/user",
    element: (
      <ProtectedRoutes role="NormalUser">
        <Userlayout />
      </ProtectedRoutes>
    ),
    children: [
      { index: true, element: <UserHero /> },
      { path: "add-request", element: <RequestForm /> },
      { path: "requests", element: <ReportTable /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "test", element: <IssueDetail /> },
      { path: "issue/:id", element: <IssueDetailView /> },
      // REMOVED: { path: "id/:id", element: <UserDetail /> },
    ],
  },

  // Super Admin Dashboard
  {
    path: "/admin",
    element: (
      <ProtectedRoutes role="SuperAdmin">
        <AdminLayout />
      </ProtectedRoutes>
    ),
    children: [
      { index: true, element: <UserHero /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "reports", element: <ReportTable /> },
      { path: "admin_users", element: <AdminsTable /> },
      { path: "users", element: <UsersTable /> },
      { path: "technicians", element: <TechniciansTable /> },
      { path: "departments", element: <DepartmentsTable /> },
      { path: "professions", element: <ProfessionsTable /> },
      { path: "forgot-password", element: <ForgetPassword /> },
      { path: "reset-password/:email", element: <PasswordReset /> },
    ],
  },

  // Helper Admin Dashboard
  {
    path: "/helper-admin",
    element: (
      <ProtectedRoutes role="HelperAdmin">
        <HelperLayout />
      </ProtectedRoutes>
    ),
    children: [
      { index: true, element: <UserHero /> },
      { path: "reports", element: <ReportTable /> },
      { path: "profile", element: <ProfilePage /> },
    ],
  },

  // Technician Dashboard
  {
    path: "/technician",
    element: (
      <ProtectedRoutes role="TechnicianUser">
        <TechnicianLayout />
      </ProtectedRoutes>
    ),
    children: [
      { path: "requests", element: <ReportTable /> },
      { path: "profile", element: <ProfilePage /> },
    ],
  },

  // User Detail Route (SuperAdmin & HelperAdmin only)
  {
    path: "/user/id/:id",
    element: (
      <ProtectedRoutes role={["SuperAdmin", "HelperAdmin"]}>
        <UserDetail />
      </ProtectedRoutes>
    ),
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
  // Contact 
  {
    path: "/contact",
    element: <ContactPage />,
  },
]);

export default router;