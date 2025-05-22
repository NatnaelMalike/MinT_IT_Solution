import { Building2, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import UserRegisterForm from "@/components/Form/user-register-form";
import { Card, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const UserSignupPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const featureVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
    hover: { scale: 1.03, transition: { duration: 0.2 } }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-background to-background/90 py-8">
      <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {mounted && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <Card className="border shadow-xl overflow-hidden bg-card/95 backdrop-blur-sm rounded-xl">
              <div className="md:grid md:grid-cols-5">
                {/* Left side - Decorative panel */}
                <motion.div 
                  className="hidden md:block md:col-span-2 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground p-8 relative overflow-hidden"
                  variants={itemVariants}
                >
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
                  
                  <div className="h-full flex flex-col justify-between relative z-10">
                    <div>
                      <motion.div 
                        className="flex items-center gap-2 mb-6"
                        variants={itemVariants}
                      >
                        <Building2 className="h-8 w-8" />
                        <span className="text-3xl font-bold flex items-center gap-1">
                          MinT
                          <Sparkles className="h-5 w-5 text-yellow-200" />
                        </span>
                      </motion.div>
                      
                      <motion.h2 
                        className="text-3xl font-bold mb-4 leading-tight"
                        variants={itemVariants}
                      >
                        Welcome to MinT Portal
                      </motion.h2>
                      
                      <motion.p 
                        className="opacity-90 mb-8 text-lg"
                        variants={itemVariants}
                      >
                        Ministry of Innovation and Technology - Your gateway to
                        digital services and support.
                      </motion.p>

                      <motion.div 
                        className="space-y-4 mt-8"
                        variants={itemVariants}
                      >
                        <motion.div 
                          className="p-5 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/20 transition-all duration-300 cursor-pointer"
                          variants={featureVariants}
                          whileHover="hover"
                        >
                          <p className="text-sm font-medium">
                            "The MinT portal has streamlined our department's IT
                            support process significantly."
                          </p>
                          <p className="text-xs mt-2 opacity-80 flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3 text-yellow-200" />
                            Ministry Staff
                          </p>
                        </motion.div>
                      </motion.div>
                    </div>
                    
                    <motion.div 
                      className="mt-auto pt-8"
                      variants={itemVariants}
                    >
                      <p className="text-sm opacity-90">
                        Already have an account?{" "}
                        <Link
                          to="/"
                          className="underline font-medium hover:text-white transition-colors duration-300 inline-flex items-center gap-1"
                        >
                          Sign in
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      </p>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Right side - Form */}
                <motion.div 
                  className="p-6 sm:p-8 md:col-span-3 -relative"
                  variants={itemVariants}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl z-0"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full -ml-12 -mb-12 blur-2xl z-0"></div>
                  
                  <div className="relative z-10">
                    <div className="mb-6 text-center md:text-left">
                      <div className="md:hidden flex justify-center items-center gap-2 mb-4">
                        <Building2 className="h-6 w-6 text-primary" />
                        <span className="text-2xl font-bold">MinT</span>
                      </div>
                      <motion.h2 
                        className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
                        variants={itemVariants}
                      >
                        Create Your Account
                      </motion.h2>
                      <motion.div variants={itemVariants}>
                        <CardDescription className="mt-2 text-base">
                          Fill in your details to get started with the MinT portal
                        </CardDescription>
                      </motion.div>
                    </div>
                    
                    <motion.div variants={itemVariants}>
                      <UserRegisterForm />
                    </motion.div>
                    
                    <motion.div 
                      className="mt-6 text-center md:hidden"
                      variants={itemVariants}
                    >
                      <p className="text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link
                          to="/"
                          className="text-primary font-medium hover:underline transition-all duration-200 inline-flex items-center gap-1 group"
                        >
                          Sign in
                          <ArrowRight className="h-3 w-0 group-hover:w-3 overflow-hidden transition-all duration-300" />
                        </Link>
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UserSignupPage;
