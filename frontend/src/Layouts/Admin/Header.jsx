import {
    Search,
    Menu,
    Settings,
    CircleUser,
    User,
    GitPullRequestArrow,
    Users,
    HomeIcon,
    BuildingIcon,
    LogOut,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import logo from "../../assets/img/MinT-Logo.jpg";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
    return (
        <header className="flex h-14 items-center gap-4 border-b bg-background/90 px-4 lg:h-[60px] lg:px-6">
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col">
                <nav className="grid items-start px-4  font-medium space-y-8">
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
                <div>
                    {/* <Link
                        to={"/admin"}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                        <HomeIcon className="h-4 w-4" />
                        Dashboard
                    </Link> */}
                    <Link
                        to={"/admin/requests"}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                        <GitPullRequestArrow className="h-4 w-4" />
                        Requests
                    </Link>
                    <Link
                        to={"/admin"}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                        <Users className="h-4 w-4" />
                         Admins
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
                    {/* <div className="mt-auto p-4 font-medium">
                        <Link
                            to={"/admin"}
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                            <Settings className="h-4 w-4" />
                            Settings
                        </Link>
                    </div> */}
                </SheetContent>
            </Sheet>
            <div className="w-full flex-1">
                
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="secondary"
                        size="icon"
                        className="rounded-full">
                        <CircleUser className="h-5 w-5" />
                        <span className="sr-only">Toggle user menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    
                <DropdownMenuItem onClick={logout} className="text-base">
                        <LogOut className="mr-4 text-destructive"/>
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    );
};
export default Header;
