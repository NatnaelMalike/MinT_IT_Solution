import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useCreateMutation } from "@/hooks/useCreateMutation";
import { useUpdateMutation } from "@/hooks/useUpdateMutation";
import { TailSpin } from "react-loader-spinner";
import { toast } from "sonner";

// Define the schema for department validation
const departmentSchema = z.object({
  name: z.string().min(2, { message: "Department name must be at least 2 characters" }),
  sector: z.string().min(2, { message: "Sector must be at least 2 characters" }),
  isActive: z.boolean().default(true),
});

export default function DepartmentForm({ department = null, onSuccess, onCancel }) {
  // Determine if we're editing or creating
  const isEditing = !!department;
  
  // Setup the appropriate mutation hook
  const { mutate: createDepartment, isLoading: isCreating } = useCreateMutation("department");
  const { mutate: updateDepartment, isLoading: isUpdating } = useUpdateMutation(
    `department/${department?._id}`, 
    {}, 
    department?._id
  );
  
  // Initialize the form with react-hook-form
  const form = useForm({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      name: department?.name || "",
      sector: department?.sector || "",
      isActive: department?.isActive !== undefined ? department.isActive : true,
    },
  });

  // Handle form submission
  function onSubmit(data) {
    if (isEditing) {
      updateDepartment(data, {
        onSuccess: () => {
          toast.success("Department updated successfully");
          onSuccess && onSuccess();
        },
        onError: (error) => {
          toast.error(error?.response?.data?.message || "Failed to update department");
        },
      });
    } else {
      createDepartment(data, {
        onSuccess: () => {
          toast.success("Department created successfully");
          onSuccess && onSuccess();
        },
        onError: (error) => {
          toast.error(error?.response?.data?.message || "Failed to create department");
        },
      });
    }
  }

  // Update form values if department prop changes
  useEffect(() => {
    if (department) {
      form.reset({
        name: department.name || "",
        sector: department.sector || "",
        isActive: department.isActive !== undefined ? department.isActive : true,
      });
    }
  }, [department, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter department name" {...field} />
              </FormControl>
              <FormDescription>
                The name of the department within the organization
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sector"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sector</FormLabel>
              <FormControl>
                <Input placeholder="Enter sector" {...field} />
              </FormControl>
              <FormDescription>
                The sector this department belongs to
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Active Status</FormLabel>
                <FormDescription>
                  Is this department currently active?
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            disabled={isCreating || isUpdating}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isCreating || isUpdating}
          >
            {isCreating || isUpdating ? (
              <TailSpin color="#fff" height={20} width={20} />
            ) : isEditing ? (
              "Update Department"
            ) : (
              "Create Department"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
