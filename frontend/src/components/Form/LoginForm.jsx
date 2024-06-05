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

const formSchema = z.object({
    email: z.string().email({message:"Invalid Email Address"}),
    password: z.string().min(6, {message: "Password must be 6 or more characters long" }),
});

export default function LoginForm() {
    const {login, isLoading, error} = useLogin()
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(data) {
        login(data)
    }

    return (
        <Form {...form} >
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
                            <FormDescription>
                                This is your email address for The
                                MinT_IT_Solution account.
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
                                This is your password for The MinT_IT_Solution
                                account.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Log in</Button>
            </form>
        </Form>
    );
}
