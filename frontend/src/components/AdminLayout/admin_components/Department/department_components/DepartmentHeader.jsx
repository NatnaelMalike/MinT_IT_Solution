import DepartmentDialog from "./DepartmentDialog";

const DepartmentHeader = () => {
    return (
        <div className="flex justify-between items-center p-4">
            <h2 className="text-3xl font-medium">Manage Departments</h2>
            <DepartmentDialog />
        </div>
    );
};

export default DepartmentHeader;
