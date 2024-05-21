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
import { Pencil } from "lucide-react";
import TechnicianEditForm from "./TechnicianEditForm";
import TechnicianCard from "./TechnicianCard";
export default function TechnicianEditDialog({ id }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Pencil  className="cursor-pointer"/>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update Technician User</DialogTitle>
                    <DialogDescription>
                        updating an existig technician in the system
                    </DialogDescription>
                </DialogHeader>
                <TechnicianCard>
                    <TechnicianEditForm id={id} />
                </TechnicianCard>
            </DialogContent>
        </Dialog>
    );
}
