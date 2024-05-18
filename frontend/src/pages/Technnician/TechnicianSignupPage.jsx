import logo from "../../assets/img/MinT-Logo.jpg";
import TechnicianForm from "@/components/Technician/TechnicianForm";
const TechnicianSignupPage = () => {
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="flex items-center flex-col">
                    <img src={logo} alt="" />
                </div>
                <h2 className="my-10 text-xl text-center font-medium leading-9 tracking-tight text-gray-900">
                    Create Your Technician Account
                </h2>
                <TechnicianForm />
            </div>
        </div>
    );
};

export default TechnicianSignupPage;
