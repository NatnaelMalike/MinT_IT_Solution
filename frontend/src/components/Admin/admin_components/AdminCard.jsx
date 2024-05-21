import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
export default function AdminCard({ children }) {
    return (
        <Card className="w-96 mx-auto">
            <CardContent>{children}</CardContent>
        </Card>
    );
}