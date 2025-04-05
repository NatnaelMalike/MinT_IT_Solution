import { Toaster } from "sonner";
import logo from "../../assets/img/MinT-Logo.jpg";
import UserForm from "@/components/Form/UserRegisterForm";
const UserSignupPage = () => {
    return (
        <div className="flex min-h-full px-6 py-4 lg:px-8">
            <div className="mx-auto sm:w-full flex flex-col w-3/4">
                <div className="mx-auto w-1/5">
                    <img src={logo} alt="" />
                </div>
                <h2 className="my-5 text-xl text-center font-medium leading-9 tracking-tight text-gray-900">
                    Create Your User Account
                </h2>
                <UserForm />
            </div>
            <Toaster />
        </div>
    );
};

export default UserSignupPage;
