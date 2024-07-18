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

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "sonner";
import { useContext, useEffect, useState } from "react";
import { useTechnicianContext } from "@/hooks/useTechnicianContext";
import { DialogContext } from "@/contexts/Context";
import { TailSpin } from "react-loader-spinner";
import { DialogClose } from "@/components/ui/dialog";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const formSchema = z.object({
    email: z.string().email({ message: "Invalid Email Address" }),
    password: z
        .string()
        .min(6, { message: "Password must be 6 or more characters long" }),
    confirmPassword: z.string().min(6, { message: "Password must be 6 or more characters long" }),
    fullName: z.string().min(1, { message: "Name is required" }),
    department: z.string().min(1, { message: "Department must be selected" }),
    profession: z.string().min(1, { message: "Profession must be selected" }),
    phone: z.string().refine((value) => /^(?:\+251)?09\d{8}$/.test(value), {
        message: "Invalid phone number format",
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // set the path of the error
});


export default function TechnicianForm() {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [isvisible, setVisible] = useState(false);

    const [departments, setDepartments] = useState([]);
    const { dispatch } = useTechnicianContext();
    const handleDialogChange = useContext(DialogContext);
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
    
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            fullName: "",
            phone: "",
            password: "",
            confirmPassword: "",
            department: "",
            profession: "",
        },
    });

    function onSubmit(data) {
        setLoading(true);
        axios
            .post(`http://localhost:4000/api/technician`, data)
            .then((res) => {
                setLoading(false);
                handleDialogChange();
                toast.success(
                    "The Technician user has been created Successfully!"
                );
                dispatch({ type: "ADD_TECHNICIAN", payload: res.data });
            })
            .catch((error) => {
                toast.error(
                    "Failed to create the technician. Please try again."
                );
                setLoading(false);
                setError(error.response.data);
            });
    }

    return (
        <Card className="max-sm:w-11/12 max-lg:w-5/6 mx-auto lg:min-w-[800px] p-4">
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex gap-12 max-md:flex-col ">
                        <div className="flex-col space-y-4">
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
                                        <FormDescription className="hidden lg:block">
                                            This is your Full Name for The
                                            MinT_IT_Solution technician account.
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
                                        <FormDescription className="hidden lg:block">
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
                                        <FormDescription className="hidden lg:block">
                                            This is the phone number for The
                                            MinT_IT_Solution technician account.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex-col space-y-4">
                            <FormField
                                control={form.control}
                                name="profession"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Profession</FormLabel>
                                        <Select onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Profession" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Electrician">
                                                    Electrician
                                                </SelectItem>
                                                <SelectItem value="Cloud Support Specialist">
                                                    Cloud Support Specialist
                                                </SelectItem>
                                                <SelectItem value="Network Engineer">
                                                    Network Engineer
                                                </SelectItem>
                                                <SelectItem value="Data Center Technician">
                                                    Data Center Technician
                                                </SelectItem>
                                                <SelectItem value="Field Service Technician">
                                                    Field Service Technician
                                                </SelectItem>
                                                <SelectItem value="Web Administrator">
                                                    Web Administrator
                                                </SelectItem>
                                                <SelectItem value="Systems Analyst">
                                                    Systems Analyst
                                                </SelectItem>
                                                <SelectItem value="Database Administrator">
                                                    Database Administrator
                                                </SelectItem>
                                                <SelectItem value="IT Support Technician">
                                                    IT Support Technician
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormDescription className="hidden lg:block">
                                            This is your profession for The
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
                                        <FormLabel>Departments</FormLabel>
                                        <Select onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Department" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="overflow-y-auto max-h-96">
                                                {departments &&
                                                    departments.map(
                                                        (department) => (
                                                            <SelectItem
                                                                key={
                                                                    department._id
                                                                }
                                                                value={
                                                                    department._id
                                                                }
                                                                className="border-b">
                                                                {
                                                                    department.name
                                                                }
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
                                        <FormDescription className="hidden lg:block">
                                            This is your password for The
                                            technician account.
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
                                    <Button
                                        className="grow"
                                        variant="destructive">
                                        Cancel
                                    </Button>
                                </DialogClose>
                            </div>
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

