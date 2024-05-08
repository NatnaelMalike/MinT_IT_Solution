import logo from "../../assets/img/MinT-Logo.jpg";
import UserForm from "@/components/Form/Signup/UserForm";
const UserSignupPage = () => {
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="flex items-center flex-col">
                    <img src={logo} alt="" />
                </div>
                <h2 className="my-10 text-xl text-center font-medium leading-9 tracking-tight text-gray-900">
                    Create Your User Account
                </h2>
                <UserForm />
            </div>
            
        </div>
  )
}

export default UserSignupPage





