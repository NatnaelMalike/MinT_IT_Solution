import {
  Calendar,
  Clock,
  Download,
  Edit2,
  FileText,
  Lock,
  Paperclip,
  Save,
  Tag,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input"; // Added missing import
import { Textarea } from "@/components/ui/textarea"; // Added missing import
import { format } from "date-fns";
import { useApiQueryById } from "@/hooks/useApiQueryById";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react"; // Added useEffect
import { useUpdateMutation } from "@/hooks/useUpdateMutation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateIssueSchema } from "@/schemas/issue-schema";
import { Checkbox } from "@/components/ui/checkbox";

// Status badge colors
const statusColors = {
  Open: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  "In Progress":
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  Resolved:
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  Closed: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300",
};

// Priority badge colors
const priorityColors = {
  Low: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  Medium: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  High: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  Critical: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
};

export default function IssueDetailView() {
  const [editMode, setEditMode] = useState(false);
  const { id } = useParams();
  const {
    data: issue,
    isLoading,
    isError,
    error,
  } = useApiQueryById(
    ["report", id],
    "/report",
    {
      staleTime: 1000 * 60 * 5,
    },
    id
  );

  const {
    mutate: updateReport,
    isPending: loading,
    isError: updateE,
  } = useUpdateMutation("/report", {}, id);

  const form = useForm({
    resolver: zodResolver(updateIssueSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "",
      tags: [],
      isConfidential: false,
    },
  });

  // Update form default values when issue data loads
  useEffect(() => {
    if (issue) {
      form.reset({
        title: issue.title || "",
        description: issue.description || "",
        priority: issue.priority || "",
        tags: issue.tags || [],
        isConfidential: issue.isConfidential || false,
      });
    }
  }, [issue, form]);

  const tagOptions = [
    "Network",
    "Hardware",
    "Software",
    "Security",
    "Database",
  ];
  const statusOptions = ["Open", "In Progress", "Resolved", "Closed"];
  const priorityOptions = ["Low", "Medium", "High", "Critical"];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "MMM d, yyyy 'at' h:mm a");
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (isError) {
    return (
      <div className="container mx-auto py-6 max-w-6xl">
        <Card className="shadow-md">
          <CardContent className="p-8 text-center">
            <div className="text-red-500 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Error Loading Issue</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {error.message}
            </p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  function onSubmit(data) {
    updateReport(
      data,
      {
        onSuccess: () => {
          setEditMode(false);
        },
        onError: (error) => {
          console.error("Update failed:", error);
        },
      },
      id
    );
  }

  return (
    <div className="container mx-auto py-6 max-w-6xl">
      <Card className="shadow-md">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="font-mono">
                  ID-{issue?._id}
                </Badge>
                <Badge className={statusColors[issue?.status]}>
                  {issue?.status}
                </Badge>
                {issue?.isConfidential && (
                  <Badge
                    variant="outline"
                    className="border-red-200 text-red-700 dark:border-red-800 dark:text-red-400 flex items-center gap-1"
                  >
                    <Lock className="h-3 w-3" />
                    Confidential
                  </Badge>
                )}
              </div>
              {!editMode ? (
                <CardTitle className="text-2xl font-bold">
                  {issue?.title}
                </CardTitle>
              ) : null}
              <CardDescription className="flex flex-wrap items-center gap-4 mt-2">
                <span className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  Reported by {issue?.reportedBy.name}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(issue?.createdAt)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Last updated: {formatDate(issue?.updatedAt)}
                </span>
              </CardDescription>
            </div>
            <div>
              {!editMode ? (
                <Button
                  onClick={() => setEditMode(true)}
                  variant="outline"
                  className="flex items-center gap-1"
                >
                  <Edit2 className="h-4 w-4" />
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button onClick={() => setEditMode(false)} variant="outline">
                    Cancel
                  </Button>
                  <Button
                    onClick={form.handleSubmit(onSubmit)}
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center gap-1">Saving...</span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <Save className="h-4 w-4" />
                        Save
                      </span>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {editMode ? ( // Removed status check since it was inconsistent
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Issue Title</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="text-xl font-semibold"
                          placeholder="Issue title"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-6">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              className="min-h-[150px]"
                              placeholder="Describe the issue in detail"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div>
                      <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                        <Paperclip className="h-4 w-4" />
                        Attachments
                      </h3>
                      {issue?.attachments?.length > 0 ? (
                        <div className="space-y-2">
                          {issue.attachments.map((file, index) => {
                            const fileName = file.filePath.split("\\").pop();
                            const fileUrl = `${
                              import.meta.env.VITE_API_URL
                            }/${file.filePath.replace(/\\/g, "/")}`;

                            return (
                              <div
                                key={index}
                                className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-3 rounded-md"
                              >
                                <div className="flex items-center space-x-3">
                                  <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                                    <FileText className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                  </div>
                                  <div>
                                    <p className="font-medium">{fileName}</p>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <a href={fileUrl} download target="_blank">
                                    <Button variant="ghost" size="sm">
                                      <Download className="h-4 w-4" />
                                    </Button>
                                  </a>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="text-center p-6 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-md">
                          <p className="text-card-foreground">No attachments</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Status</h3>
                      <Badge
                        className={`${
                          statusColors[issue.status]
                        } text-sm px-3 py-1`}
                      >
                        {issue.status}
                      </Badge>
                    </div>

                    <FormField
                      control={form.control}
                      name="priority"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Priority</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select priority" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {priorityOptions.map((priority) => (
                                <SelectItem key={priority} value={priority}>
                                  {priority}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="tags"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tags</FormLabel>
                          <FormControl>
                            <div className="space-y-4">
                              <Select
                                onValueChange={(value) => {
                                  if (!field.value.includes(value)) {
                                    field.onChange([...field.value, value]);
                                  }
                                }}
                                value=""
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Add tags..." />
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
                                    className="text-xs py-1 px-2"
                                  >
                                    {tag}
                                    <button
                                      type="button"
                                      onClick={() => {
                                        field.onChange(
                                          field.value.filter(
                                            (_, i) => i !== index
                                          )
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

                    <FormField
                      control={form.control}
                      name="isConfidential"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 border p-3 rounded-md">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Mark as Confidential</FormLabel>
                            <FormDescription className="text-xs">
                              Only authorized personnel will be able to view
                              this issue
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </form>
            </Form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Description</h3>
                  <div className="p-4 rounded-md whitespace-pre-wrap">
                    {issue?.description}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                    <Paperclip className="h-4 w-4" />
                    Attachments
                  </h3>
                  {issue?.attachments?.length > 0 ? (
                    <div className="space-y-2">
                      {issue.attachments.map((file, index) => {
                        const fileName = file.filePath.split("\\").pop();
                        const fileUrl = `${
                          import.meta.env.VITE_API_URL
                        }/${file.filePath.replace(/\\/g, "/")}`;

                        return (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-3 rounded-md"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                                <FileText className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                              </div>
                              <div>
                                <p className="font-medium">{fileName}</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <a href={fileUrl} download target="_blank">
                                <Button variant="ghost" size="sm">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center p-6 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-md">
                      <p className="text-card-foreground">No attachments</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">Status</h3>
                  <Badge
                    className={`${
                      statusColors[issue?.status]
                    } text-sm px-3 py-1`}
                  >
                    {issue?.status}
                  </Badge>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Priority</h3>
                  <Badge
                    className={`${
                      priorityColors[issue?.priority]
                    } text-sm px-3 py-1`}
                  >
                    {issue?.priority}
                  </Badge>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
                    <Tag className="h-3 w-3" />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {issue?.tags?.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between border-t pt-6">
          <Button variant="outline" onClick={() => window.history.back()}>
            Back to Issues
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

// LoadingSkeleton component remains unchanged
function LoadingSkeleton() {
  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <Card className="shadow-md">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <div className="w-full">
              <div className="flex items-center gap-2 mb-3">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-32" />
              </div>
              <Skeleton className="h-8 w-3/4 mb-3" />
              <div className="flex flex-wrap gap-4">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-40" />
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Description</h3>
                <Skeleton className="h-32 w-full" />
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Attachments</h3>
                <div className="space-y-2">
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Status</h3>
                <Skeleton className="h-6 w-24" />
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Priority</h3>
                <Skeleton className="h-6 w-24" />
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-16" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between border-t pt-6">
          <Skeleton className="h-10 w-32" />
        </CardFooter>
      </Card>
    </div>
  );
}
