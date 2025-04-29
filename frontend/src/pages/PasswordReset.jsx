import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
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
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { TailSpin } from "react-loader-spinner";
import { EyeIcon, EyeOffIcon } from "lucide-react";
const formSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Password must be 6 or more characters long" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be 6 or more characters long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // set the path of the error
  });

export default function PasswordReset() {
  const [error, setError] = useState();
  const [isvisible, setVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setVisible(!isvisible);
  };
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { email } = useParams();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data) {
    setLoading(true);
    axios
      .post(`http://localhost:4000/api/reset-password/${email}`, data)
      .then(() => {
        setLoading(false);
        toast.success("Password Reset successfully");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((error) => {
        toast.error("Failed to reset the password, Please try again.");
        setLoading(false);
        console.log(error);
        error && setError(error.response.data);
      });
  }

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col gap-20">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <h1 className="text-xl text-center">Reset Password</h1>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <div className="relative ">
                    <Input
                      type={isvisible ? "text" : "password"}
                      placeholder={"Enter Your Password"}
                      {...field}
                    />
                    <span
                      className="absolute top-1/2 -translate-y-1/2 items-center cursor-pointer right-0 mr-4"
                      onClick={togglePasswordVisibility}
                    >
                      {isvisible ? (
                        <EyeOffIcon className="w-5 h-5" />
                      ) : (
                        <EyeIcon className="w-5 h-5" />
                      )}
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative ">
                    <Input
                      type={isvisible ? "text" : "password"}
                      placeholder={"Enter Your Password"}
                      {...field}
                    />
                    <span
                      className="absolute top-1/2 -translate-y-1/2 items-center cursor-pointer right-0 mr-4"
                      onClick={togglePasswordVisibility}
                    >
                      {isvisible ? (
                        <EyeOffIcon className="w-5 h-5" />
                      ) : (
                        <EyeIcon className="w-5 h-5" />
                      )}
                    </span>
                  </div>
                </FormControl>
                <FormDescription className="hidden lg:block">
                  Please confirm your password.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={loading} type="submit" className="grow">
            {loading ? (
              <TailSpin color="#fff" height={30} width={30} />
            ) : (
              "Continue"
            )}
          </Button>
        </form>
      </Form>
      {
        <p className="text-center text-destructive mt-4 font-medium">
          {error && error}
        </p>
      }
    </div>
  );
}
