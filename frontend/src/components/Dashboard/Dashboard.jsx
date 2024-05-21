import InfoCards from "./InfoCards";
import AdminTable from "../Admin/admin_components/AdminTable";
const Dashboard = () => {
    return (
        <div className="space-y-8">
            <InfoCards />
            <AdminTable />
        </div>
    );
};

export default Dashboard;
