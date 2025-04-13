import { useEffect, useState } from "react";
import InfoCards from "../AdminLayout/admin_components/Dashboard/InfoCards";
import { useAuthContext } from "@/hooks/useAuthContext";
import axios from "axios";
import { useApiQuery } from "@/hooks/useApiQuery";
const Dashboard = () => {
    const {data, isLoading, isError, error} = useApiQuery(['dashboard'], '/dashboard')

  return <div className="space-y-8">{data && <InfoCards data={data} />}</div>;
};

export default Dashboard;
