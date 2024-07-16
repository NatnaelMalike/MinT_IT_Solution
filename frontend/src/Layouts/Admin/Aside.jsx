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
import { Link, NavLink } from "react-router-dom";
const Aside = () => {
    return (
        <div className="hidden border-r md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="border-b">
                    <Link
                        to={"/admin/dashboard"}
                        className="flex items-center gap-2 font-semibold mb-4">
                        <img
                            src={logo}
                            alt="Organization Logo"
                            className="rounded-md h-36 mx-auto"
                        />
                    </Link>
                </div>
            <div className="flex-1">
                <nav className="grid items-start p-4  font-medium text-xl">
                <NavLink
                            to={"/admin/profile"}
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                            <User className="h-4 w-4" />
                            Profile
                        </NavLink>
                    <NavLink
                        to={"/admin/dashboard"}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                        <HomeIcon className="h-4 w-4" />
                        Dashboard
                    </NavLink>
                    <NavLink
                        to={"/admin/requests"}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                        <GitPullRequestArrow className="h-4 w-4" />
                        Requests
                    </NavLink>
                    <NavLink
                        to={"/admin/admin_users"}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                        <Users className="h-4 w-4" />
                         Admins
                    </NavLink>
                    <NavLink
                        to={"/admin/technicians"}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                        <Users className="h-4 w-4" />
                        Technicians
                    </NavLink>
                    <NavLink
                        to={"/admin/users"}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                        <Users className="h-4 w-4" />
                        Users
                    </NavLink>
                    <NavLink
                        to={"/admin/departments"}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                        <BuildingIcon className="h-4 w-4" />
                        Departments
                    </NavLink>
                    {/* <NavLink
                        to={"/admin/forgot-password"}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                        <Users className="h-4 w-4" />
                        Forgot Password
                    </NavLink> */}

                </nav>
            </div>
            {/* <div className="mt-auto p-4 font-medium">
                <Link
                    to={"/helper_desk/profile"}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                    <Settings className="h-4 w-4" />
                    Settings
                </Link>
            </div> */}
            </div>
        </div>
    );
};

export default Aside;
