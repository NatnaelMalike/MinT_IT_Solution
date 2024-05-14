import AdminDialog from "./AdminDialog";
const AdminHeader = () => {
    return (
        <div className="flex justify-between items-center p-4">
            <h2 className="text-3xl font-medium">Manage Admins</h2>
            <AdminDialog />
        </div>
    );
};

export default AdminHeader;
