import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { DialogContext } from "@/contexts/Context";
import { SquarePlus } from "lucide-react";
import { useState } from "react";
export default function AddDialog({ entity, children }) {
    const [open, setOpen] = useState(false);
    function handleDialogChange() {
        setOpen(!open);
    }

    return (
        <Dialog open={open} onOpenChange={handleDialogChange}>
            <DialogTrigger asChild>
                <Button className="space-x-2 bg-teal-800" onClick={handleDialogChange}>
                    <SquarePlus />
                    <p className="text-base">Add {entity}</p>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-sm:w-11/12" onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle className="text-xl text-center mb-2">Add {entity}</DialogTitle>
                    <DialogDescription className="text-base text-center mb-2">
                        Adding a new {entity} to the system
                    </DialogDescription>
                </DialogHeader>
                <DialogContext.Provider value={handleDialogChange}>
                    {children}
                </DialogContext.Provider>
            </DialogContent>
            <DialogOverlay />
        </Dialog>
    );
}
