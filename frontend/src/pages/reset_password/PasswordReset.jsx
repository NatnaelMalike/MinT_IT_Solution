import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
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
import logo from "../../assets/img/MinT-Logo.jpg";

import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useParams, useLocation } from 'react-router-dom';
const formSchema = z.object({
    password: z.string().min(6, {message: "Password must be 6 or more characters long" }),
    password_confirmation: z.string().min(6, {message: "Password must be 6 or more characters long" }),
});

export default function PasswordReset() {
    const navigate = useNavigate()
    const {token} = useParams()
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('email');

    const form = useForm({
        resolver: zodResolver(formSchema),
    });

    function onSubmit(data) {
        axios.post(`http://localhost:8000/api/reset-password/${token}/${email}`, data)
            .then(() => {
                console.log('success');
                navigate('/');
            })
            .catch((err) => {
                console.log(err.response.data); 
            })
    }

    return (
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col gap-20">
            <div>
                <img src={logo} alt="" />
            </div>

        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <h1 className="text-xl text-center">Reset Password</h1>

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

               <Button type='submit'>Submit</Button>
            </form>
        </Form>
        </div>
    );
}
