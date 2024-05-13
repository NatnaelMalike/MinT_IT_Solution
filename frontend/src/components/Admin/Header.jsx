import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
    return (
        <div className="py-4 pr-8 flex items-center justify-end">
          <div className="flex gap-8 items-center">
          <Bell size={28}/>
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
    );
};

export default Header;
