import AdminSidebar from "@/components/Admin/AdminSidebar";
import Main from "@/components/Admin/Main";
import Card from "@/components/CustomCard";
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
