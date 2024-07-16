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
import { TailSpin } from "react-loader-spinner";
import { useDepartmentContext } from "@/hooks/useDepartmentContext";
import { useState } from "react";

export default function DepartmentDeleteDialog({ id }) {
    const [open, setOpen] = useState(false);
    function handleDialogChange() {
        setOpen(!open);
    }
    const [loading, setLoading] = useState(false);
    const { dispatch } = useDepartmentContext();
    const deleteDepartment = () => {
        setLoading(true);
        axios
            .delete(`http://localhost:4000/api/department/${id}`)
            .then(() => {
                setLoading(false);
                handleDialogChange();
                toast.success("The department has been successfully deleted.");
                dispatch({ type: "DELETE_DEPARTMENT", payload: id });            })
            .catch((err) => {
                toast.error("Failed to delete the department. Please try again.");
                setLoading(false);
            });
    };
    return (
        <Dialog open={open} onOpenChange={handleDialogChange}>
            <DialogTrigger asChild>
              <Trash2 className="cursor-pointer text-destructive" />
            </DialogTrigger>
            <DialogContent onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader className='space-y-4'>
                <DialogTitle className="text-xl text-center mb-2">Are You absolutely Sure?</DialogTitle>
                    <DialogDescription className="text-base text-center mb-2">
                        This action cannot be undone. This will permanently
                        remove the department from our servers.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex gap-8 px-12">
                    <Button
                        disabled={loading}
                        onClick={deleteDepartment}
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
