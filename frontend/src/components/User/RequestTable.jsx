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
const RequestTable = () => {
    const {requests}  = useRequestContext()
  return (
    <div>
        <Card>
                <CardHeader>
                    <CardTitle>Requests</CardTitle>
                    <CardDescription>
                        A list of all Issued Problems
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Issue Type</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Is Assigned</TableHead>
                                <TableHead>Requested At</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {requests && requests.map((request) => (
                                <TableRow key={request._id}>
                                    <TableCell>{request.issueType}</TableCell>
                                    <TableCell>{request.description}</TableCell>
                                    <TableCell>{request.status}</TableCell>
                                    <TableCell>{request.isAssigned? "Yes" : "No"}</TableCell>
                                    <TableCell>{request.createdAt}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
    </div>
  )
}

export default RequestTable