import { useEffect, useState } from "react";
import tech from "@/assets/img/tech.png";

import pending from "@/assets/img/pending.png";
import request from "@/assets/img/request.png";
import resolved from "@/assets/img/resolved.png";
import { useAuthContext } from "@/hooks/useAuthContext";
import axios from "axios";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
const HelperDashboard = () => {
  const { token } = useAuthContext();
  const [data, setData] = useState(null);
  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:4000/api/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token]);
  return (
    data && (
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-col items-start justify-between space-y-0 pb-2 gap-4">
            <div className="space-y-4">
              <img src={pending} alt="" className="size-16" />
              <CardTitle className="text-xl font-medium">
                Pending Requests
              </CardTitle>
            </div>
            <div className="text-2xl font-bold">{data.pendingReq}</div>
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
            <div className="text-2xl font-bold">{data.resolvedReq}</div>
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
            <div className="text-2xl font-bold">{data.unresolvedReq}</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="flex flex-col items-start justify-between space-y-0 pb-2 gap-4">
            <div className="space-y-4">
              <img src={tech} alt="" className="size-16" />
              <CardTitle className="text-xl font-medium">Technicians</CardTitle>
            </div>
            <div className="text-2xl font-bold">{data.techCount}</div>
          </CardHeader>
        </Card>
      </div>
    )
  );
};

export default HelperDashboard;
