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
                <Button className="space-x-2" onClick={handleDialogChange}>
                    <SquarePlus />
                    <p>Add {entity}</p>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add {entity}</DialogTitle>
                    <DialogDescription>
                        Adding a new {entity} to the system
                    </DialogDescription>
                </DialogHeader>
                <DialogContext.Provider value={handleDialogChange}>
                    {children}
                </DialogContext.Provider>
            </DialogContent>
        </Dialog>
    );
}
