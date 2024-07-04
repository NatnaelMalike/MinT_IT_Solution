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
import axios from "axios";
import { toast } from "sonner";
import { useEffect, useState } from "react";

const formSchema = z.object({
    request_id: z.string().min(1, { message: "request must be selected!" }),
    technician_id: z.string().min(1, { message: "Technician must be selected" })
});

export default function RequestAssignmentForm({ request_id }) {
    const [technicians, setTechnicians] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:4000/api/technician")
            .then((response) => {
                setTechnicians(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            technician_id: "",
            request_id: request_id
        },
    });

    const onSubmit = (data) => {
        console.log(data); // Ensure data is logged
        axios
            .post("http://localhost:4000/api/assign_technician", data)
            .then(() => {
                toast("Technician Assigned Successfully!");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="technician_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Technicians</FormLabel>
                            <Select onValueChange={field.onChange}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Technician" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {technicians && technicians.map((technician) => (
                                        <SelectItem key={technician._id} value={technician._id} className="border-b">
                                            <div>
                                                <p>Name: {technician.fullName}</p>
                                                <p>Profession: {technician.profession}</p>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormDescription className="hidden lg:block">
                                This is the Technician to be Assigned.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Assign</Button>
            </form>
        </Form>
    );
}
