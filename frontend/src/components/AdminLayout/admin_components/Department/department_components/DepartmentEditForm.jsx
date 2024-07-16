import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "sonner";
import { DialogContext, IdContext } from "@/contexts/Context";
import { useDepartmentContext } from "@/hooks/useDepartmentContext";
import { TailSpin } from "react-loader-spinner";
import { DialogClose } from "@/components/ui/dialog";

const formSchema = z.object({
    name: z.string().min(1, { message: "Department is required" }),
});

export default function DepartmentEditForm() {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const handleDialogChange = useContext(DialogContext);
    const { departments, dispatch } = useDepartmentContext();
    const id = useContext(IdContext);
    const dept = departments.find((dep) => dep._id === id);
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });
    useEffect(() => {
    form.setValue("name", dept.name)},[])

    function onSubmit(data) {
        setLoading(true);
        axios
            .put(`http://localhost:4000/api/department/${id}`, data)
            .then((res) => {
                setLoading(false);
                handleDialogChange();
                toast.success("The department has been updated Successfully");
                dispatch({ type: "UPDATE_DEPARTMENT", payload: res.data });
            })
            .catch((err) => {
                toast.error(
                    "Failed to update the department, Please try again."
                );
                setLoading(false);
                setError(err.response.data);
            });
    }

    return (
        <Card>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 pt-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Department Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter Department Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        This is the Department Name for The MinT
                                        Government Office.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex gap-8">
                            <Button
                                disabled={loading}
                                type="submit"
                                className="grow">
                                {loading ? (
                                    <TailSpin
                                        color="#fff"
                                        height={30}
                                        width={30}
                                    />
                                ) : (
                                    "Continue"
                                )}
                            </Button>
                            <DialogClose asChild>
                                <Button className="grow" variant="destructive">
                                    Cancel
                                </Button>
                            </DialogClose>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
