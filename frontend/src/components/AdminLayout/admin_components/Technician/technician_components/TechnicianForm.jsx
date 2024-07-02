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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import { Card, CardContent } from "@/components/ui/card";

import { cn } from "@/lib/utils";

import { Check, ChevronsUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "sonner";
import { useSignup } from "@/hooks/useSignup";
import { useEffect, useState } from "react";

const formSchema = z.object({
    email: z.string().email({ message: "Invalid Email Address" }),
    password: z
        .string()
        .min(6, { message: "Password must be 6 or more characters long" }),
    fullName: z.string().min(1, { message: "Name is required" }),
    department: z.string().min(1, { message: "Department must be selected" }),
    profession: z.string().min(1, { message: "Profession must be selected" }),
    phone: z.string().refine((value) => /^(?:\+251)?09\d{8}$/.test(value), {
        message: "Invalid phone number format",
    }),
});

export default function TechnicianForm() {
    const {signup, isLoading, error} = useSignup()
    const [departments, setDepartments] = useState([]);
   
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
            department: "",
            profession: ""
        },
    });

    function onSubmit(data) {
        console.log(data)
      signup(data ,'technician', 'ADD_TECHNICIAN')
    }

    return (
        <Card className="max-sm:w-11/12 max-lg:w-5/6 mx-auto lg:min-w-[800px] p-4">
            <CardContent>

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-12 max-md:flex-col ">
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
                                This is your profession for The MinT_IT_Solution
                                technician account.
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
                            <FormLabel>Department</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                "w-full justify-between",
                                                !field.value &&
                                                    "text-muted-foreground"
                                            )}>
                                            {field.value
                                                ? departments.find(
                                                      (department) =>
                                                          department._id ===
                                                          field.value
                                                  )?.name
                                                : "Select Your Department"}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="p-0 max-h-80 overflow-y-scroll">
                                    <Command>
                                        <CommandInput
                                            placeholder="Search Department..."
                                            className="h-9"
                                        />
                                        <CommandEmpty>
                                            No City found.
                                        </CommandEmpty>
                                        <CommandGroup>
                                            {departments.map((department) => (
                                                <CommandItem
                                                    value={department._id}
                                                    key={department._id}
                                                    onSelect={() => {
                                                        form.setValue(
                                                            "department",
                                                            department._id
                                                        );
                                                    }}>
                                                    {department.name}
                                                    <Check
                                                        className={cn(
                                                            "ml-auto h-4 w-4",
                                                            department._id ===
                                                                field.value
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )}
                                                    />
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormDescription className="hidden lg:block">
                                This is the name of the Your Department.
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
                            <FormDescription className="hidden lg:block">
                                This is your password for The technician
                                account.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
             </div>
            </form>
        </Form>
            </CardContent>
        </Card>
    );
}
