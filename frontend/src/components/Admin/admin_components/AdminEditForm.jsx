import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useContext, useEffect, useRef, useState } from "react";
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
import { Input } from "@/components/ui/input";
import axios from "axios";
import { DialogContext, IdContext } from "@/contexts/Context";
import { TailSpin } from "react-loader-spinner";
import { DialogClose } from "@/components/ui/dialog";
import { useAdminContext } from "@/hooks/useAdminContext";
const formSchema = z.object({
    email: z.string().email({ message: "Invalid Email Address" }),
    fullName: z.string().min(1, { message: "Name is required" }),
    department: z.string().min(1, { message: "Department must be selected" }),
    phone: z.string().refine((value) => /^(?:\+251)?0[1-9]\d{8}$/.test(value), {
        message: "Invalid phone number format",
    }),
});

export default function AdminEditForm() {
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false);
    const [departments, setDepartments] = useState([]);
    const {admins, dispatch } = useAdminContext();
    const id = useContext(IdContext);
    const handleDialogChange = useContext(DialogContext);

    const user = admins.find((user)=> user._id === id)
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
            .get("http://localhost:4000/api/department")
            .then((response) => {
                setDepartments(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
                form.setValue("email", user.email);
                form.setValue("fullName", user.fullName);
                form.setValue("phone", user.phone);
                form.setValue("department", user.department._id);
    }, []);

    function onSubmit(data) {
        setLoading(true);
        axios
            .put(`http://localhost:4000/api/admin/${id}`, data)
            .then((res) => {
                setLoading(false);
                handleDialogChange();
                toast.success(
                    "The admin account has been updated Successfully"
                );
                dispatch({ type: "UPDATE_ADMIN", payload: res.data });
            })
            .catch((error) => {
                toast.error("Failed to update the account, Please try again.");
                setLoading(false);
                setError(error.response.data)
            });
    }

    return (
        <Card>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 pt-4">
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
                        <FormField
                            control={form.control}
                            name="department"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Departments</FormLabel>
                                    <Select onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                className="text-primary"
                                                    placeholder={
                                                        user
                                                            ? user.department.name
                                                            : "Select Department"
                                                    }
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="overflow-y-auto max-h-96">
                                            {departments &&
                                                departments.map(
                                                    (department) => (
                                                        <SelectItem
                                                            key={department._id}
                                                            value={
                                                                department._id
                                                            }
                                                            className="border-b">
                                                            {department.name}
                                                        </SelectItem>
                                                    )
                                                )}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription className="hidden lg:block">
                                        This is Your Department in the
                                        Organization.
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
                {<p className="text-center text-destructive mt-4 font-medium">{error && error}</p>}
            </CardContent>
        </Card>
    );
}
