import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Clock9, UsersIcon, BuildingIcon } from "lucide-react";

const InfoCards = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-center gap-2">
                                <Clock9 className="h-6 w-6 text-primary" />
                                <h3 className="text-2xl font-bold">124</h3>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                    <p className="text-gray-500 dark:text-gray-400 text-base">Pending Requests</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-center gap-2">
                                <UsersIcon className="h-6 w-6 text-primary" />
                                <h3 className="text-2xl font-bold">124</h3>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                    <p className="text-gray-500 dark:text-gray-400 text-base">Users</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-center gap-2">
                                <UsersIcon className="h-6 w-6 text-primary" />
                                <h3 className="text-2xl font-bold">124</h3>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                    <p className="text-gray-500 dark:text-gray-400 text-base">Technicians</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-center gap-2">
                                <BuildingIcon className="h-6 w-6 text-primary" />
                                <h3 className="text-2xl font-bold">124</h3>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                    <p className="text-gray-500 dark:text-gray-400 text-base">Departments</p>
                    </CardContent>
                </Card>
                
            </div>
  )
}

export default InfoCards