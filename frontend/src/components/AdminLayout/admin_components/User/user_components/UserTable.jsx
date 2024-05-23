import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import UserDeleteDialog from "./UserDeleteDialog";
export default function UserTable({ users }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle> Workers</CardTitle>
                <CardDescription>A list of all workers in the organization</CardDescription>
            </CardHeader>
            <CardContent>
        <Table>
            <TableCaption>A list of all users.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Email Address</TableHead>
                    <TableHead>Phone Number</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Operations</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                    <TableRow key={user._id}>
                        <TableCell>{user.fullName}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.department}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell className="flex gap-4">
                            <UserDeleteDialog />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </CardContent>
        </Card>
    );
}
