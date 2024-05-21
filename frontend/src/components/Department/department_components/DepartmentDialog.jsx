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
import DepartmentForm from "./DepartmentForm";
import DepartmentCard from "./DepartmentCard";
export default function DepartmentDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="secondary" className="space-x-2">
                    <SquarePlus />
                    <p>Add Department</p>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add  Department</DialogTitle>
                    <DialogDescription>
                        Adding a new department to MinT Governmet Office
                    </DialogDescription>
                </DialogHeader>
                <DepartmentCard>
                    <DepartmentForm />
                </DepartmentCard>
            </DialogContent>
        </Dialog>
    );
}
