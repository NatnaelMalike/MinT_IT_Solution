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

export default function DepartmentDeleteDialog({ id }) {
    const deleteDepartment = () => {
        axios
            .delete(`http://localhost:4000/api/department/${id}`)
            .then(() => {
                toast("Department Deleted Successfully!");
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
                    <DialogTitle>Deleting Department</DialogTitle>
                    <DialogDescription>
                        Are You Sure to delete this Department ?
                    </DialogDescription>
                </DialogHeader>
                <div className="flex gap-4">
                    <Button
                        onClick={deleteDepartment}
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
