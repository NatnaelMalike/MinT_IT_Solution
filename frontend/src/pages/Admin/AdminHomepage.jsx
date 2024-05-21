import AdminSidebar from "@/components/AdminLayout/AdminSidebar";
import Main from "@/components/AdminLayout/Main";
import { Toaster } from "sonner";

const AdminHomepage = () => {
    return (
        <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr] bg-gray-50">
            <AdminSidebar />
            <Main />
            <Toaster />
        </div>
    );
};

export default AdminHomepage;
