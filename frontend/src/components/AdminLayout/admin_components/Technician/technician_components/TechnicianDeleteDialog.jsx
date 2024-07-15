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
import { TailSpin } from "react-loader-spinner";

export default function TechnicianDeleteDialog({ id }) {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    function handleDialogChange() {
        setOpen(!open);
    }
    const {dispatch} = useTechnicianContext()
    const deleteTechnicianUser = () => {
        setLoading(true)
        axios
        .delete(`http://localhost:4000/api/technician/${id}`)
        .then(() => {
            setLoading(false)
                handleDialogChange()
                toast.success("The user has been successfully deleted.");
                dispatch({type: 'DELETE_TECHNICIAN', payload: id})

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
                <DialogHeader className='space-y-4'>
                <DialogTitle className="text-xl text-center mb-2">Are You absolutely Sure?</DialogTitle>
                    <DialogDescription className="text-base text-center mb-2">
                        This action cannot be undone. This will permanently
                        remove the user from our servers.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex gap-8 px-12">
                    <Button
                        disabled={loading}
                        onClick={deleteTechnicianUser}
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
