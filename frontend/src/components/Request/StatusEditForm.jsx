import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useContext, useEffect, useState } from "react";
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
import { Card, CardContent } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { toast } from "sonner";
import { DialogContext, IdContext } from "@/contexts/Context";
import { useAuthContext } from "@/hooks/useAuthContext";
import { TailSpin } from "react-loader-spinner";
import { DialogClose } from "../ui/dialog";
import { useRequestContext } from "@/hooks/useRequestContext";

const formSchema = z.object({
    status: z.string().min(1, { message: "Department is required" }),
});

export default function StatusEditForm() {
    const id = useContext(IdContext);
    const [loading, setLoading] = useState(false);
    const handleDialogChange = useContext(DialogContext);
    const { dispatch } = useRequestContext();

    const { token } = useAuthContext();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            status: "",
        },
    });
    function onSubmit(data) {
        setLoading(true)
        axios
            .put(`http://localhost:4000/api/request/status/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setLoading(false);
                handleDialogChange();
                toast.success("Request Status updated Successfully!");
                
                    axios
                        .get("http://localhost:4000/api/assign_technician",{
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        })
                        .then((response) => {
                            dispatch({ type: 'SET_REQUESTS', payload: response.data });
                            console.log(response.data)
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                
                

            })
            .catch((err) => {
                console.log(err);
                toast.error("Request Status updating Failed!");

            });
    }

    return (
        <Card>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8">
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Choose Status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Pending">
                                                Pending
                                            </SelectItem>
                                            <SelectItem value="inProgress">
                                                inProgress
                                            </SelectItem>
                                            <SelectItem value="Resolved">
                                                Resolved
                                            </SelectItem>
                                            <SelectItem value="UnResolved">
                                                UnResolved
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription className="hidden lg:block">
                                        This is the Technician's response for
                                        the Request.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

<div className="flex gap-8 grow items-end">
                        <Button
                            disabled={loading}
                            type="submit"
                            className="grow">
                            {loading ? (
                                <TailSpin color="#fff" height={30} width={30} />
                            ) : (
                                "Continue"
                            )}
                        </Button>
                        <DialogClose asChild>
                            <Button className="grow" variant="destructive">
                                Cancel
                            </Button>
                        </DialogClose>
                    </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
