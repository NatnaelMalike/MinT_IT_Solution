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
import DepartmentEditDialog from "./DepartmentEditDialog";
import DepartmentDeleteDialog from "./DepartmentDeleteDialog";
export default function DepartmentTable({departments}) {
  
    return (
        <Card>
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
                    <TableBody>
                        {departments.map((department) => (
                            <TableRow key={department._id}>
                                <TableCell>{department.name}</TableCell>
                                <TableCell className="flex gap-4">
                                    <DepartmentEditDialog id={department._id}/>
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

