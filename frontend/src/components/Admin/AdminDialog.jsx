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
import AdminCard from "./AdminCard";
import AdminForm from "@/components/Admin/AdminForm";
export default function AdminDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="secondary" className="space-x-2">
                    <SquarePlus />
                    <p>Add Admin</p>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Admin User</DialogTitle>
                    <DialogDescription>
                        Adding a new adminstrator to the system
                    </DialogDescription>
                </DialogHeader>
                <AdminCard>
                    <AdminForm />
                </AdminCard>
            </DialogContent>
        </Dialog>
    );
}
