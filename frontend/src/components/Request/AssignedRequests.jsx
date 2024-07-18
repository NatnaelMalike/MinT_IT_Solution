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
import emptyPhoto from "@/assets/img/Empty.png";
import { useAuthContext } from "@/hooks/useAuthContext";
import { formatter } from "@/utility/timeFormatter";
const AssignedRequests = () => {
    const { token } = useAuthContext();
    const [requests, setRequests] = useState();
    useEffect(() => {
        if (token) {
            axios
                .get("http://localhost:4000/api/assign_technician", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    setRequests(response.data);
                    console.log(response.data)
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);
    return (
        <div className="flex flex-col gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>Requests</CardTitle>
                    <CardDescription className="text-base">
                        A list of all Assignments
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {requests && requests.length > 0 ? (
                        <Table className="min-w-[840px] w-full border-collapse overflow-hidden">
                            <TableHeader className="bg-secondary">
                                <TableRow>
                                    <TableHead className="whitespace-nowrap font-bold text-teal-800 opacity-100">
                                        User Name
                                    </TableHead>
                                    <TableHead className="whitespace-nowrap font-bold text-teal-800 opacity-100">
                                        User's Phone
                                    </TableHead>
                                    <TableHead className="whitespace-nowrap font-bold text-teal-800 opacity-100">
                                        Issue Type
                                    </TableHead>
                                    <TableHead className="whitespace-nowrap font-bold text-teal-800 opacity-100">
                                        Technician Name
                                    </TableHead>
                                    <TableHead className="whitespace-nowrap font-bold text-teal-800 opacity-100">
                                        Technician Profession
                                    </TableHead>
                                    <TableHead className="whitespace-nowrap font-bold text-teal-800 opacity-100">
                                        Technician Phone
                                    </TableHead>
                                    <TableHead className="whitespace-nowrap font-bold text-teal-800 opacity-100">
                                        Assiged at
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {requests &&
                                    requests.map((request) => (
                                        <TableRow key={request._id}>
                                            <TableCell className="max-w-prose overflow-x-auto whitespace-nowrap">
                                                {request.request_id.user_id.fullName}
                                            </TableCell>
                                            <TableCell className="max-w-prose overflow-x-auto whitespace-nowrap">
                                                {request.request_id.user_id.phone}
                                            </TableCell>
                                            <TableCell className="max-w-prose overflow-x-auto whitespace-nowrap">
                                                {request.request_id.issueType}
                                            </TableCell>
                                            <TableCell className="max-w-prose overflow-x-auto whitespace-nowrap">
                                                {request.technician_id.fullName}
                                            </TableCell>
                                            <TableCell className="max-w-prose overflow-x-auto whitespace-nowrap">
                                                {
                                                    request.technician_id
                                                        .profession
                                                }
                                            </TableCell>
                                            <TableCell className="max-w-prose overflow-x-auto whitespace-nowrap">
                                                {request.technician_id.phone}
                                            </TableCell>
                                            <TableCell className="max-w-prose overflow-x-auto whitespace-nowrap">
                                                {formatter(request.assignedAt)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="w-full flex flex-col justify-center items-center gap-8">
                            <img
                                src={emptyPhoto}
                                alt="No Data Illustrator"
                                className="max-w-lg"
                            />
                            <p className="text-2xl text-destructive">
                                {" "}
                                Oops, No Assigned Requests!
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default AssignedRequests;
