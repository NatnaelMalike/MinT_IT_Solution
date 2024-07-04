import {
    Search,
    Menu,
    Settings,
    CircleUser,
    User,
    GitPullRequestArrow,
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
import { useLogout } from "@/hooks/useLogout";

const Header = () => {
    const {logout} = useLogout()
    const handleLogoutClick = ()=>{
        logout()
    }
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
                    <nav className="grid items-start p-4  font-medium">
                        <Link
                            to={"/user"}
                            className="flex items-center gap-2 font-semibold mb-4">
                            <img
                                src={logo}
                                alt="Organization Logo"
                                className="rounded-md h-36 mx-auto"
                            />
                        </Link>

                        <Link
                            to={"/user/profile"}
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                            <User className="h-4 w-4" />
                            Profile
                        </Link>
                        <Link
                            to={"/user"}
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                            <GitPullRequestArrow className="h-4 w-4" />
                            Requests
                        </Link>
                    </nav>
                    <div className="mt-auto p-4 font-medium">
                        <Link
                            to={"/user/profile"}
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                            <Settings className="h-4 w-4" />
                            Settings
                        </Link>
                    </div>
                </SheetContent>
            </Sheet>
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
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogoutClick}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    );
};
export default Header;
