import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useContext, useEffect } from "react";
import axios from "axios";
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
import {
    Card,
    CardContent,
  
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { IdContext } from "@/contexts/Context";

const formSchema = z.object({
    email: z.string().email({ message: "Invalid Email Address" }),
    fullName: z.string().min(1, { message: "Name is required" }),
    department: z.string().min(1, { message: "Department should be selected" }),
    phone: z.string().refine((value) => /^(?:\+251)?09\d{8}$/.test(value), {
        message: "Invalid phone number format",
    }),
});

export default function TechnicianEditForm() {
    const id = useContext(IdContext);
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            fullName: "",
            phone: "",
            department: "",
        },
    });
    useEffect(() => {
        axios
            .get(`http://localhost:4000/api/technician/${id}`)
            .then((response) => {
                form.setValue("email", response.data.email);
                form.setValue("fullName", response.data.fullName);
                form.setValue("phone", response.data.phone);
                form.setValue("department", response.data.department);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    function onSubmit(data) {
        axios
            .put(`http://localhost:4000/api/technician/${id}`, data)
            .then(() => {
                toast("Technician User Updated Successfully");
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <Card>
            <CardContent>
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
                                technician account.
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
                                MinT_IT_Solution technician account.
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
                                MinT_IT_Solution technician account.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Profession</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Profession" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Profession 1">
                                        Proffession 1
                                    </SelectItem>
                                    <SelectItem value="Profession 2">
                                        Profession 2
                                    </SelectItem>
                                    <SelectItem value="Profession 3">
                                        Profession 3
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                This is your profession for The MinT_IT_Solution
                                technician account.
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
