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
import { DialogContext } from "@/contexts/Context";
import { SquarePen } from "lucide-react";
import { useState } from "react";
export default function EditDialog({entity, children}) {
    const [open, setOpen] = useState(false);
    function handleDialogChange() {
        setOpen(!open);
    }
    return (
        <Dialog open={open} onOpenChange={handleDialogChange}>
            <DialogTrigger asChild>
                <SquarePen className="cursor-pointer text-teal-800" />
            </DialogTrigger>
            <DialogContent onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>Update {entity}</DialogTitle>
                    <DialogDescription>
                        updating an existig {entity} in the system
                    </DialogDescription>
                </DialogHeader>
                <DialogContext.Provider value={handleDialogChange}>
                    {children}
                </DialogContext.Provider>
                
            </DialogContent>
        </Dialog>
    );
}
