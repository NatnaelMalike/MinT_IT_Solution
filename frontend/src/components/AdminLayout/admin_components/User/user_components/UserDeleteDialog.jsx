import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useContext, useState } from "react";
import { useUsersContext } from "@/hooks/useUsersContext";
import { TailSpin } from "react-loader-spinner";

export default function UserDeleteDialog({ id }) {
    const [open, setOpen] = useState(false);
    function handleDialogChange() {
        setOpen(!open);
    }
    const [loading, setLoading] = useState(false);
    const { dispatch } = useUsersContext();
    const deleteUser = () => {
        setLoading(true);
        axios
            .delete(`http://localhost:4000/api/user/${id}`)
            .then(() => {
                setLoading(false);
                handleDialogChange();
                toast.success("The user has been successfully deleted.");
                dispatch({ type: "DELETE_USER", payload: id });
            })
            .catch((err) => {
                toast.error("Failed to delete the user. Please try again.");
                setLoading(false);
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
                        onClick={deleteUser}
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
