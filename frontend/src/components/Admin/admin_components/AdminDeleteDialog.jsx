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
import { useAdminContext } from "@/hooks/useAdminContext";
import { TailSpin } from "react-loader-spinner";

export default function AdminDeleteDialog({ id }) {
    const [open, setOpen] = useState(false);
    function handleDialogChange() {
        setOpen(!open);
    }
    const [loading, setLoading] = useState(false);
    const { dispatch } = useAdminContext();
    const deleteAdminUser = () => {
        setLoading(true);
        axios
            .delete(`http://localhost:4000/api/admin/${id}`)
            .then(() => {
                setLoading(false);
                handleDialogChange();
                toast.success("The user has been successfully deleted.");
                dispatch({ type: "DELETE_ADMIN", payload: id });
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
                    <DialogTitle>Are You absolutely Sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently
                        remove the user from our servers.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex gap-8">
                    <Button
                        disabled={loading}
                        onClick={deleteAdminUser}
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
