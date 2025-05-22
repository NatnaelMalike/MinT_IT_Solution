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
import { Textarea } from "@/components/ui/textarea";
import { useCreateMutation } from "@/hooks/useCreateMutation";
import { useUpdateMutation } from "@/hooks/useUpdateMutation";
import { TailSpin } from "react-loader-spinner";
import { toast } from "sonner";

// Define the schema for profession validation
const professionSchema = z.object({
  name: z.string().min(2, { message: "Profession name must be at least 2 characters" }),
  description: z.string().min(5, { message: "Description must be at least 5 characters" }),
});

export default function ProfessionForm({ profession = null, onSuccess, onCancel }) {
  // Determine if we're editing or creating
  const isEditing = !!profession;
  
  // Setup the appropriate mutation hook
  const { mutate: createProfession, isLoading: isCreating } = useCreateMutation("profession");
  const { mutate: updateProfession, isLoading: isUpdating } = useUpdateMutation(
    `profession/${profession?._id}`, 
    {}, 
    profession?._id
  );
  
  // Initialize the form with react-hook-form
  const form = useForm({
    resolver: zodResolver(professionSchema),
    defaultValues: {
      name: profession?.name || "",
      description: profession?.description || "",
    },
  });

  // Handle form submission
  function onSubmit(data) {
    if (isEditing) {
      updateProfession(data, {
        onSuccess: () => {
          toast.success("Profession updated successfully");
          onSuccess && onSuccess();
        },
        onError: (error) => {
          toast.error(error?.response?.data?.message || "Failed to update profession");
        },
      });
    } else {
      createProfession(data, {
        onSuccess: () => {
          toast.success("Profession created successfully");
          onSuccess && onSuccess();
        },
        onError: (error) => {
          toast.error(error?.response?.data?.message || "Failed to create profession");
        },
      });
    }
  }

  // Update form values if profession prop changes
  useEffect(() => {
    if (profession) {
      form.reset({
        name: profession.name || "",
        description: profession.description || "",
      });
    }
  }, [profession, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profession Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter profession name" {...field} />
              </FormControl>
              <FormDescription>
                The name of the profession or technical specialty
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter a description of this profession" 
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                A brief description of the profession and its responsibilities
              </FormDescription>
              <FormMessage />
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
              "Update Profession"
            ) : (
              "Create Profession"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
