import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "sonner";
import { useDepartmentContext } from "@/hooks/useDepartmentContext";
import { TailSpin } from "react-loader-spinner";
import { DialogClose } from "@/components/ui/dialog";
import { useContext, useState } from "react";
import { DialogContext } from "@/contexts/Context";
import { Card, CardContent } from "@/components/ui/card";

const formSchema = z.object({
    name: z.string().min(1, { message: "Department is required" }),
});

export default function DepartmentForm() {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const { dispatch } = useDepartmentContext();

    const handleDialogChange = useContext(DialogContext);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    function onSubmit(data) {
        setLoading(true);
        axios
            .post("http://localhost:4000/api/department", data)
            .then((res) => {
                setLoading(false);
                handleDialogChange();
                toast.success("The Department has been created Successfully!");
                dispatch({ type: "ADD_DEPARTMENT", payload: res.data });
            })
            .catch((error) => {
                toast.error(
                    "Failed to create the department. Please try again."
                );
                setLoading(false);
                setError(error.response.data);
            });
    }

    return (
        <Card>
            <CardContent>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pt-4">
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
                    <Button disabled={loading} type="submit" className="grow">
                        {loading ? (
                            <TailSpin color="#fff" height={30} width={30} />
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
        {
                    <p className="text-center text-destructive mt-4 font-medium">
                        {error && error}
                    </p>
                }
            </CardContent>
        </Card>
    );
}
