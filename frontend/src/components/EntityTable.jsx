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

const EntityTable = ({ entities, config }) => {
    return (
        
            <div className="overflow-x-auto">
                <Table className="min-w-[840px] w-full border-collapse">
                    <TableHeader>
                        <TableRow>
                            {config.headers.map((header) => (
                                <TableHead key={header} className="whitespace-nowrap">{header}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {entities && entities.map((entity) => (
                            <TableRow key={entity._id}>
                                {config.fields.map((field, index) => (
                                    <TableCell key={index}>
                                        {typeof field === "function"
                                            ? field(entity)
                                            : entity[field]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        
    );
};
export default EntityTable;
