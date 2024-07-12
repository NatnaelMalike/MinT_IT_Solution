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

export default function RequestDeleteDialog({ id }) {
    const {token} = useAuthContext();
    const [open, setOpen] = useState(false);
    function handleDialogChange() {
        setOpen(!open);
    }
    const deleteRequest = () => {
        
        axios
            .delete(`http://localhost:4000/api/request/${id}`, {
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            })
            .then(() => {
                handleDialogChange();
                toast.success("Request Deleted Successfully!");
            })
            .catch((err) => {
                toast.error("Request deletion Failed!")
                console.log(err);

            });
    };
    return (
        <Dialog open={open} onOpenChange={handleDialogChange}>
            <DialogTrigger asChild>
                <Trash2 className="cursor-pointer text-destructive" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="space-y-4">
                    <DialogTitle>Delete This Request</DialogTitle>
                    <DialogDescription>
                        Are You Sure to delete this Request?
                    </DialogDescription>
                </DialogHeader>
                <div className="flex gap-4">
                    <Button
                        onClick={deleteRequest}
                        className="grow"
                        variant="destructive">
                        Yes
                    </Button>
                    <DialogClose asChild>
                        <Button className="grow">No</Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    );
}
