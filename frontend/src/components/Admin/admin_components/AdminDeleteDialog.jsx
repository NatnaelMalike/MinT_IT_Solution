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

export default function AdminDeleteDialog({ id }) {
    const [open, setOpen] = useState(false);
    function handleDialogChange() {
        setOpen(!open);
    }
    const deleteAdminUser = () => {
        handleDialogChange();
        axios
            .delete(`http://localhost:4000/api/admin/${id}`)
            .then(() => {
                toast.success("Admin User Deleted Successfully!");
            })
            .catch((err) => {
                toast.error("Admin deletion Failed!")
                console.log(err);

            });
    };
    return (
        <Dialog open={open} onOpenChange={handleDialogChange}>
            <DialogTrigger asChild>
                <Trash2 className="cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="space-y-4">
                    <DialogTitle>Delete This Admin User</DialogTitle>
                    <DialogDescription>
                        Are You Sure to delete this Admin User?
                    </DialogDescription>
                </DialogHeader>
                <div className="flex gap-4">
                    <Button
                        onClick={deleteAdminUser}
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
