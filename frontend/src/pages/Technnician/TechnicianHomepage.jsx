import { Toaster } from "@/components/ui/sonner";
import Aside from "../../Layouts/Technician/Aside";
import Main from "../../Layouts/Technician/Main";


const TechnicianHomepage = () => {
    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] bg-background">
        <Aside/>
        <Main />
        <Toaster/>
    </div>
    );
};

export default TechnicianHomepage;
