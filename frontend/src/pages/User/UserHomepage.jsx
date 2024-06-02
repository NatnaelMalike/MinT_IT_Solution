import { Toaster } from "@/components/ui/sonner";
import Aside from "../../Layouts/User/Aside";
import Main from "../../Layouts/User/Main";


const UserHomepage = () => {
    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] bg-background">
        <Aside/>
        <Main />
        <Toaster/>
    </div>
    );
};

export default UserHomepage;
