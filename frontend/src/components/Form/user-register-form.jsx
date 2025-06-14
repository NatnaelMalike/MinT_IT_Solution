import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Check, ChevronsUpDown, EyeIcon, EyeOffIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { TailSpin } from "react-loader-spinner";
import { userSchema } from "@/schemas/user-schema";
import { useApiQuery } from "@/hooks/useApiQuery";
import { useSignup } from "@/hooks/useSignup";

export default function UserForm() {
  const {
    data: professions,
    isLoading: proLoading,
    error: proError,
  } = useApiQuery(["professions"], "/profession", { staleTime: 1000 * 60 * 5 });
  const {
    data: departments,
    isLoading: deptLoading,
    error: deptError,
  } = useApiQuery(["department"], "/department", { staleTime: 1000 * 60 * 5 });
  const { mutate: signup, isLoading, error } = useSignup();
  const [isvisible, setVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setVisible(!isvisible);
  };

  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      department: "",
      profession: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data) {
    signup(data);
  }
  if (deptLoading) {
    return (
      <div className="flex justify-center items-center">
        <TailSpin color="#000" height={80} width={80} />
      </div>
    );
  }
  if (deptError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-destructive">{deptError}</p>
      </div>
    );
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="eg. Natnael Malike Meliyon" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="eg. natnaelmk12@gmail.com" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="eg. 0915231212" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department</FormLabel>
                <Popover>
                  <PopoverTrigger>
                    <FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between ",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? departments?.find(
                              (department) => department._id === field.value
                            )?.name
                          : "Select Your Department"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 max-h-60 overflow-y-auto w-full">
                    <Command>
                      <CommandInput
                        placeholder="Search Department..."
                        className="h-9"
                      />
                      <CommandEmpty>No Department found.</CommandEmpty>
                      <CommandGroup className="max-h-40 overflow-y-auto">
                        {departments.map((department) => (
                          <CommandItem
                            value={department._id}
                            key={department._id}
                            onSelect={() => {
                              form.setValue("department", department._id);
                            }}
                          >
                            {department.name}
                            <Check
                              className={cn(
                                "ml-auto h-4 w-4",
                                department._id === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="profession"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profession</FormLabel>
              <Popover>
                <PopoverTrigger>
                  <FormControl>
                    <Button
                      type="button"
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between ",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? professions?.find(
                            (profession) => profession._id === field.value
                          )?.name
                        : "Select Your Profession"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0 max-h-60 overflow-y-auto w-full">
                  <Command>
                    <CommandInput
                      placeholder="Search Profession..."
                      className="h-9"
                    />
                    <CommandEmpty>No Profession found.</CommandEmpty>
                    <CommandGroup className="max-h-40 overflow-y-auto">
                      {professions?.map((profession) => (
                        <CommandItem
                          value={profession._id}
                          key={profession._id}
                          onSelect={() => {
                            form.setValue("profession", profession._id);
                          }}
                        >
                          {profession.name}
                          <Check
                            className={cn(
                              "ml-auto h-4 w-4",
                              profession._id === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={isvisible ? "text" : "password"}
                      placeholder={"eg. MinT1234"}
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
                  <div className="relative">
                    <Input
                      type={isvisible ? "text" : "password"}
                      placeholder={"eg. MinT1234"}
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
        </div>

        {error && (
          <FormMessage className="text-center text-base py-2">
            {error?.message}
          </FormMessage>
        )}

        <Button
          disabled={isLoading}
          type="submit"
          className="mt-4 w-full self-center"
        >
          {isLoading ? (
            <TailSpin color="#fff" height={30} width={30} />
          ) : (
            "Register"
          )}
        </Button>
      </form>
    </Form>
  );
}
