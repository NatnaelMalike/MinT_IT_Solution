import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import AdminForm from "@/pages/Admin/AdminForm";
export default function UserRequestCard({children}) {
    return (
        <Card className="w-96 mx-auto">
            <CardContent>
               {children}
            </CardContent>
        </Card>
    );
}
