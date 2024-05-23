import { Toaster } from "sonner";
import logo from "../../assets/img/MinT-Logo.jpg";
import UserForm from "@/components/AdminLayout/admin_components/User/user_components/UserForm";
const UserSignupPage = () => {
    return (
        <div className="flex min-h-full px-6 py-8 lg:px-8">
            <div className="mx-auto sm:w-full flex flex-col items-center">
                <div className="flex items-center flex-col max-w-96">
                    <img src={logo} alt="" />
                </div>
                <h2 className="my-10 text-xl text-center font-medium leading-9 tracking-tight text-gray-900">
                    Create Your User Account
                </h2>
                <UserForm />
            </div>
            <Toaster />
        </div>
    );
};

export default UserSignupPage;
