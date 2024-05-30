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
import { Pencil } from "lucide-react";
import { useState } from "react";
export default function EditDialog({entity, children}) {
    const [open, setOpen] = useState(false);
    function handleDialogChange() {
        setOpen(!open);
    }
    return (
        <Dialog open={open} onOpenChange={handleDialogChange}>
            <DialogTrigger asChild>
                <Pencil className="cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
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
