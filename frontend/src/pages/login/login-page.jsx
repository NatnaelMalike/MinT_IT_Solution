import LoginForm from "@/components/Form/login-form";
import { Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="container relative flex min-h-screen flex-col items-center justify-center md:grid lg:max-w-none  lg:px-0">
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="flex justify-center items-center gap-3 font-semibold tracking-tight">
              <Building2 />
              <span className="text-4xl font-semibold hover:cursor-pointer">
                MinT
              </span>
            </h1>
            <p className="text-sm text-muted-foreground">
              Ministry of Innovation and Technology Portal
            </p>
          </div>
          <LoginForm />
          <div className="mt-6 flex items-center justify-between space-x-2">
            <Link
              href="/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Forgot your password?
            </Link>

            <Link
              className="text-sm text-primary hover:underline"
              to={"/signup"}
            >
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
