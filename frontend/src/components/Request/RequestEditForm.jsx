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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useContext, useEffect } from "react";
import { DialogContext, IdContext } from "@/contexts/Context";


const formSchema = z.object({
    issueType: z
        .string()
        .min(6, { message: "Issue Type must be selected!" }),
    description: z.string().min(1, { message: "Description is required" })
});

export default function RequestEditForm() {
    const id = useContext(IdContext);
    const {token} = useAuthContext();
    const form = useForm({
        resolver: zodResolver(formSchema)
    });
    useEffect(() => {
        axios
            .get(`http://localhost:4000/api/request/${id}`,{
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            })
            .then((response) => {
                form.setValue("issueType", response.data.issueType);
                form.setValue("description", response.data.description);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    function onSubmit(data) {
        axios
            .put(`http://localhost:4000/api/request/${id}`, data, {
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            })
            .then(() => {
                toast.success("Requested Updated Successfully!");
            })
            .catch((err) => {
                toast.error("Requested Updating Failed!");
            });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Problem Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Please state details about your issue"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                This is your description about the problem you faced.
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
