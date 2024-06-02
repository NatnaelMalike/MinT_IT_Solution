import {
    Bell,
    Building2,
    BuildingIcon,
    Bus,
    BusFront,
    CalendarCheck,
    GitPullRequestArrow,
    Home,
    HomeIcon,
    MapPin,
    Settings,
    Ticket,
    University,
    User,
    Users,
    Wallet,
} from "lucide-react";
import logo from "../../assets/img/MinT-Logo.jpg";
import { Link } from "react-router-dom";
const Aside = () => {
    return (
        <div className="hidden border-r md:block">
            <nav className="grid items-start px-2  font-medium lg:px-4 space-y-8">
                <div className="border-b">
                    <Link
                        to={"/helper_desk"}
                        className="flex items-center gap-2 font-semibold mb-4">
                        <img
                            src={logo}
                            alt="Organization Logo"
                            className="rounded-md h-36 mx-auto"
                        />
                    </Link>
                </div>
                <div>
                    <Link
                        to={"/admin/dashboard"}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                        <HomeIcon className="h-4 w-4" />
                        Dashboard
                    </Link>
                    <Link
                        to={"/admin/requests"}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                        <GitPullRequestArrow className="h-4 w-4" />
                        Requests
                    </Link>
                    <Link
                        to={"/admin/helper_admins"}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                        <Users className="h-4 w-4" />
                        Helper Admins
                    </Link>
                    <Link
                        to={"/admin/escalated_requests"}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                        <GitPullRequestArrow className="h-4 w-4" />
                        Escalated Request
                    </Link>
                   
                    <Link
                        to={"/admin/technicians"}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                        <Users className="h-4 w-4" />
                        Technicians
                    </Link>
                    <Link
                        to={"/admin/users"}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                        <Users className="h-4 w-4" />
                        Users
                    </Link>
                    <Link
                        to={"/admin/departments"}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                        <BuildingIcon className="h-4 w-4" />
                        Departments
                    </Link>
                    
                </div>
            </nav>
        </div>
    );
};

export default Aside;
