import Aside from "@/Layouts/Admin/Aside";
import Main from "@/Layouts/Admin/Main";
import { Toaster } from "sonner";

const AdminHomepage = () => {
    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] bg-background">
            <Aside />
            <Main />
            <Toaster />
        </div>
    );
};

export default AdminHomepage;
