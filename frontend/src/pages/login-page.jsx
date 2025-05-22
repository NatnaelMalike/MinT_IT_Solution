import LoginForm from "@/components/Form/login-form";
import { Building2, ShieldCheck, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardDescription } from "@/components/ui/card";

const LoginPage = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
        <Card className="border shadow-lg overflow-hidden bg-card">
          <div className="md:grid md:grid-cols-5">
            {/* Left side - Form */}
            <div className="p-6 sm:p-8 md:col-span-2 md:order-last">
              <div className="mb-6 text-center md:text-left">
                <div className="md:hidden flex justify-center items-center gap-2 mb-4">
                  <Building2 className="h-6 w-6" />
                  <span className="text-2xl font-bold">MinT</span>
                </div>
                <h2 className="text-2xl font-bold tracking-tight">
                  Welcome back
                </h2>
                <CardDescription className="mt-2">
                  Sign in to your account to continue
                </CardDescription>
              </div>
              <LoginForm />
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot your password?
                </Link>

                <Link
                  className="text-sm text-primary hover:underline"
                  to="/signup"
                >
                  Create an account
                </Link>
              </div>
            </div>

            {/* Right side - Decorative panel */}
            <div className="hidden md:block md:col-span-3 bg-primary text-primary-foreground p-8">
              <div className="h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <Building2 className="h-8 w-8" />
                    <span className="text-3xl font-bold">MinT</span>
                  </div>
                  <h2 className="text-3xl font-bold mb-6">
                    Ministry of Innovation and Technology Portal
                  </h2>
                  <p className="opacity-90 mb-8 text-lg">
                    Your gateway to digital services and support.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                    <div className="flex items-start gap-3 p-4 bg-primary-foreground/10 rounded-lg">
                      <ShieldCheck className="h-6 w-6 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium">Secure Access</h3>
                        <p className="text-sm opacity-80 mt-1">
                          Your data is protected with enterprise-grade security
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-primary-foreground/10 rounded-lg">
                      <Users className="h-6 w-6 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium">Centralized Support</h3>
                        <p className="text-sm opacity-80 mt-1">
                          One platform for all your IT service needs
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-auto pt-8">
                  <p className="text-sm opacity-80">
                    Don't have an account yet?{" "}
                    <Link
                      to="/signup"
                      className="underline font-medium hover:text-primary-foreground/90"
                    >
                      Create an account
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
