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
import AdminCard from "./AdminCard";
import AdminEditForm from "./AdminEditForm";
export default function AdminEditDialog({ id }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Pencil  className="cursor-pointer"/>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update Admin User</DialogTitle>
                    <DialogDescription>
                        updating an existig adminstrator in the system
                    </DialogDescription>
                </DialogHeader>
                <AdminCard>
                    <AdminEditForm id={id} />
                </AdminCard>
            </DialogContent>
        </Dialog>
    );
}
