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



export default function AdminTable({admins}) {
    return (
        <Table>
            <TableCaption>A list of all admin users.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Email Address</TableHead>
                    <TableHead>Passwords</TableHead>
                    <TableHead>Phone Number</TableHead>
                    <TableHead>Operations</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {admins.map((admin) => (
                    <TableRow key={admin._id}>
                        <TableCell>{admin.fullName}</TableCell>
                        <TableCell>{admin.email}</TableCell>
                        <TableCell>{admin.password}</TableCell>
                        <TableCell>{admin.phone}</TableCell>
                        <TableCell className="flex gap-4">
                            <Pencil className="cursor-pointer"/> <Trash2 className="cursor-pointer"/>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
         
        </Table>
    );
}
