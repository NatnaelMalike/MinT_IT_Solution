import AdminSidebar from "@/components/Admin/AdminSidebar";
import Main from "@/components/Admin/Main";
import Header from "@/components/Header";
import { Toaster } from "sonner";

const AdminHomepage = () => {
    return (
        <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
            <AdminSidebar />
            <Main/>
            <Toaster />
        </div>
    );
};

export default AdminHomepage;
