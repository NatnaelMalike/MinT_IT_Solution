import logo from "../../assets/img/MinT-Logo.jpg"
import LoginForm from "@/components/Form/LoginForm";
import { Link } from "react-router-dom";

const LoginPage = () => {
    
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="flex items-center flex-col">
                    <img src={logo} alt="" />
                </div>
                <h2 className="my-10 text-xl text-center font-medium leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
                <LoginForm />
                <div className="flex justify-between items-center mt-4">
                <Link to={'/forgot-password'} className="hover:text-teal-500">Forget Password</Link>
                <div>Need an Account? <Link className="text-teal-500 text-base hover:opacity-90 hover:underline" to={'/signup'}>Signup</Link></div>

                </div>
            </div>
            
        </div>
    );
};

export default LoginPage;
