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
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Toaster } from "@/components/ui/sonner";

const formSchema = z.object({
    email: z.string().email({ message: "Invalid Email Address" }),
});

export default function ForgetPassword() {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false)
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    function onSubmit(data) {
        setLoading(true);
        axios.post('http://localhost:4000/api/forgot-password', data)
            .then(()=>{
                setLoading(false)
                toast.success('Email Sent Successfully')
                setSent(true)
            }).catch((error)=>{
                toast.error(
                    "Failed to send the email, Please try again."
                );
                setLoading(false);
                setError(error.response.data);
            })
    }

    return (
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col gap-20">
           <Toaster/>
           <div>
                <img src={logo} alt="" />
            </div>
            {
                sent? <main className="grid min-h-full place-items-center  bg-white px-6  sm:py-32 lg:px-8">
                <div className="text-center">
                    <p className="text-3xl font-bold text-teal-600">
                       Email Sent!
                    </p>
                    <h1 className="mt-4 text-2xl font-bold tracking-tight text-primary">
                    Check Your Email and if you don't get it check your Spam Folder also!
                    </h1> 
                </div>
            </main>: 
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
                </form>
            </Form>
            }
            {<p className="text-center text-destructive mt-4 font-medium">{error && error}</p>}
        </div>
    );
}
