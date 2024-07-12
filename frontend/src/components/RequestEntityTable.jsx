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

const RequestEntityTable = ({ entities, config }) => {
    return (
        <div className="overflow-x-auto ">
            <Card className="overflow-y-auto max-h-96"> 
                <CardHeader>
                    <CardTitle className="text-2xl">{config.entity}</CardTitle>
                    <CardDescription className="text-base">
                        A list of all{" "}
                        <span className="lowercase">{config.entity}</span>
                    </CardDescription>
                </CardHeader>
                <CardContent >
                    {entities ? (
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
                                {entities &&
                                    entities.map((entity) => (
                                        <TableRow key={entity.id}>
                                            {config.fields.map(
                                                (field, index) => (
                                                    <TableCell
                                                        key={index}
                                                        className="max-w-prose overflow-x-auto whitespace-nowrap"
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
