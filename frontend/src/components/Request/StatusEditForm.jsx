import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useContext, useEffect } from "react";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { toast } from "sonner";
import { IdContext } from "@/contexts/Context";
import { useAuthContext } from "@/hooks/useAuthContext";

const formSchema = z.object({
    status: z.string().min(1, { message: "Department is required" }),
});

export default function StatusEditForm() {
    const id = useContext(IdContext);
    const { token } = useAuthContext();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            status: "",
        },
    });
    function onSubmit(data) {
        axios
            .put(`http://localhost:4000/api/request/status/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => {
                toast("Request Status updated Successfully!");
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <Card>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8">
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Choose Status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Pending">
                                                Pending
                                            </SelectItem>
                                            <SelectItem value="inProgress">
                                                inProgress
                                            </SelectItem>
                                            <SelectItem value="Resolved">
                                                Resolved
                                            </SelectItem>
                                            <SelectItem value="UnResolved">
                                                UnResolved
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription className="hidden lg:block">
                                        This is the Technician's response for
                                        the Request.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
