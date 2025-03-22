import useAuthStore from "@/store/authStore";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
const ProfilePage = () => {
  const user = useAuthStore((state) => state.user);
  if (!user) return null;
  return (
    <div>
      <Card className="mx-auto bg-slate-50">
        <CardHeader>
          <CardTitle className="text-center">Account Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-10 justify-center mt-8 text-lg">
            <div className="space-y-2">
              <p className="font-semibold">Name:</p>
              <p className="font-semibold">Email:</p>
              <p className="font-semibold">Phone Number:</p>
              <p className="font-semibold">Department:</p>
              <p className="font-semibold">Role:</p>
              <p className="font-semibold">Profession:</p>
            </div>
            <div className="space-y-2">
              <p>{user.name}</p>
              <p>{user.email}</p>
              <p>{user.phone}</p>
              <p>{user.department}</p>
              <p>{user.role}</p>
              <p>{user.profession == "None" ? "Employee" : user.proffesion}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
