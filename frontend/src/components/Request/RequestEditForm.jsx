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

import axios from "axios";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useContext, useEffect, useState } from "react";
import { DialogContext, IdContext } from "@/contexts/Context";
import { TailSpin } from "react-loader-spinner";
import { DialogClose } from "../ui/dialog";
import { useRequestContext } from "@/hooks/useRequestContext";

const formSchema = z.object({
    issueType: z.string().min(6, { message: "Issue Type must be selected!" }),
    description: z.string().min(1, { message: "Description is required" }),
});

export default function RequestEditForm() {
    const [loading, setLoading] = useState(false);

    const id = useContext(IdContext);
    const { token } = useAuthContext();
    const handleDialogChange = useContext(DialogContext);
    const { dispatch } = useRequestContext();


    const form = useForm({
        resolver: zodResolver(formSchema),
    });
    useEffect(() => {
        axios
            .get(`http://localhost:4000/api/request/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                form.setValue("issueType", response.data.issueType);
                form.setValue("description", response.data.description);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    function onSubmit(data) {
        setLoading(true);
        axios
            .put(`http://localhost:4000/api/request/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setLoading(false);
                handleDialogChange();
                toast.success("Request Updated Successfully!");
                dispatch({ type: "UPDATE_REQUEST", payload: res.data });
            })
            .catch((error) => {
                toast.error("Request Updating Failed!");
                setLoading(false);
            });
    }

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8">
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
                                    This is your description about the problem
                                    you faced.
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
          
        </>
    );
}
