import logo from "../../assets/img/MinT-Logo.jpg"
import LoginForm from "@/components/Form/LoginForm";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
    const {token} = useAuthContext();
    const navigate = useNavigate()

    useEffect(() => {
        if (token) {
            navigate('/redirect'); 
        }
    }, [token]);
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="flex items-center flex-col">
                    <img src={logo} alt="" />
                </div>
                <h2 className="text-center font-extrabold text-teal-700 text-3xl mt-4">IT Support System</h2>
                <h2 className="my-10 text-2xl text-center font-medium leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
                <LoginForm />
                <div className="flex justify-between items-center mt-4 text-lg">
                <Link to={'/forgot-password'} className="hover:text-teal-500">Forget Password</Link>
                <div>Need an Account? <Link className="text-teal-500 text-lg hover:opacity-90 hover:underline" to={'/signup'}>Signup</Link></div>

                </div>
            </div>
            
        </div>
    );
};

export default LoginPage;
