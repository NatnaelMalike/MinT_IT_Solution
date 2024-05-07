import logo from "../assets/img/MinT-Logo.jpg";
import LoginForm from "@/components/Form/LoginForm";

const LoginPage = () => {
    return (
        <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <div class="flex items-center flex-col">
                    <img src={logo} alt="" className="" />
                </div>
                <h2 class="my-10 text-center font-medium leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
                <LoginForm />
            </div>
            
        </div>
    );
};

export default LoginPage;
