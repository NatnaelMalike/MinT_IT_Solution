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
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { useAuthContext } from "@/hooks/useAuthContext";

const formSchema = z.object({
    // user_id: z.string().min(1, { message: "User have to Logged in!" }),
    issueType: z
        .string()
        .min(6, { message: "Issue Type must be selected!" }),
    description: z.string().min(1, { message: "Description is required" })
});

export default function RequestForm() {
    const {token} = useAuthContext()
    const form = useForm({
        resolver: zodResolver(formSchema)
    });

    function onSubmit(data) {
        console.log('User Req', token)
        axios
            .post("http://localhost:4000/api/request", data, {
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            })
            .then(() => {
                toast("Issue Requested Successfully!");
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                    control={form.control}
                    name="issueType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Issue Type</FormLabel>
                            <Select onValueChange={field.onChange}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select The Issue You Encountered" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Application crashes or errors">
                                    Application crashes or errors
                                    </SelectItem>
                                    <SelectItem value="Computer malfunction">
                                    Computer malfunction
                                    </SelectItem>
                                    <SelectItem value="Email issues">
                                    Email issues
                                    </SelectItem>
                                    <SelectItem value="Internet connectivity issues">
                                    Internet connectivity issues
                                    </SelectItem>
                                    <SelectItem value="Network equipment">
                                    Network equipment
                                    </SelectItem>
                                    <SelectItem value="Password issues">
                                    Password issues
                                    </SelectItem>
                                    <SelectItem value="Peripheral device problems">
                                    Peripheral device problems
                                    </SelectItem>
                                    <SelectItem value="Printer issues">
                                    Printer issues
                                    </SelectItem>
                                    <SelectItem value="Software installation or update issues">
                                    Software installation or update issues
                                    </SelectItem>
                                    <SelectItem value="System performance issues">
                                    System performance issues
                                    </SelectItem>
                                    <SelectItem value="Unauthorized access or hacking attempts">
                                    Unauthorized access or hacking attempts
                                    </SelectItem>
                                    <SelectItem value="Virus or malware infection">
                                    Virus or malware infection
                                    </SelectItem>
                                    <SelectItem value="General IT support">
                                    General IT support
                                    </SelectItem>
                                    <SelectItem value="Miscellaneous issues">
                                    Miscellaneous issues
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                This is the Issue You Encountered
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Problem Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Please state details about your issue"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                This is your description about the problem you faced.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
