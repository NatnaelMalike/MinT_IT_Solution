import LoginForm from "@/components/Form/LoginForm";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="container relative flex min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Ministry of Technology
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "Empowering the nation through technological innovation and
              digital transformation."
            </p>
            <footer className="text-sm">Ministry Vision Statement</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-3xl font-semibold tracking-tight">MinT</h1>
            <p className="text-sm text-muted-foreground">
              Ministry of Technology Portal
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
