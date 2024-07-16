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
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/useLogin";
import { TailSpin } from "react-loader-spinner";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const formSchema = z.object({
    email: z.string().email({ message: "Invalid Email Address" }),
    password: z
        .string()
        .min(6, { message: "Password must be 6 or more characters long" }),
});

export default function LoginForm() {
    const [isvisible, setVisible] = useState(false);
    const { login, isLoading, error } = useLogin();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const togglePasswordVisibility = () => {
        setVisible(!isvisible);
    };
    function onSubmit(data) {
        login(data);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                            {/* <FormDescription>
                                This is your email address for The
                                MinT_IT_Solution account.
                            </FormDescription> */}
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
                            {/* <FormDescription>
                                This is your password for The MinT_IT_Solution
                                account.
                            </FormDescription> */}
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={isLoading} type="submit" className="grow">
                    {isLoading ? (
                        <TailSpin color="#fff" height={30} width={30} />
                    ) : (
                        "Login"
                    )}
                </Button>
            </form>
            <FormMessage className="text-center p-4 text-base">
                {error && error}
            </FormMessage>
        </Form>
    );
}
