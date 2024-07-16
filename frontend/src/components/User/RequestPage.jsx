

import RequestForm from "@/components/Request/RequestForm";
import { userReqConfig } from "@/config/tables";
import { useRequestContext } from "@/hooks/useRequestContext";
import RequestEntityTable from "../RequestEntityTable";

const RequestPage = () => {
    const {requests} = useRequestContext()
    return (
        <div className="flex flex-col gap-8">
            <RequestEntityTable entities={requests} config={userReqConfig}/>
            <div className="w-[625px] mx-auto mt-8 space-y-8">
                <h1 className="text-3xl font-bold text-center text-teal-700">
                    Want to report a problem
                </h1>
                <RequestForm />
            </div>
        </div>
    );
};

export default RequestPage;
