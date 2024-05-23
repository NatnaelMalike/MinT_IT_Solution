import { Button } from "@/components/ui/button";
import {
    Dialog,
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

export default function TechnicianDeleteDialog({ id }) {
    const deleteTechnicianUser = () => {
        axios
            .delete(`http://localhost:4000/api/technician/${id}`)
            .then(() => {
                toast("Technician User Deleted Successfully!");
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <Dialog>
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
                <Button onClick={deleteTechnicianUser} className='w-1/2 mx-auto'>Yes</Button>
            </DialogContent>
        </Dialog>
    );
}
