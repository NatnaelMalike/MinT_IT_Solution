import Aside from "@/Layouts/Admin/Aside";
import Main from "@/Layouts/Admin/Main";
import { Toaster } from "sonner";

const AdminHomepage = () => {
    return (
        <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr] bg-gray-50">
            <Aside />
            <Main />
            <Toaster />
        </div>
    );
};

export default AdminHomepage;
