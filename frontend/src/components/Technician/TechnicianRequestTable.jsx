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
import { formatter } from "@/utility/timeFormatter";

const TechnicianRequestTable = () => {
  const { requests } = useRequestContext();
  console.log("Tech", requests);
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
          <Table>
            <TableHeader className="bg-secondary">
              <TableRow>
                <TableHead className="whitespace-nowrap font-bold text-teal-800 opacity-100">
                  User Name
                </TableHead>
                <TableHead className="whitespace-nowrap font-bold text-teal-800 opacity-100">
                  User's Department
                </TableHead>
                <TableHead className="whitespace-nowrap font-bold text-teal-800 opacity-100">
                  User's Phone
                </TableHead>
                <TableHead className="whitespace-nowrap font-bold text-teal-800 opacity-100">
                  Issue Type
                </TableHead>
                <TableHead className="whitespace-nowrap font-bold text-teal-800 opacity-100">
                  Description
                </TableHead>
                <TableHead className="whitespace-nowrap font-bold text-teal-800 opacity-100">
                  Status
                </TableHead>
                <TableHead className="whitespace-nowrap font-bold text-teal-800 opacity-100">
                  Requested At
                </TableHead>
                <TableHead className="whitespace-nowrap font-bold text-teal-800 opacity-100">
                  Change Status
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
                      {request.request_id.user_id.department.name}
                    </TableCell>
                    <TableCell className="max-w-prose overflow-x-auto whitespace-nowrap">
                      {request.request_id.user_id.phone}
                    </TableCell>
                    <TableCell className="max-w-prose overflow-x-auto whitespace-nowrap">
                      {request.request_id.issueType}
                    </TableCell>
                    <TableCell className="max-w-prose overflow-x-auto whitespace-nowrap">
                      {request.request_id.description}
                    </TableCell>
                    <TableCell className="max-w-prose overflow-x-auto whitespace-nowrap">
                      {request.request_id.status}
                    </TableCell>
                    <TableCell className="max-w-prose overflow-x-auto whitespace-nowrap">
                      {formatter(request.request_id.createdAt)}
                    </TableCell>
                    <TableCell className="flex gap-4">
                      {request.request_id.status === "Resolved" ||
                      request.request_id.status === "UnResolved" ? null : (
                        <IdContext.Provider value={request.request_id._id}>
                          <EditDialog entity="Request Status">
                            <StatusEditForm />
                          </EditDialog>
                        </IdContext.Provider>
                      )}
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
