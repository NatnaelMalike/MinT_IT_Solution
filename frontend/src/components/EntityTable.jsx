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
import { ThreeDots } from "react-loader-spinner";
import { useState } from "react";

const EntityTable = ({ loading, entities, config }) => {
    const [category, setCategory] = useState("all");

    const hasEntities = entities && entities.length > 0;
    const handleCategoryChange = (value) => {
      setCategory(value);
    };
    const filteredEntities = entities
    ? entities.filter((entity) => {
        switch (category) {
          case "active":
            return entity.isActive;
          case "notActive":
            return !entity.isActive;
          default:
            return true; // Show all for "all"
        }
      })
    : [];
    return (
        <div className="overflow-x-auto">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
            <div className="space-y-2">
              <CardTitle className="text-2xl">{config.entity}</CardTitle>
              <CardDescription className="text-base">
              A list of all{" "}
              <span className="lowercase">{config.entity}</span>
              </CardDescription>
            </div>
            <Select onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter By" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="notActive">Deleted</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
                </CardHeader>
                <CardContent className="overflow-y-auto max-h-[65vh]">
                    {loading ? (
                        <div className="w-full flex justify-center items-center">
                            <ThreeDots
                                height="80"
                                width="80"
                                color="#4fa94d"
                                radius="9"
                            />{" "}
                            {/* Display a spinner or loading message */}
                        </div>
                    ) : filteredEntities.length > 0 ? (
                        <Table className="min-w-[840px] w-full border-collapse overflow-hidden">
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
                                {filteredEntities.map((entity) => (
                                    <TableRow key={entity._id}>
                                        {config.fields.map((field, index) => (
                                            <TableCell
                                                key={`${entity._id}-${index}`}
                                                className="whitespace-normal">
                                                {typeof field === "function"
                                                    ? field(entity)
                                                    : entity[field]}
                                            </TableCell>
                                        ))}
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
                                Oops, No {config.entity}!
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};
export default EntityTable;
