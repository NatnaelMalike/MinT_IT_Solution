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
        <div className=" ">
            <Card className="overflow-y-auto "> 
                <CardHeader>
                    <CardTitle className="text-2xl">{config.entity}</CardTitle>
                    <CardDescription className="text-base">
                        A list of all{" "}
                        <span className="lowercase">{config.entity}</span>
                    </CardDescription>
                </CardHeader>
                <CardContent >
                    {entities && entities.length > 0 ? (
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
                                {entities &&
                                    entities.map((entity) => (
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
