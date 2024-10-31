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
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import emptyPhoto from "@/assets/img/Empty.png";
import { useState } from "react";

const RequestEntityTable = ({ entities, config }) => {
  const [category, setCategory] = useState("all");
  const handleCategoryChange = (value) => {
    setCategory(value);
  };
  const filteredRequests = entities
    ? entities.filter((request) => {
        switch (category) {
          case "resolved":
            return request.status === "Resolved";
          case "pending":
            return request.status === "Pending";
          case "inProgress":
            return request.status === "inProgress";
          case "unResolved":
            return request.status === "UnResolved";
          case "assigned":
            return request.isAssigned;
          case "notAssigned":
            return !request.isAssigned;
          default:
            return true; // Show all for "all"
        }
      })
    : [];
    return (
        <div className=" ">
            <Card className="overflow-y-auto "> 
                <CardHeader>
                <div className="flex justify-between items-center">
            <div className="space-y-2">
              <CardTitle className="text-2xl">{config.entity}</CardTitle>
              <CardDescription className="text-base">
                A list of all <span className="lowercase">{config.entity}</span>
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
                  <SelectItem value="assigned">Assigned</SelectItem>
                  <SelectItem value="notAssigned">Not Assigned</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
                </CardHeader>
                <CardContent >
                    {filteredRequests.length > 0 ? (
                        <Table className="">
                            <TableHeader className="bg-secondary">
                                <TableRow>
                                    {config.headers.map((header) => (
                                        <TableHead
                                            key={header}
                                            className="whitespace-nowrap font-bold text-teal-800 opacity-100">
                                            {header}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredRequests.map((entity) => (
                                        <TableRow key={entity.id}>
                                            {config.fields.map(
                                                (field, index) => (
                                                    <TableCell
                                                        key={`${entity.id}-${index}`}
                                                        className="whitespace-normal"
                                                        >
                                                        {typeof field ===
                                                        "function"
                                                            ? field(entity)
                                                            : entity[field]}
                                                    </TableCell>
                                                )
                                            )}
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
                            <p className="text-2xl text-destructive"> Oops, No {config.entity}!</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};
export default RequestEntityTable;
