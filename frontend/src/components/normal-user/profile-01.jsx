import { Card, CardFooter, CardHeader } from "../ui/card";
import LogoutButton from "../logout-btn";
import useAuthStore from "@/store/authStore";
import { Badge } from "../ui/badge";

export default function ProfileIcon() {
  const { user } = useAuthStore();

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <div className="relative shrink-0">
          <img
            src={
              "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-02-albo9B0tWOSLXCVZh9rX9KFxXIVWMr.png"
            }
            alt={name}
            width={72}
            height={72}
            className="rounded-full ring-4 ring-white dark:ring-zinc-900 object-cover"
          />
        </div>
        <div className="flex-1 space-y-2">
          <h2 className="text-xl font-semibold ">{user.name}</h2>
          <p className="text-accent-foreground">{user.profession.name}</p>
          <Badge className="text-accent-foreground">{user.role}</Badge>
        </div>
      </CardHeader>
      <CardFooter>
        <LogoutButton />
      </CardFooter>
    </Card>
  );
}
