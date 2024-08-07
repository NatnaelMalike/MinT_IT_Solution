import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogClose,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useContext, useState } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useRequestContext } from "@/hooks/useRequestContext";
import { TailSpin } from "react-loader-spinner";

export default function RequestDeleteDialog({ id }) {
    const {token} = useAuthContext();
    const { dispatch } = useRequestContext();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    function handleDialogChange() {
        setOpen(!open);
    }
    const deleteRequest = () => {
        setLoading(true)
        axios
            .delete(`http://localhost:4000/api/request/${id}`, {
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            })
            .then(() => {
                setLoading(false);
                handleDialogChange();
                dispatch({ type: "DELETE_REQUEST", payload: id });
                toast.success("Request Deleted Successfully!");
            })
            .catch((err) => {
                setLoading(false);
                toast.error("Request deletion Failed!")
                console.log(err);

            });
    };
    return (
        <Dialog open={open} onOpenChange={handleDialogChange}>
            <DialogTrigger asChild>
                <Trash2 className="cursor-pointer text-destructive" />
            </DialogTrigger>
            <DialogContent onInteractOutside={(e) => e.preventDefault()}>
            <DialogHeader>
                    <DialogTitle className="text-xl text-center mb-2">
                        Are You absolutely Sure?
                    </DialogTitle>
                    <DialogDescription className="text-base text-center mb-2">
                        This action cannot be undone. This will permanently
                        remove the user from our servers.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex gap-8 px-12">
                    <Button
                        disabled={loading}
                        onClick={deleteRequest}
                        className="grow"
                        variant="destructive">
                        {loading ? (
                            <TailSpin color="#fff" height={30} width={30} />
                        ) : (
                            "Continue"
                        )}
                    </Button>
                    <DialogClose asChild>
                        <Button className="grow">Cancel</Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    );
}
