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
import { Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
const CustomTable = ({table, titles, entity}) => {
  return (
    <div> <Card>
    <CardHeader>
        <CardTitle className="text-3xl font-medium">Admin Users</CardTitle>
        <CardDescription>Card Description</CardDescription>
    </CardHeader>
    <CardContent>
        <Table>
            <TableHeader>
                <TableRow>
                    {titles.map((title)=>{
                        return <TableHead key={title}>{title}</TableHead>
                    })}
                </TableRow>
            </TableHeader>
            <TableBody>
                {table.map((row) => (
                    <TableRow key={row._id}>
                        {Object.values(row).map((cell)=>(
                            <TableCell>{cell}</TableCell>
                        ))}
                        <TableCell className="flex gap-4">
                            <Link to={`/${entity}/edit/${row._id}`}>
                                <Pencil className="cursor-pointer" />
                            </Link>
                            <Link to={`/${entity}/delete/${row._id}`}>
                                <Trash2 className="cursor-pointer" />
                            </Link>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </CardContent>
    <CardFooter>
        <p>Card Footer</p>
    </CardFooter>
</Card></div>
  )
}

export default CustomTable