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
import DepartmentEditForm from "./DepartmentEditForm";
import DepartmentCard from "./DepartmentCard";

export default function DepartmentEditDialog({ id }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Pencil  className="cursor-pointer"/>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update Department</DialogTitle>
                    <DialogDescription>
                        updating an existig department in the MinT Government Office
                    </DialogDescription>
                </DialogHeader>
                <DepartmentCard>
                    <DepartmentEditForm id={id} />
                </DepartmentCard>
            </DialogContent>
        </Dialog>
    );
}
