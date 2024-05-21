import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import AdminForm from "@/components/Admin/admin_components/AdminForm";
export default function AdminCard({ children }) {
    return (
        <Card className="w-96 mx-auto">
            <CardContent>{children}</CardContent>
        </Card>
    );
}
