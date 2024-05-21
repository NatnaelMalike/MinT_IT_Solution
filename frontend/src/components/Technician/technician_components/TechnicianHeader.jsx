import TechnicianDialog from "./TechnicianDialog";
const TechnicianHeader = () => {
    return (
        <div className="flex justify-between items-center p-4">
            <h2 className="text-3xl font-medium">Manage Technicians</h2>
            <TechnicianDialog />
        </div>
    );
};

export default TechnicianHeader;
