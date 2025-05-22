import { Building2 } from "lucide-react";
import UserRegisterForm from "@/components/Form/user-register-form";
import { Card, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";

const UserSignupPage = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background py-8">
      <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        <Card className="border shadow-lg overflow-hidden bg-card">
          <div className="md:grid md:grid-cols-5">
            {/* Left side - Decorative panel */}
            <div className="hidden md:block md:col-span-2 bg-primary text-primary-foreground p-8">
              <div className="h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <Building2 className="h-8 w-8" />
                    <span className="text-3xl font-bold">MinT</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-4">
                    Welcome to MinT Portal
                  </h2>
                  <p className="opacity-90 mb-6">
                    Ministry of Innovation and Technology - Your gateway to
                    digital services and support.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-primary-foreground/10 rounded-lg">
                    <p className="text-sm font-medium text-fore">
                      "The MinT portal has streamlined our department's IT
                      support process significantly."
                    </p>
                    <p className="text-xs mt-2 opacity-80">- Ministry Staff</p>
                  </div>
                  <p className="text-sm">
                    Already have an account?{" "}
                    <Link
                      to="/"
                      className="underline font-medium hover:text-primary-foreground/90"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Form */}
            <div className="p-4 sm:p-6 md:p-8 md:col-span-3 overflow-y-auto">
              <div className="mb-4 text-center md:text-left">
                <div className="md:hidden flex justify-center items-center gap-2 mb-4">
                  <Building2 className="h-6 w-6" />
                  <span className="text-2xl font-bold">MinT</span>
                </div>
                <h2 className="text-2xl font-bold tracking-tight">
                  Create Your Account
                </h2>
                <CardDescription className="mt-2">
                  Fill in your details to get started with the MinT portal
                </CardDescription>
              </div>
              <UserRegisterForm />
              <div className="mt-4 text-center md:hidden">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    to="/"
                    className="text-primary font-medium hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UserSignupPage;
