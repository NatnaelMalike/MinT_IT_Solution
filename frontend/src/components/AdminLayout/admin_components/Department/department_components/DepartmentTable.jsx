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
import { IdContext } from "@/contexts/Context";
import DepartmentDeleteDialog from "./DepartmentDeleteDialog";
import DepartmentEditForm from "./DepartmentEditForm";
import { useEffect, useState } from "react";
import axios from "axios";
import EditDialog from "@/components/EditDialog";
import { useDepartmentContext } from "@/hooks/useDepartmentContext";
export default function DepartmentTable() {
    const {departments} = useDepartmentContext()
    return (
        <Card className="max-h-screen overflow-y-scroll">
            <CardHeader>
                <CardTitle>Departments</CardTitle>
                <CardDescription>A list of all departments in the organization</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Department Name</TableHead>
                            <TableHead>Operations</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="max-h-screen">
                        {departments && departments.map((department) => (
                            <TableRow key={department._id}>
                                <TableCell>{department.name}</TableCell>
                                <TableCell className="flex gap-4">
                                <IdContext.Provider value={department._id}>
                                        <EditDialog entity="Department">
                                            <DepartmentEditForm />
                                        </EditDialog>
                                    </IdContext.Provider>
                                    <DepartmentDeleteDialog id={department._id}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

