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
import { Pencil, Trash2 } from "lucide-react";
import AdminEditDialog from "./AdminEditDialog";
import AdminEditCard from "./AdminEditCard";
import { Link } from "react-router-dom";


export default function UserTable({users}) {
    return (
        <Table>
            <TableCaption>A list of all admin users.</TableCaption>
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
                             <Link to={`/user/delete/${user._id}`}><Trash2 className="cursor-pointer"/></Link>  
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>

        </Table>
    );
}
