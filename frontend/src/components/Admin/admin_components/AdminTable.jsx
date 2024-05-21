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
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import AdminEditDialog from "./AdminEditDialog";
export default function AdminTable() {
    const [admins, setAdmins] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:4000/api/admin")
            .then((response) => {
                setAdmins((response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <Card>
            <CardHeader>
                <CardTitle>Admin Users</CardTitle>
                <CardDescription>A list of all admin users</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Full Name</TableHead>
                            <TableHead>Email Address</TableHead>
                            <TableHead>Phone Number</TableHead>
                            <TableHead>Operations</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {admins.map((admin) => (
                            <TableRow key={admin._id}>
                                <TableCell>{admin.fullName}</TableCell>
                                <TableCell>{admin.email}</TableCell>
                                <TableCell>{admin.phone}</TableCell>
                                <TableCell className="flex gap-4">
                                    <AdminEditDialog id={admin._id}/>
                                    <Link to={`/admin/delete/${admin._id}`}>
                                        <Trash2 className="cursor-pointer" />
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
