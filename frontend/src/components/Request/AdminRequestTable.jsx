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
import { formatter } from "@/utility/timeFormatter";
import emptyPhoto from "@/assets/img/Empty.png";
const AdminRequestTable = () => {
    const { requests } = useRequestContext();
    console.log('add',requests)
    return (
        <div className="flex flex-col gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>Requests</CardTitle>
                    <CardDescription className="text-base">
                        A list of all Issued Problems
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {
                        requests && requests.length > 0?(

                    <Table className="min-w-[840px] w-full border-collapse overflow-hidden">
                        <TableHeader className="bg-secondary">
                            <TableRow>
                                <TableHead className="whitespace-nowrap font-bold text-teal-800 opacity-100">User Name</TableHead>
                                <TableHead className="whitespace-nowrap font-bold text-teal-800 opacity-100">User's Department</TableHead>
                                <TableHead className="whitespace-nowrap font-bold text-teal-800 opacity-100">User's Phone</TableHead>
                                <TableHead className="whitespace-nowrap font-bold text-teal-800 opacity-100">Issue Type</TableHead>
                                <TableHead className="whitespace-nowrap font-bold text-teal-800 opacity-100">Description</TableHead>
                                <TableHead className="whitespace-nowrap font-bold text-teal-800 opacity-100">Status</TableHead>
                                <TableHead className="whitespace-nowrap font-bold text-teal-800 opacity-100">Is Assigned</TableHead>
                                <TableHead className="whitespace-nowrap font-bold text-teal-800 opacity-100">Requested At</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {requests &&
                                requests.map((request) => (
                                    <TableRow key={request._id}>
                                        <TableCell className="max-w-prose overflow-x-auto whitespace-nowrap">
                                            {request.user_id.fullName}
                                        </TableCell>
                                        <TableCell className="max-w-prose overflow-x-auto whitespace-nowrap">
                                            {request.user_id.department.name}
                                        </TableCell>
                                        <TableCell className="max-w-prose overflow-x-auto whitespace-nowrap">
                                            {request.user_id.phone}
                                        </TableCell>
                                        <TableCell className="max-w-prose overflow-x-auto whitespace-nowrap">
                                            {request.issueType}
                                        </TableCell>
                                        <TableCell className="max-w-prose overflow-x-auto whitespace-nowrap">
                                            {request.description}
                                        </TableCell>
                                        <TableCell className="max-w-prose overflow-x-auto whitespace-nowrap">{request.status}</TableCell>
                                        <TableCell className="max-w-prose overflow-x-auto whitespace-nowrap">
                                            {request.isAssigned ? "Yes" : "No"}
                                        </TableCell>
                                        <TableCell className="max-w-prose overflow-x-auto whitespace-nowrap">
                                        {formatter(request.createdAt)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                        ):
                        <div className="w-full flex flex-col justify-center items-center gap-8">
                            <img
                                src={emptyPhoto}
                                alt="No Data Illustrator"
                                className="max-w-lg"
                            />
                            <p className="text-2xl text-destructive"> Oops, No Requests!</p>
                        </div>
                    }
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminRequestTable;
