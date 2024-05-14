import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import AdminEditForm from "@/pages/Admin/AdminEditForm";
export default function AdminEditCard() {
    return (
        <Card className="w-96 mx-auto">
            <CardContent><AdminEditForm/></CardContent>
        </Card>
    );
}
