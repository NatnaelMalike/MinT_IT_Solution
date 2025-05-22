import LoginForm from "@/components/Form/login-form";
import { Building2, ShieldCheck, Users, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const LoginPage = () => {
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
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-background to-background/90">
      <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {mounted && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <Card className="border shadow-xl overflow-hidden bg-card/95 backdrop-blur-sm rounded-xl">
              <div className="md:grid md:grid-cols-5">
                {/* Left side - Form */}
                <motion.div 
                  className="p-6 sm:p-8 md:col-span-2 md:order-last relative"
                  variants={itemVariants}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl z-0"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full -ml-12 -mb-12 blur-2xl z-0"></div>
                  
                  <div className="relative z-10">
                    <div className="mb-8 text-center md:text-left">
                      <div className="md:hidden flex justify-center items-center gap-2 mb-4">
                        <Building2 className="h-6 w-6 text-primary" />
                        <span className="text-2xl font-bold">MinT</span>
                      </div>
                      <motion.h2 
                        className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
                        variants={itemVariants}
                      >
                        Welcome back
                      </motion.h2>
                      <motion.div variants={itemVariants}>
                        <CardDescription className="mt-2 text-base">
                          Sign in to your account to continue
                        </CardDescription>
                      </motion.div>
                    </div>
                    
                    <motion.div variants={itemVariants}>
                      <LoginForm />
                    </motion.div>
                    
                    <motion.div 
                      className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
                      variants={itemVariants}
                    >
                      <Link
                        to="/forgot-password"
                        className="text-sm text-primary hover:underline transition-all duration-200 flex items-center gap-1 group"
                      >
                        Forgot your password?
                        <ArrowRight className="h-3 w-0 group-hover:w-3 overflow-hidden transition-all duration-300" />
                      </Link>

                      <Link
                        className="text-sm text-primary hover:underline transition-all duration-200 flex items-center gap-1 group"
                        to="/signup"
                      >
                        Create an account
                        <ArrowRight className="h-3 w-0 group-hover:w-3 overflow-hidden transition-all duration-300" />
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Right side - Decorative panel */}
                <motion.div 
                  className="hidden md:block md:col-span-3 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground p-8 relative overflow-hidden"
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
                        className="text-4xl font-bold mb-6 leading-tight"
                        variants={itemVariants}
                      >
                        Ministry of Innovation <br />and Technology Portal
                      </motion.h2>
                      
                      <motion.p 
                        className="opacity-90 mb-8 text-lg"
                        variants={itemVariants}
                      >
                        Your gateway to digital services and support.
                      </motion.p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                        <motion.div 
                          className="flex items-start gap-3 p-5 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/20 transition-all duration-300 cursor-pointer"
                          variants={featureVariants}
                          whileHover="hover"
                        >
                          <ShieldCheck className="h-6 w-6 mt-1 flex-shrink-0 text-yellow-200" />
                          <div>
                            <h3 className="font-medium">Secure Access</h3>
                            <p className="text-sm opacity-80 mt-1">
                              Your data is protected with enterprise-grade security
                            </p>
                          </div>
                        </motion.div>
                        
                        <motion.div 
                          className="flex items-start gap-3 p-5 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/20 transition-all duration-300 cursor-pointer"
                          variants={featureVariants}
                          whileHover="hover"
                        >
                          <Users className="h-6 w-6 mt-1 flex-shrink-0 text-yellow-200" />
                          <div>
                            <h3 className="font-medium">Centralized Support</h3>
                            <p className="text-sm opacity-80 mt-1">
                              One platform for all your IT service needs
                            </p>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                    
                    <motion.div 
                      className="mt-auto pt-8"
                      variants={itemVariants}
                    >
                      <p className="text-sm opacity-90">
                        Don't have an account yet?{" "}
                        <Link
                          to="/signup"
                          className="underline font-medium hover:text-white transition-colors duration-300 inline-flex items-center gap-1"
                        >
                          Create an account
                          <ArrowRight className="h-3 w-3" />
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

export default LoginPage;
