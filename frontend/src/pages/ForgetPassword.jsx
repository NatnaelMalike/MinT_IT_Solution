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
import axios from "axios";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
    email: z.string().email({ message: "Invalid Email Address" }),
});

export default function ForgetPassword() {
    const navigate = useNavigate()
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    function onSubmit(data) {
        setLoading(true);
        axios.post('http://localhost:4000/api/forgot-password', data)
            .then((res)=>{
                setLoading(false)
                navigate(`/admin/reset-password/${res.data}`)
            }).catch((error)=>{
               
                setLoading(false);
                setError(error.response.data);
            })
    }
    return (
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col py-10 gap-20">
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
            
            {<p className="text-center text-destructive mt-4 font-medium">{error && error}</p>}
        </div>
    );
}
