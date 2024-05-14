import AdminSidebar from "@/components/Admin/AdminSidebar";
import Main from "@/components/Admin/Main";
import { Toaster } from "sonner";

const AdminHomepage = () => {
    return (
        <div className="flex">
            <AdminSidebar />
            <Main/>
            <Toaster />
        </div>
    );
};

export default AdminHomepage;
