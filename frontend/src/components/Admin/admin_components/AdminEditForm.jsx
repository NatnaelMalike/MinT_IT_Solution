import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useContext, useEffect, useState } from "react";
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
    Card,
    CardContent,
  
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { DialogContext, IdContext } from "@/contexts/Context";
const formSchema = z.object({
    email: z.string().email({ message: "Invalid Email Address" }),
    fullName: z.string().min(1, { message: "Name is required" }),
    phone: z.string().refine((value) => /^(?:\+251)?0[1-9]\d{8}$/.test(value), {
        message: "Invalid phone number format",
    }),
});

export default function AdminEditForm() {
    const id = useContext(IdContext);
    const handleDialogChange = useContext(DialogContext);
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            fullName: "",
            phone: "",
        },
    });

    useEffect(() => {
        axios
            .get(`http://localhost:4000/api/admin/${id}`)
            .then((response) => {
                form.setValue("email", response.data.email);
                form.setValue("fullName", response.data.fullName);
                form.setValue("phone", response.data.phone);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    function onSubmit(data) {
        handleDialogChange();
        axios
            .put(`http://localhost:4000/api/admin/${id}`, data)
            .then(() => {
                toast.success("Admin Account updated Successfully");
            })
            .catch((err) => {
                toast.error("Admin Account Updating Failed")
                console.log(err);
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
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter Your Full Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        This is your Full Name for The
                                        MinT_IT_Solution admin account.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter Your Email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        This is your email address for The
                                        MinT_IT_Solution admin account.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter Your Phone Number"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        This is your phone number for The
                                        MinT_IT_Solution admin account.
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
