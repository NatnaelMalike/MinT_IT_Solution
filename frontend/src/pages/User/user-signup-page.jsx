import { Building2 } from "lucide-react";
import UserRegisterForm from "@/components/Form/user-register-form";
const UserSignupPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center border px-6 py-4 lg:px-8">
      <div className="flex-1 mx-auto sm:w-full flex flex-col max-w-4xl">
        <div className="flex justify-center items-center gap-3">
          <Building2 />
          <span className="text-4xl font-semibold hover:cursor-pointer">
            MinT
          </span>
        </div>
        <h2 className="my-5 text-xl text-center font-medium leading-9 tracking-tight text-muted-foreground">
          Create Your User Account
        </h2>
        <UserRegisterForm />
      </div>
    </div>
  );
};

export default UserSignupPage;
