import {
    GitPullRequestArrow,
    HomeIcon,
    UsersIcon,
    BuildingIcon,
    SettingsIcon,
} from "lucide-react";

import logo from "../../assets/img/MinT-Logo.jpg";
import { Link } from "react-router-dom";
export default function AdminSidebar() {
    return (
      
                <div className="overflow-auto py-2 space-y-8 border px-4">
                    <div className="flex items-center justify-between px-4 py-2 mx-auto ">
                        <img src={logo} alt="" srcset="" />
                    </div>
                    <nav className="grid items-start text-sm font-medium">
                        <Link
                            className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                            href="#">
                            <HomeIcon className="h-4 w-4" />
                            Dashboard
                        </Link>
                        <Link
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                            href="#">
                            <GitPullRequestArrow className="h-4 w-4" />
                            Requests
                        </Link>
                        <Link
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                            href="#">
                            <UsersIcon className="h-4 w-4" />
                            Admins
                        </Link>
                        <Link
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                            href="#">
                            <UsersIcon className="h-4 w-4" />
                            Technicians
                        </Link>
                        <Link
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                            href="#">
                            <UsersIcon className="h-4 w-4" />
                            Users
                        </Link>
                        <Link
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                            href="#">
                            <BuildingIcon className="h-4 w-4" />
                            Departments
                        </Link>
                        <Link
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                            href="#">
                            <SettingsIcon className="h-4 w-4" />
                            Settings
                        </Link>
                    </nav>
                </div>
           
    );
}
