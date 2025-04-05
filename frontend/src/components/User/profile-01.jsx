import {  MoveUpRight, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import LogoutButton from "../logout-btn";

const defaultProfile = {
  name: "Eugene An",
  role: "Prompt Engineer",
  avatar:
    "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-02-albo9B0tWOSLXCVZh9rX9KFxXIVWMr.png",
  subscription: "Free Trial",
};

export default function Profile01({
  name = defaultProfile.name,
  role = defaultProfile.role,
  avatar = defaultProfile.avatar,
} = defaultProfile) {
  const menuItems = [
    {
      label: "Edit Profile ",
      href: "#",
      icon: <Settings className="w-4 h-4" />,
    },
  ];

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <div className="relative shrink-0">
          <img
            src={avatar}
            alt={name}
            width={72}
            height={72}
            className="rounded-full ring-4 ring-white dark:ring-zinc-900 object-cover"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold ">{name}</h2>
          <p className="text-accent-foreground">{role}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center justify-between p-2 
                                    hover:bg-zinc-50 dark:hover:bg-zinc-800/50 
                                    rounded-lg transition-colors duration-200"
            >
              <div className="flex items-center gap-2">
                {item.icon}
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {item.label}
                </span>
              </div>
              <div className="flex items-center">
                {item.value && (
                  <span className="text-sm text-zinc-500 dark:text-zinc-400 mr-2">
                    {item.value}
                  </span>
                )}
                {item.external && <MoveUpRight className="w-4 h-4" />}
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
      <CardFooter>
       <LogoutButton/>
      </CardFooter>
    </Card>
  );
}
