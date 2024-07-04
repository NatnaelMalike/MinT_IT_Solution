import { useEffect, useState } from "react";
import axios from "axios";
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
import { useRequestContext } from "@/hooks/useRequestContext";
import { Button } from "../ui/button";
import AssignmentDialog from "../Helper_Admin/AssignmentDialog";

const RequestTable = () => {
   const {requests} = useRequestContext()
   console.log(requests)

    return (
        <div className="flex flex-col gap-8">
            <Card>
            <CardHeader>
                <CardTitle>Requests</CardTitle>
                <CardDescription>A list of all  Issued Problems</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User Name</TableHead>
                            <TableHead>User's Department</TableHead>
                            <TableHead>User's Phone</TableHead>
                            <TableHead>Issue Type</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Is Assigned</TableHead>
                            <TableHead>Requested At</TableHead>
                            <TableHead>Assign</TableHead>

                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {requests && requests.map((request) => (
                            <TableRow key={request._id}>
                                <TableCell>{request.user_id.fullName}</TableCell>
                                <TableCell>{request.user_id.department.name}</TableCell>
                                <TableCell>{request.user_id.phone}</TableCell>
                                <TableCell>{request.issueType}</TableCell>
                                <TableCell>{request.description}</TableCell>
                                <TableCell>{request.status}</TableCell>
                                <TableCell>{request.isAssigned? "Yes" : "No"}</TableCell>
                                <TableCell>{request.createdAt}</TableCell>
                               {
                                request.isAssigned? null: <TableCell><AssignmentDialog request_id={request._id}/></TableCell>
                               }

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        </div>
    );
};

export default RequestTable;
