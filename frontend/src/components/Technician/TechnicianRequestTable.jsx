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

import { useRequestContext } from "@/hooks/useRequestContext";
import StatusEditForm from "../Request/StatusEditForm";
import EditDialog from "../EditDialog";
import { IdContext } from "@/contexts/Context";
import { formatter } from "@/utility/timeFormatter";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const TechnicianRequestTable = () => {
  const { requests = [] } = useRequestContext(); // Default to an empty array if requests is null or undefined
  const [category, setCategory] = useState("all");

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  // Filter requests based on category
  const filteredRequests = requests
    ? requests.filter((request) => {
        switch (category) {
          case "resolved":
            return request.request_id.status === "Resolved";
          case "pending":
            return request.request_id.status === "Pending";
          case "inProgress":
            return request.request_id.status === "inProgress";
          case "unResolved":
            return request.request_id.status === "UnResolved";
          default:
            return true; // Show all for "all"
        }
      })
    : [];
  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardHeader>
        <div className="flex justify-between items-center">
            <div className="space-y-2">
              <CardTitle>Requests</CardTitle>
              <CardDescription className="text-base">
                A list of all Issued Problems
              </CardDescription>
            </div>
            <Select onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter By" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="inProgress">In Progress</SelectItem>
                  <SelectItem value="unResolved">Un Resolved</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
        {filteredRequests.length > 0 ? (
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
              {filteredRequests.map((request) => (
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
                      request.request_id.status === "UnResolved" ? <p className="text-destructive">No Action</p> : (
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
          </Table>):(
             <div className="w-full flex flex-col justify-center items-center gap-8">
             <img
               src={emptyPhoto}
               alt="No Data Illustrator"
               className="max-w-lg"
             />
             <p className="text-2xl text-destructive"> Oops, No Requests!</p>
           </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TechnicianRequestTable;
