import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useContext, useEffect, useRef, useState } from "react";
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

import { Input } from "@/components/ui/input";
import axios from "axios";
import { DialogContext, IdContext } from "@/contexts/Context";
import { TailSpin } from "react-loader-spinner";
import { DialogClose } from "@/components/ui/dialog";
import { useAdminContext } from "@/hooks/useAdminContext";
import { useUsersContext } from "@/hooks/useUsersContext";
const formSchema = z.object({
    password: z
    .string()
    .min(6, { message: "Password must be 6 or more characters long" }),
  
});

export default function UserEditForm() {
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false);
    const id = useContext(IdContext);
    const handleDialogChange = useContext(DialogContext);
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
           password: ''
        },
    });

    function onSubmit(data) {
        setLoading(true);
        axios
            .put(`http://localhost:4000/api/user/${id}`, data)
            .then((res) => {
                setLoading(false);
                handleDialogChange();
                toast.success(
                    "The User's password has been changed Successfully"
                );
            })
            .catch((error) => {
                toast.error("Failed to change the password, Please try again.");
                setLoading(false);
                setError(error.response.data)
            });
    }

    return (
        <Card>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 pt-4">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter Your New Password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        This is your new passsword for The
                                        MinT_IT_Solution admin account.
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
                                <Button className="grow" variant="destructive">
                                    Cancel
                                </Button>
                            </DialogClose>
                        </div>
                    </form>
                </Form>
                {<p className="text-center text-destructive mt-4 font-medium">{error && error}</p>}
            </CardContent>
        </Card>
    );
}
