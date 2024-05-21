import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function UserCard({ user }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Your Profile</CardTitle>
                <CardDescription>all of your profile details</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4 w-1/2 mx-auto">
                    <div className="p-4">
                        <span>Full Name:</span>
                        <p> {user.fullName}</p>
                    </div>
                    <div className="p-4">
                        <span>Email:</span>
                        <p> {user.email}</p>
                    </div>
                    <div className="p-4">
                        <span>Password:</span>
                        <p> {user.password}</p>
                    </div>
                    <div className="p-4">
                        <span>Department:</span>
                        <p> {user.department}</p>
                    </div>
                    <div className="p-4">
                        <span>Phone Number: </span>
                        <p> {user.phone}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
