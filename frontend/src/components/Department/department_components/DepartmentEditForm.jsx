import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";
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

const formSchema = z.object({
    name: z.string().min(1, { message: "Department is required" }),
});

export default function DepartmentEditForm({id}) {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });
    useEffect(() => {
        axios
            .get(`http://localhost:4000/api/department/${id}`)
            .then((response) => {
                form.setValue("name", response.data.name);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    function onSubmit(data) {
        axios
            .put("http://localhost:4000/api/department", data)
            .then(() => {
                toast("Department updated Successfully!");
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
