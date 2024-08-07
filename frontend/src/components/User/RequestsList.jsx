import { userReqConfig } from "@/config/tables";
import { useRequestContext } from "@/hooks/useRequestContext";
import RequestEntityTable from "../RequestEntityTable";

const RequestList = () => {
    const {requests} = useRequestContext()
    return (
        <div className="">
            <RequestEntityTable entities={requests} config={userReqConfig}/>
        </div>
    );
};

export default RequestList;
