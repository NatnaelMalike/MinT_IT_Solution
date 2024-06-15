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
import { useTechnicianContext } from "@/hooks/useTechnicianContext";
import { useState } from "react";

export default function TechnicianDeleteDialog({ id }) {
    const [open, setOpen] = useState(false);
    function handleDialogChange() {
        setOpen(!open);
    }
    const {dispatch} = useTechnicianContext()
    const deleteTechnicianUser = () => {
        handleDialogChange()
        axios
            .delete(`http://localhost:4000/api/technician/${id}`)
            .then(() => {
                dispatch({type: 'DELETE_TECHNICIAN', payload: id})
                toast("Technician User Deleted Successfully!");

            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <Dialog open={open} onOpenChange={handleDialogChange}>
            <DialogTrigger asChild>
                <Trash2 className="cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className='space-y-4'>
                    <DialogTitle>Delete This Technician User</DialogTitle>
                    <DialogDescription>
                        Are You Sure to delete this Technician User?
                    </DialogDescription>
                </DialogHeader>
                <div className="flex gap-4">
                    <Button
                        onClick={deleteTechnicianUser}
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
