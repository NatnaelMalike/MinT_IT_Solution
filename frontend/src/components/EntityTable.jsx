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
import { ThreeDots } from "react-loader-spinner";

const EntityTable = ({ loading, entities, config }) => {
    const hasEntities = entities && entities.length > 0;
    return (
        <div className="overflow-x-auto">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">{config.entity}</CardTitle>
                    <CardDescription className="text-base">
                        A list of all{" "}
                        <span className="lowercase">{config.entity}</span>
                    </CardDescription>
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
                    ) : hasEntities ? (
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
                                {entities.map((entity) => (
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
