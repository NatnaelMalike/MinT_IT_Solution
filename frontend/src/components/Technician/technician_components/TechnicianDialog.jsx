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
import { SquarePlus } from "lucide-react";
import TechnicianForm from "./TechnicianForm";
import TechnicianCard from "./TechnicianCard";
export default function TechnicianDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="secondary" className="space-x-2">
                    <SquarePlus />
                    <p>Add Technician</p>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Technician User</DialogTitle>
                    <DialogDescription>
                        Adding a new technician to the system
                    </DialogDescription>
                </DialogHeader>
                <TechnicianCard>
                    <TechnicianForm />
                </TechnicianCard>
            </DialogContent>
        </Dialog>
    );
}
