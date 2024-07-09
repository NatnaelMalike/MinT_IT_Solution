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
import StatusEditForm from "../Request/StatusEditForm";
import EditDialog from "../EditDialog";
import { IdContext } from "@/contexts/Context";


const TechnicianRequestTable = () => {
   const {requests} = useRequestContext()
   console.log("Tech",requests)
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
                            <TableHead>Requested At</TableHead>
                            <TableHead>Change Status</TableHead>

                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {requests && requests.map((request) => (
                            <TableRow key={request._id}>
                                <TableCell>{request.request_id.user_id.fullName}</TableCell>
                                <TableCell>{request.request_id.user_id.department.name}</TableCell>
                                <TableCell>{request.request_id.user_id.phone}</TableCell>
                                <TableCell>{request.request_id.issueType}</TableCell>
                                <TableCell>{request.request_id.description}</TableCell>
                                <TableCell>{request.request_id.status}</TableCell>
                                <TableCell>{request.request_id.createdAt}</TableCell>
                                <TableCell className="flex gap-4">
                                <IdContext.Provider value={request.request_id._id}>
                                        <EditDialog entity="Request Status">
                                            <StatusEditForm />
                                        </EditDialog>
                                    </IdContext.Provider>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        </div>
    );
};

export default TechnicianRequestTable;
