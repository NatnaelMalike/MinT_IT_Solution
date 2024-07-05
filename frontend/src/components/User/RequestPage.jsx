

import RequestForm from "@/components/Request/RequestForm";

import RequestTable from "./RequestTable";

const RequestPage = () => {
    return (
        <div className="flex flex-col gap-8">
            <RequestTable/>
            <div className="w-[625px] mx-auto mt-8 space-y-8">
                <h1 className="text-2xl font-medium">
                    Want to report a problem
                </h1>
                <RequestForm />
            </div>
        </div>
    );
};

export default RequestPage;
