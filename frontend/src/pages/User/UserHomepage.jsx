import Main from "@/components/User/Main";
import UserSidebar from "@/components/User/UserSidebar";


const UserHomepage = () => {
    return (
        <>
            <div className="flex">
                <UserSidebar/>
                <Main/>
            </div>
        </>
    );
};

export default UserHomepage;
