import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import { z } from "zod";
import { cn } from "@/lib/utils";

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
import { Check, ChevronsUpDown, EyeIcon, EyeOffIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useSignup } from "@/hooks/useSignup";
import { TailSpin } from "react-loader-spinner";

const formSchema = z
  .object({
    email: z.string().email({ message: "Invalid Email Address" }),
    password: z
      .string()
      .min(6, { message: "Password must be 6 or more characters long" }),
    fullName: z
      .string()
      .min(6, { message: "Name must be 6 or more characters long" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be 6 or more characters long" }),

    department: z.string().min(1, {
      message: "Please select a department.",
    }),
    phone: z.string().refine((value) => /^(?:\+251)?0[1-9]\d{8}$/.test(value), {
      message: "Invalid phone number format",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // set the path of the error
  });

export default function UserForm() {
  const { signup, isLoading, error } = useSignup();
  const [departments, setDepartments] = useState([]);
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
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      fullName: "",
      phone: "",
      department: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data) {
    signup(data, "user");
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid md:grid-cols-2 lg:gap-x-[10%] gap-4 w-3/4 mx-auto items-start"
      >
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter Your Full Name" {...field} />
              </FormControl>
              <FormDescription>
                This is your Full Name for The MinT_IT_Solution user account.
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
                <Input placeholder="Enter Your Email" {...field} />
              </FormControl>
              <FormDescription>
                This is your email address for The MinT_IT_Solution user
                account.
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
                <Input placeholder="Enter Your Phone Number" {...field} />
              </FormControl>
              <FormDescription>
                This is your phone number for The MinT_IT_Solution user account.
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
                        "w-full justify-between text-base",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? departments.find(
                            (department) => department._id === field.value
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
                    <CommandEmpty>No Department found.</CommandEmpty>
                    <CommandGroup>
                      {departments.map((department) => (
                        <CommandItem
                          value={department._id}
                          key={department._id}
                          onSelect={() => {
                            form.setValue("department", department._id);
                          }}
                        >
                          {department.name}
                          <Check
                            className={cn(
                              "ml-auto h-4 w-4",
                              department._id === field.value
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
              <FormDescription>
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
                <div className="relative ">
                  <Input
                    type={isvisible ? "text" : "password"}
                    placeholder={"Enter Your Password"}
                    {...field}
                  />
                  <span
                    className="absolute top-1/2 -translate-y-1/2 items-center cursor-pointer right-0 mr-4"
                    onClick={togglePasswordVisibility}
                  >
                    {isvisible ? (
                      <EyeOffIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </span>
                </div>
              </FormControl>
              <FormDescription>
                This is your password for The user account.
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
                <div className="relative ">
                  <Input
                    type={isvisible ? "text" : "password"}
                    placeholder={"Enter Your Password"}
                    {...field}
                  />
                  <span
                    className="absolute top-1/2 -translate-y-1/2 items-center cursor-pointer right-0 mr-4"
                    onClick={togglePasswordVisibility}
                  >
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
        <FormMessage className="text-center text-base p-4">
          {error && error}
        </FormMessage>
        <Button
          disabled={isLoading}
          type="submit"
          className="mt-4 col-span-2 place-self-center w-1/2"
        >
          {isLoading ? (
            <TailSpin color="#fff" height={30} width={30} />
          ) : (
            "Register"
          )}
        </Button>
      </form>
    </Form>
  );
}
