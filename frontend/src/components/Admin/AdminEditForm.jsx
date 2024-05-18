import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
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
import { useParams } from "react-router-dom";
const formSchema = z.object({
    email: z.string().email({ message: "Invalid Email Address" }),
    password: z
        .string()
        .min(6, { message: "Password must be 6 or more characters long" }),
    fullName: z.string().min(1, { message: "Name is required" }),
    phone: z.string().refine((value) => /^(?:\+251)?0[1-9]\d{8}$/.test(value), {
        message: "Invalid phone number format",
    }),
});

export default function AdminEditForm() {
    const {id} = useParams()
    const form = useForm({
        resolver: zodResolver(formSchema)
    });
    
    useEffect(() => {
        axios
            .get(`http://localhost:4000/api/admin/${id}`)
            .then((response) => {
                form.setValue("email", response.data.email)
                form.setValue("fullName", response.data.fullName)
                form.setValue("phone", response.data.phone)
                form.setValue("password", response.data.password)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    function onSubmit(data) {
        axios
            .put(`http://localhost:4000/api/admin/${id}`, data)
            .then(() => {
                toast("Admin Account updated Successfully");
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
                                This is your Full Name for The MinT_IT_Solution
                                admin account.
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
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter Your Password"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                This is your password for The admin account.
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
