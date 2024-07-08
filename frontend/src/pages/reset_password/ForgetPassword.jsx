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
import logo from "../../assets/img/MinT-Logo.jpg";
import { toast } from "sonner";
import axios from "axios";

const formSchema = z.object({
    email: z.string().email({ message: "Invalid Email Address" }),
});

export default function ForgetPassword() {

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    function onSubmit(data) {
        
        axios.post('http://localhost:4000/api/forgot-password', data)
            .then(()=>{
                console.log('success');
                toast.success('Email Sent Successfully')
            }).catch((err)=>{
                console.log(err)
                toast.error('Email Not Found')
            })
    }

    return (
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col gap-20">
            <div>
                <img src={logo} alt="" />
            </div>
            
            <Form {...form}>
            
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 text-base">
                        <h1 className="text-xl text-center">Forgot Password</h1>
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
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    );
}
