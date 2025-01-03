import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
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
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { DialogContext } from "@/contexts/Context";
import { useContext, useEffect, useState } from "react";
import { DialogClose } from "@/components/ui/dialog";
import { useAdminContext } from "@/hooks/useAdminContext";
import { TailSpin } from "react-loader-spinner";
import { EyeIcon, EyeOffIcon } from "lucide-react";
const formSchema = z.object({
    email: z.string().email({ message: "Invalid Email Address" }),
    password: z
        .string()
        .min(6, { message: "Password must be 6 or more characters long" }),
        confirmPassword: z.string().min(6, { message: "Password must be 6 or more characters long" }),

    fullName: z.string().min(1, { message: "Name is required" }),
    department: z.string().min(1, { message: "Department must be selected" }),
    phone: z.string().refine((value) => /^(?:\+251)?0[1-9]\d{8}$/.test(value), {
        message: "Invalid phone number format",
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // set the path of the error
});

export default function AdminForm() {
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false);
    const [departments, setDepartments] = useState([]);
    const { dispatch } = useAdminContext();
    const [isvisible, setVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setVisible(!isvisible);
    };

    useEffect(() => {
        axios
            .get("http://localhost:4000/api/department")
            .then((response) => {
                setDepartments(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    const handleDialogChange = useContext(DialogContext);
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            fullName: "",
            phone: "",
            password: "",
            department: "",
        },
    });

    function onSubmit(data) {
        setLoading(true);
        axios
            .post(`http://localhost:4000/api/admin`, data)
            .then((res) => {
                setLoading(false);
                handleDialogChange();
                toast.success("The Admin user has been created Successfully!");
                dispatch({ type: "ADD_ADMIN", payload: res.data });
            })
            .catch((error) => {
                toast.error("Failed to create the admin. Please try again.");
                setLoading(false);
                setError(error.response.data)
            });
    }

    return (
        <Card className="max-sm:w-11/12 max-lg:w-5/6 w-full mx-auto lg:min-w-[800px] p-4">
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="pt-4 grid grid-cols-2 gap-x-12 gap-y-8 ">
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
                                            placeholder="Enter Your Phone (09-12-13-14-15)"
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
                                                <SelectValue placeholder="Select Department" className="text-base text-slate-500" />
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
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                    <div
                                    
                                    className="relative ">
                                <Input
                                    type={isvisible ? "text" : "password"}
                                    placeholder={"Enter Your Password"}
                                    
                                    {...field}
                                />
                                <span className="absolute top-1/2 -translate-y-1/2 items-center cursor-pointer right-0 mr-4" onClick={togglePasswordVisibility}>
                                    {isvisible ? (
                                        <EyeOffIcon className="w-5 h-5" />
                                    ) : (
                                        <EyeIcon className="w-5 h-5" />
                                    )}
                                </span>
                                </div>
                                    </FormControl>
                                    <FormDescription>
                                        This is your password for The MinT_IT_Solution admin
                                        account.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                        <div
                                    
                                    className="relative ">
                                <Input
                                    type={isvisible ? "text" : "password"}
                                    placeholder={"Enter Your Password"}
                                    
                                    {...field}
                                />
                                <span className="absolute top-1/2 -translate-y-1/2 items-center cursor-pointer right-0 mr-4" onClick={togglePasswordVisibility}>
                                    {isvisible ? (
                                        <EyeOffIcon className="w-5 h-5" />
                                    ) : (
                                        <EyeIcon className="w-5 h-5" />
                                    )}
                                </span>
                                </div>
                                        </FormControl>
                                        <FormDescription className="hidden lg:block">
                                            Please confirm your password.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        <div className="flex gap-8 col-span-2">
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
                                <Button className="grow" variant="destructive">Cancel</Button>
                            </DialogClose>
                        </div>
                    </form>
                </Form>
                {<p className="text-center text-destructive mt-4 font-medium">{error && error}</p>}
            </CardContent>
        </Card>
    );
}
