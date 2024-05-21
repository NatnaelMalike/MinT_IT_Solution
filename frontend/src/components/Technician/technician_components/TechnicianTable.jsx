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
import TechnicianEditDialog from "./TechnicianEditDialog";
import TechnicianDeleteDialog from "./TechnicianDeleteDialog";
export default function TechnicianTable() {
    const [technicians, setTechnicians] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:4000/api/technician")
            .then((response) => {
                setTechnicians((response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <Card>
            <CardHeader>
                <CardTitle>Technician Users</CardTitle>
                <CardDescription>A list of all technician users</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Full Name</TableHead>
                            <TableHead>Email Address</TableHead>
                            <TableHead>Profession</TableHead>
                            <TableHead>Phone Number</TableHead>
                            <TableHead>Operations</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {technicians.map((technician) => (
                            <TableRow key={technician._id}>
                                <TableCell>{technician.fullName}</TableCell>
                                <TableCell>{technician.email}</TableCell>
                                <TableCell>{technician.department}</TableCell>
                                <TableCell>{technician.phone}</TableCell>
                                <TableCell className="flex gap-4">
                                    <TechnicianEditDialog id={technician._id}/>
                                    <TechnicianDeleteDialog id={technician._id}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

