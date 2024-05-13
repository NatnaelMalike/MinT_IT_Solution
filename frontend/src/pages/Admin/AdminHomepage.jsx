import AdminSidebar from "@/components/Admin/AdminSidebar";
import Main from "@/components/Admin/Main";

const AdminHomepage = () => {
    return (
        <div className="flex">
            <AdminSidebar />
            <Main/>
        </div>
    );
};

export default AdminHomepage;
