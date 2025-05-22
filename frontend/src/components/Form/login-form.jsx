import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/useLogin";
import { TailSpin } from "react-loader-spinner";
import { useState, useEffect } from "react";
import { EyeIcon, EyeOffIcon, Mail, Lock, LogIn } from "lucide-react";
import { authSchema } from "@/schemas/login-schema";
import { motion } from "framer-motion";

export default function LoginForm() {
  const [isvisible, setVisible] = useState(false);
  const [formFocus, setFormFocus] = useState({ email: false, password: false });
  const { mutate: login, isLoading, error } = useLogin();
  
  const form = useForm({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  const togglePasswordVisibility = () => {
    setVisible(!isvisible);
  };
  
  function onSubmit(data) {
    login(data);
  }

  const inputVariants = {
    focus: { scale: 1.02, boxShadow: "0 0 0 2px rgba(var(--primary), 0.2)", transition: { duration: 0.2 } },
    blur: { scale: 1, boxShadow: "none", transition: { duration: 0.2 } },
  };

  const buttonVariants = {
    hover: { scale: 1.02, transition: { duration: 0.2 } },
    tap: { scale: 0.98, transition: { duration: 0.1 } },
    disabled: { opacity: 0.7, scale: 1, transition: { duration: 0.2 } },
  };

  const iconVariants = {
    initial: { opacity: 0.5, scale: 1 },
    focus: { opacity: 1, scale: 1.1, color: "var(--primary)", transition: { duration: 0.2 } },
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 flex flex-col"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-sm font-medium flex items-center gap-1.5">
                <motion.span
                  variants={iconVariants}
                  initial="initial"
                  animate={formFocus.email ? "focus" : "initial"}
                >
                  <Mail className="h-4 w-4" />
                </motion.span>
                Email Address
              </FormLabel>
              <FormControl>
                <motion.div 
                  className="relative"
                  variants={inputVariants}
                  animate={formFocus.email ? "focus" : "blur"}
                >
                  <Input 
                    placeholder="Enter your email" 
                    className="pl-3 pr-3 py-6 rounded-md bg-background/50 border-muted transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary" 
                    {...field} 
                    onFocus={() => setFormFocus({ ...formFocus, email: true })}
                    onBlur={() => setFormFocus({ ...formFocus, email: false })}
                  />
                </motion.div>
              </FormControl>
              <FormMessage className="text-xs font-medium" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-sm font-medium flex items-center gap-1.5">
                <motion.span
                  variants={iconVariants}
                  initial="initial"
                  animate={formFocus.password ? "focus" : "initial"}
                >
                  <Lock className="h-4 w-4" />
                </motion.span>
                Password
              </FormLabel>
              <FormControl>
                <motion.div 
                  className="relative"
                  variants={inputVariants}
                  animate={formFocus.password ? "focus" : "blur"}
                >
                  <Input
                    type={isvisible ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-3 pr-10 py-6 rounded-md bg-background/50 border-muted transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    {...field}
                    onFocus={() => setFormFocus({ ...formFocus, password: true })}
                    onBlur={() => setFormFocus({ ...formFocus, password: false })}
                  />
                  <motion.span
                    className="absolute top-1/2 -translate-y-1/2 items-center cursor-pointer right-0 mr-4 p-1 rounded-full hover:bg-muted/50"
                    onClick={togglePasswordVisibility}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isvisible ? (
                      <EyeOffIcon className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <EyeIcon className="w-4 h-4 text-muted-foreground" />
                    )}
                  </motion.span>
                </motion.div>
              </FormControl>
              <FormMessage className="text-xs font-medium" />
            </FormItem>
          )}
        />
        <motion.div
          className="pt-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <motion.div
            whileHover={!isLoading ? "hover" : "disabled"}
            whileTap={!isLoading ? "tap" : "disabled"}
            variants={buttonVariants}
          >
            <Button 
              disabled={isLoading} 
              type="submit" 
              className="w-full py-6 rounded-md bg-gradient-to-r from-primary to-primary/90 text-white font-medium text-base shadow-md hover:shadow-lg transition-all duration-300"
            >
              {isLoading ? (
                <TailSpin color="#fff" height={24} width={24} />
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </span>
              )}
            </Button>
          </motion.div>
        </motion.div>
      </form>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <FormMessage className="text-center text-sm mt-4 p-2 bg-destructive/10 rounded-md border border-destructive/20">
            {error?.response?.data.message || "Login failed. Please try again."}
          </FormMessage>
        </motion.div>
      )}
    </Form>
  );
}
