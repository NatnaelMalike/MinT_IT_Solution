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
import UserRequestCard from "./UserRequestCard";
import RequestForm from "@/pages/User/RequestForm";
export default function UserDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="secondary" className="space-x-2">
                    <SquarePlus />
                    <p>Add Request</p>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Add a new Request</DialogTitle>
                <DialogDescription>
                    reporting a new problem
                </DialogDescription>
            </DialogHeader>
                <UserRequestCard>
                    <RequestForm/>
                </UserRequestCard>
            </DialogContent>
        </Dialog>
    );
}

