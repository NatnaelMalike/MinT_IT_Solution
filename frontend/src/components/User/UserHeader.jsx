import UserDialog from "./UserDialog";

const UserHeader = () => {
    return (
        <div className="flex justify-between items-center p-4">
            <h2 className="text-3xl font-medium">Manage Your Requests</h2>
            <UserDialog/>
        </div>
    );
};

export default UserHeader;