import {
    Bell,
    Building2,
    Bus,
    BusFront,
    CalendarCheck,
    GitPullRequestArrow,
    Home,
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
            <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="border-b">
                <Link
                    to={"/admin"}
                    className="flex items-center gap-2 font-semibold mb-4">
                    <img
                        src={logo}
                        alt="Organization Logo"
                        className="rounded-md h-36 mx-auto"
                    />
                </Link>
            </div>
            <div className="flex-1">
                <nav className="grid items-start p-4  font-medium ">
                    <Link
                        to={"/user/profile"}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                        <User className="h-4 w-4" />
                        Profile
                    </Link>
                    <Link
                        to={"/user/requests"}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                        <GitPullRequestArrow className="h-4 w-4" />
                        Requests
                    </Link>
                </nav>
            </div>

            <div className="mt-auto p-4 font-medium">
                <Link
                    to={"/user"}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                    <Settings className="h-4 w-4" />
                    Settings
                </Link>
            </div>
            </div>
            
        </div>
    );
};

export default Aside;
