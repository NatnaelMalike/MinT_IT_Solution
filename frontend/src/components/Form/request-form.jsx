"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Upload, X } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useCreateMutation } from "@/hooks/useCreateMutation";
import { issueSchema } from "@/schemas/issue-schema";
import { useFileUploadMutation } from "@/hooks/useFileUploadMutation";


export default function RequestForm() {
  const {
    mutate: createReport,
    isPending,
  } = useCreateMutation("/report");
  const {
    mutate: uploadFiles,
    isPending: isUploadPending,
    error: uploadError,
  } = useFileUploadMutation();
  const [files, setFiles] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef(null);

  const tagOptions = [
    "Network",
    "Hardware",
    "Software",
    "Security",
    "Database",
  ];

  const form = useForm({
    resolver: zodResolver(issueSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "Low",
      tags: [],
      isConfidential: false,
      attachments: [],
    },
  });

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const removeFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Simplified onSubmit function that just handles form submission
  function onSubmit(data) {
    try {
      if (files.length > 0) {
        uploadFiles(files, {
          onSuccess: (files) => {
            // Step 2: Update form data with file paths
            console.log(files);
            const attachments = files.filePaths.map((path, index) => ({
              filePath: path,
            }));
            const updatedData = {
              ...data,
              attachments: attachments,
            };

            // Step 3: Submit the complete form
            createReport(updatedData, {
              onSuccess: () => {
                setSubmitted(true);
                setFiles([]);

              },
              onError: (error) => {
                console.error("Form submission error:", error);
              },
            });
          },
          onError: (error) => {
            console.error("File upload failed:", error);
          },
        
        });
      } else {
        // If no files, submit directly
        createReport(data, {
          onSuccess: () => {
            setSubmitted(true);
          },
          onError: (error) => {
            console.error("Form submission error:", error);
          },
        });
      }
    } catch (error) {
      console.error("Submission process error:", error);
    }
  }

  if (submitted) {
    return (
      <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
        <h2 className="text-xl font-semibold mb-2">
          Request Submitted Successfully
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Your IT support request has been received.
        </p>
        <Button
          onClick={() => {
            setSubmitted(false);
            form.reset();
            setFiles([]);
          }}
          className="mt-2"
        >
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Issue Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter issue title" {...field} />
              </FormControl>
              <FormDescription>
                This is the Issue You Encountered
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
              <FormLabel>Problem Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Please state details about your issue"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your description about the problem you faced.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Priority</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                This is the priority that will be used in the dashboard.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Issue Tags</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <Select
                    onValueChange={(value) => {
                      if (!field.value.includes(value)) {
                        field.onChange([...field.value, value]);
                      }
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select IT issue tags..." />
                    </SelectTrigger>
                    <SelectContent>
                      {tagOptions.map((tag) => (
                        <SelectItem key={tag} value={tag}>
                          {tag}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex flex-wrap gap-2">
                    {field.value.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-sm py-1 px-2"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => {
                            field.onChange(
                              field.value.filter((_, i) => i !== index)
                            );
                          }}
                          className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* File Upload Section - Using regular HTML elements instead of Form components */}
        <FormField
          control={form.control}
          name="attachments"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Attachments</FormLabel>
              <FormDescription>
                Upload screenshots or relevant files (max 10MB per file)
              </FormDescription>
              <FormControl>
                <div className="flex flex-col gap-4">
                  <div
                    onClick={triggerFileInput}
                    className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
                  >
                    <Upload className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Drag and drop files here or click to browse
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Supports images, documents, and other files
                    </p>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      multiple
                      className="hidden"
                      accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt"
                    />
                  </div>

                  {files.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium">
                        Selected Files ({files.length})
                      </p>
                      <div className="max-h-40 overflow-y-auto space-y-2 border rounded-md p-2">
                        {files.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-2 rounded"
                          >
                            <div className="flex items-center space-x-2 truncate">
                              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                                {file.type.startsWith("image/") ? "🖼️" : "📄"}
                              </div>
                              <div className="truncate">
                                <p className="text-sm font-medium truncate">
                                  {file.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {(file.size / 1024).toFixed(1)} KB
                                </p>
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                              className="h-8 w-8 p-0"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isConfidential"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Mark as Confidential</FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        

        <Button disabled={isPending} type="submit" className="w-full">
          {isPending ? "Submitting..." : "Report"}
        </Button>
      </form>
    </Form>
  );
}
