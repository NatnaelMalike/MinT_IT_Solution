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
import TechnicianDeleteDialog from "./TechnicianDeleteDialog";
import EditDialog from "@/components/EditDialog";
import { IdContext } from "@/contexts/Context";
import TechnicianEditForm from "./TechnicianEditForm";
import { useTechnicianContext } from "@/hooks/useTechnicianContext";
export default function TechnicianTable() {
const {technicians} = useTechnicianContext()
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
                            <TableHead>Department</TableHead>
                            <TableHead>Profession</TableHead>
                            <TableHead>Phone Number</TableHead>
                            <TableHead>Operations</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        { technicians && technicians.map((technician) => (
                            <TableRow key={technician._id}>
                                <TableCell>{technician.fullName}</TableCell>
                                <TableCell>{technician.email}</TableCell>
                                <TableCell>{technician.department['name']}</TableCell>
                                <TableCell>{technician.profession}</TableCell>
                                <TableCell>{technician.phone}</TableCell>
                                <TableCell className="flex gap-4">
                                <IdContext.Provider value={technician._id}>
                                        <EditDialog entity="Technician">
                                            <TechnicianEditForm />
                                        </EditDialog>
                                    </IdContext.Provider>
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

