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
import { useState } from "react";
import RequestAssignmentForm from "./AssignmentForm";
export default function AssignmentDialog({request_id}) {
    const [open, setOpen] = useState(false);
    function handleDialogChange() {
        setOpen(!open);
    }

    return (
        <Dialog open={open} onOpenChange={handleDialogChange}>
            <DialogTrigger asChild>
            <Button className="h-8" variant="secondary" onClick={handleDialogChange}>Assign</Button>
            </DialogTrigger>
            <DialogContent className="w-1/3 mx-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl text-center mb-2">Assigning A Technician</DialogTitle>
                    <DialogDescription className="text-base text-center mb-2">
                        Adding a request to A technician
                    </DialogDescription>
                </DialogHeader>
                    <RequestAssignmentForm request_id={request_id}/>
            </DialogContent>
        </Dialog>
    );
}
