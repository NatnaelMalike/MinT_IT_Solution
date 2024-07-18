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
import { useContext, useEffect, useState } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import { DialogContext } from "@/contexts/Context";
import { TailSpin } from "react-loader-spinner";
import { DialogClose } from "../ui/dialog";
import { useRequestContext } from "@/hooks/useRequestContext";

const formSchema = z.object({
    request_id: z.string().min(1, { message: "request must be selected!" }),
    technician_id: z.string().min(1, { message: "Technician must be selected" })
});

export default function RequestAssignmentForm({ request_id }) {
    const [technicians, setTechnicians] = useState([]);
    const { token } = useAuthContext();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const handleDialogChange = useContext(DialogContext);
    const { dispatch } = useRequestContext();
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
        setLoading(true);
        if(token){
            axios
                .post("http://localhost:4000/api/assign_technician", data, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then((res) => {

                setLoading(false);
                handleDialogChange();
                toast.success(
                    "The Technician user has been assigned Successfully!"
                );
                axios
                .get("http://localhost:4000/api/request", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then((response) => {
                    dispatch({ type: 'SET_REQUESTS', payload: response.data });
                })
                .catch((error) => {
                    console.log(error);
                });

                })
                .catch((error) => {
                    toast.error(
                        "Failed to create the technician. Please try again."
                    );
                    setLoading(false);
                    setError(error.response.data);
                });
              
        }
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
               <div className="flex gap-8">
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
                                <DialogClose asChild>
                                    <Button
                                        className="grow"
                                        variant="destructive">
                                        Cancel
                                    </Button>
                                </DialogClose>
                            </div>
            </form>
            <p className="text-center text-destructive mt-4 font-medium">
                {error && error}
            </p>
        </Form>
        
        
    );
}
