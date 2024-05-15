import {
    GitPullRequestArrow,
    Wrench,
    Settings,
    ShieldCheck,
    User,
    Users,
} from "lucide-react";
import logo from "../../assets/img/MinT-Logo.jpg";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command";

export default function UserSidebar() {
    return (
        <Command className="rounded-lg border shadow-md w-80 min-h-screen flex flex-col gap-8">
            <div className="">
                <img
                    src={logo}
                    alt="Organization Logo"
                    className="rounded-md h-36 mx-auto"
                />
            </div>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="General" className="mt-4">
                    <CommandItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                    </CommandItem>
                    <CommandItem>
                        <GitPullRequestArrow className="mr-2 h-4 w-4" />
                        <span>Requests</span>
                    </CommandItem>
                    <CommandItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                    </CommandItem>
                </CommandGroup>
            </CommandList>
        </Command>
    );
}
