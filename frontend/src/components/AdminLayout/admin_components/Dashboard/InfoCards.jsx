import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import users from "@/assets/img/users.png";
import dept from "@/assets/img/dept.png";
import pending from "@/assets/img/pending.png";
import tech from "@/assets/img/tech.png";
import admin from "@/assets/img/admin.png";
import request from "@/assets/img/request.png";
import resolved from "@/assets/img/resolved.png";

const InfoCards = ({data}) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
               
                <Card>
                    <CardHeader className="flex flex-col items-start justify-between space-y-0 pb-2 gap-4">
                        <div className="space-y-4">
                            <img src={pending} alt="" className="size-16" />
                            <CardTitle className="text-xl font-medium">
                                Pending Requests
                            </CardTitle>
                        </div>
                        <div className="text-2xl font-bold">
                        {data.pendingReq}
                        </div>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="flex flex-col items-start justify-between space-y-0 pb-2 gap-4">
                        <div className="space-y-4">
                            <img src={resolved} alt="" className="size-16" />
                            <CardTitle className="text-xl font-medium">
                                Resolved Requests
                            </CardTitle>
                        </div>
                        <div className="text-2xl font-bold">
                        {data.resolvedReq}
                        </div>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="flex flex-col items-start justify-between space-y-0 pb-2 gap-4">
                        <div className="space-y-4">
                            <img src={request} alt="" className="size-16" />
                            <CardTitle className="text-xl font-medium">
                                UnResolved Requests
                            </CardTitle>
                        </div>
                        <div className="text-2xl font-bold">
                        {data.unresolvedReq}
                        </div>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="flex flex-col items-start justify-between space-y-0 pb-2 gap-4">
                        <div className="space-y-4">
                            <img src={tech} alt="" className="size-16" />
                            <CardTitle className="text-xl font-medium">
                                Technicians
                            </CardTitle>
                        </div>
                        <div className="text-2xl font-bold">
                        {data.techCount}
                        </div>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="flex flex-col items-start justify-between space-y-0 pb-2 gap-4">
                        <div className="space-y-4">
                            <img src={dept} alt="" className="size-16" />
                            <CardTitle className="text-xl font-medium">
                               Department
                            </CardTitle>
                        </div>
                        <div className="text-2xl font-bold">
                        {data.deptCount}
                        </div>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="flex flex-col items-start justify-between space-y-0 pb-2 gap-4">
                        <div className="space-y-4">
                            <img src={users} alt="" className="size-16" />
                            <CardTitle className="text-xl font-medium">
                                Users
                            </CardTitle>
                        </div>
                        <div className="text-2xl font-bold">
                        {data.userCount}
                        </div>
                    </CardHeader>
                </Card>          
            </div>
  )
}

export default InfoCards