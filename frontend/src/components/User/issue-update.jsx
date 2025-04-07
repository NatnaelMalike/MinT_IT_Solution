import {
    Calendar,
    Clock,
    Download,
    Edit2,
    FileText,
    Lock,
    Paperclip,
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
  import { Badge } from "@/components/ui/badge";
  import { Skeleton } from "@/components/ui/skeleton";
  import { format } from "date-fns";
  import { useApiQueryById } from "@/hooks/useApiQueryById";
  import { useParams } from "react-router-dom";
  import { useState } from "react";
  import { useUpdateMutation } from "@/hooks/useUpdateMutation";
  
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
  
  // Define the issue type
  
  export default function IssueDetailView() {
    const {mutate: updateReport, isPending: loading, isError: updateE} = useUpdateMutation()
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
              <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>Try Again</Button>
            </CardContent>
          </Card>
        </div>
      );
    }
  
    if (!issue) {
      return (
        <div className="container mx-auto py-6 max-w-4xl">
          <Card className="shadow-md">
            <CardContent className="p-8 text-center">
              <h2 className="text-xl font-semibold mb-2">Issue Not Found</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                The requested issue could not be found.
              </p>
              <Button onClick={() => window.history.back()}>Go Back</Button>
            </CardContent>
          </Card>
        </div>
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
                    ID-
                    {issue._id}
                  </Badge>
                  <Badge className={statusColors[issue.status]}>
                    {issue.status}
                  </Badge>
                  {issue.isConfidential && (
                    <Badge
                      variant="outline"
                      className="border-red-200 text-red-700 dark:border-red-800 dark:text-red-400 flex items-center gap-1"
                    >
                      <Lock className="h-3 w-3" />
                      Confidential
                    </Badge>
                  )}
                </div>
                {!editMode ? <CardTitle className="text-2xl font-bold">{issue.title}</CardTitle> : null}
                <CardDescription className="flex flex-wrap items-center gap-4 mt-2">
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    Reported by {issue.reportedBy}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(issue.createdAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Last updated: {formatDate(issue.updatedAt)}
                  </span>
                </CardDescription>
              </div>
              <div>
                {!editMode ? (
                  <Button onClick={() => setEditMode(true)} variant="outline" className="flex items-center gap-1">
                    <Edit2 className="h-4 w-4" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button onClick={() => setEditMode(false)} variant="outline">
                      Cancel
                    </Button>
                    <Button onClick={form.handleSubmit(onSubmit)} disabled={loading}>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-lg font-medium mb-2">Description</h3>
                  <div className="p-4 rounded-md whitespace-pre-wrap">
                    {issue.description}
                  </div>
                </div>
  
                {/* Attachments */}
                <div>
                  <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                    <Paperclip className="h-4 w-4" />
                    Attachments
                  </h3>
  
                  {issue.attachments.length > 0 ? (
                    <div className="space-y-2">
                      {issue.attachments.map((file, index) => {
                        // Extract filename and normalize path
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
                      <p className="text-card-foreground">
                        No attachments
                      </p>
                    </div>
                  )}
                </div>
              </div>
  
              <div className="space-y-6">
                {/* Status */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Status</h3>
                  <Badge
                    className={`${statusColors[issue.status]} text-sm px-3 py-1`}
                  >
                    {issue.status}
                  </Badge>
                </div>
  
                {/* Priority */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Priority</h3>
                  <Badge
                    className={`${
                      priorityColors[issue.priority]
                    } text-sm px-3 py-1`}
                  >
                    {issue.priority}
                  </Badge>
                </div>
  
                {/* Tags */}
                <div>
                  <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
                    <Tag className="h-3 w-3" />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {issue.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
  
             
              </div>
            </div>
          </CardContent>
  
        </Card>
      </div>
    );
  }
  
  // Loading skeleton component
 
  