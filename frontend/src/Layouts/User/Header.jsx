import {
  Menu,
  CircleUser,
  User,
  GitPullRequestArrow,
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

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background/90 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid items-start p-4  font-medium">
            <Link
              to={"/user"}
              className="flex items-center gap-2 font-semibold mb-4"
            >
              <img
                src={logo}
                alt="Organization Logo"
                className="rounded-md h-36 mx-auto"
              />
            </Link>

            <Link
              to={"/user/profile"}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <User className="h-4 w-4" />
              Profile
            </Link>
            <Link
              to={"/user"}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <GitPullRequestArrow className="h-4 w-4" />
              Requests
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1"></div>
      <Button variant="outline" onClick={() => logout()}>
        {" "}
        <LogOut className="mr-4 text-destructive" />
        Logout
      </Button>
    </header>
  );
};
export default Header;
