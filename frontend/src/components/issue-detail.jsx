import { useState, useRef } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Calendar,
  Clock,
  Download,
  Edit2,
  FileText,
  Lock,
  MessageSquare,
  Paperclip,
  Save,
  Send,
  Tag,
  Upload,
  User,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { format } from "date-fns"

// Define the schema for issue data
const issueSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  priority: z.string(),
  status: z.string(),
  tags: z.array(z.string()),
  isConfidential: z.boolean().default(false),
  attachments: z.any().optional(),
  comment: z.string().optional(),
})

// Status badge colors
const statusColors = {
  Open: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  "In Progress": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  Resolved: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  Closed: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300",
}

// Priority badge colors
const priorityColors = {
  Low: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  Medium: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  High: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  Critical: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
}

export default function IssueDetail({ issueId = "ISS-1234" }) {
  // Mock issue data - in a real app, you would fetch this from an API
  const [issue, setIssue] = useState({
    id: issueId,
    title: "Network connectivity issues in the marketing department",
    description:
      "Several employees in the marketing department are experiencing intermittent network connectivity issues. The problem seems to occur mostly in the afternoons and affects their ability to access cloud-based applications.",
    priority: "High",
    status: "In Progress",
    tags: ["Network", "Hardware"],
    isConfidential: false,
    createdBy: "Jane Smith",
    createdAt: "2023-11-15T10:30:00Z",
    updatedAt: "2023-11-16T14:45:00Z",
    assignedTo: "John Technician",
    attachments: [
      { name: "network_diagram.pdf", size: 1240000, type: "application/pdf" },
      { name: "error_screenshot.png", size: 540000, type: "image/png" },
    ],
    comments: [
      {
        id: 1,
        user: "Jane Smith",
        avatar: "/placeholder.svg?height=40&width=40",
        text: "I've noticed this issue happening consistently around 2-3pm.",
        timestamp: "2023-11-15T11:45:00Z",
      },
      {
        id: 2,
        user: "John Technician",
        avatar: "/placeholder.svg?height=40&width=40",
        text: "I'll check the network switches and router in that area. Could be related to bandwidth usage during peak hours.",
        timestamp: "2023-11-15T13:20:00Z",
      },
    ],
  })

  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState(issue.attachments || [])
  const [uploadProgress, setUploadProgress] = useState(0)
  const [commentText, setCommentText] = useState("")
  const fileInputRef = useRef(null)

  const tagOptions = ["Network", "Hardware", "Software", "Security", "Database"]
  const statusOptions = ["Open", "In Progress", "Resolved", "Closed"]
  const priorityOptions = ["Low", "Medium", "High", "Critical"]

  const form = useForm({
    resolver: zodResolver(issueSchema),
    defaultValues: {
      title: issue.title,
      description: issue.description,
      priority: issue.priority,
      status: issue.status,
      tags: issue.tags,
      isConfidential: issue.isConfidential,
      attachments: issue.attachments,
    },
  })

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files)
    setFiles((prev) => [...prev, ...selectedFiles])
    form.setValue("attachments", [...files, ...selectedFiles])
  }

  const removeFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index)
    setFiles(updatedFiles)
    form.setValue("attachments", updatedFiles)
  }

  const triggerFileInput = () => {
    fileInputRef.current.click()
  }

  const addComment = () => {
    if (!commentText.trim()) return

    const newComment = {
      id: issue.comments.length + 1,
      user: "Current User", // In a real app, get this from auth context
      avatar: "/placeholder.svg?height=40&width=40",
      text: commentText,
      timestamp: new Date().toISOString(),
    }

    setIssue((prev) => ({
      ...prev,
      comments: [...prev.comments, newComment],
      updatedAt: new Date().toISOString(),
    }))

    setCommentText("")
  }

  const onSubmit = (data) => {
    setLoading(true)

    // Simulate form submission with progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setUploadProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)

        // Update the issue with the form data
        setIssue((prev) => ({
          ...prev,
          title: data.title,
          description: data.description,
          priority: data.priority,
          status: data.status,
          tags: data.tags,
          isConfidential: data.isConfidential,
          attachments: files,
          updatedAt: new Date().toISOString(),
        }))

        setLoading(false)
        setUploadProgress(0)
        setEditMode(false)

        console.log("Issue updated with data:", data)
        console.log("Files:", files)
      }
    }, 200)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return format(date, "MMM d, yyyy 'at' h:mm a")
  }

  return (
    <div className="container mx-auto py-6 max-w-6xl">
      <Card className="shadow-md">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="font-mono">
                  {issue.id}
                </Badge>
                <Badge className={statusColors[issue.status]}>{issue.status}</Badge>
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
              <CardDescription className="flex items-center gap-4 mt-2">
                <span className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  Reported by {issue.createdBy}
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
          {editMode ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Issue Title</FormLabel>
                      <FormControl>
                        <Input {...field} className="text-xl font-semibold" placeholder="Issue title" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-6">
                    {/* Description */}
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea {...field} className="min-h-[150px]" placeholder="Describe the issue in detail" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Attachments */}
                    <div>
                      <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                        <Paperclip className="h-4 w-4" />
                        Attachments
                        <Button onClick={triggerFileInput} variant="outline" size="sm" className="ml-2" type="button">
                          <Upload className="h-4 w-4 mr-1" />
                          Add Files
                        </Button>
                      </h3>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        multiple
                        className="hidden"
                        accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt"
                      />

                      {files.length > 0 ? (
                        <div className="space-y-2">
                          {files.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-3 rounded-md"
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                                  <FileText className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                </div>
                                <div>
                                  <p className="font-medium">{file.name}</p>
                                  <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm" type="button">
                                  <Download className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => removeFile(index)} type="button">
                                  <X className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center p-6 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-md">
                          <p className="text-gray-500 dark:text-gray-400">No attachments</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Status */}
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {statusOptions.map((status) => (
                                <SelectItem key={status} value={status}>
                                  {status}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Priority */}
                    <FormField
                      control={form.control}
                      name="priority"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Priority</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
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

                    {/* Tags */}
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
                                    field.onChange([...field.value, value])
                                  }
                                }}
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
                                  <Badge key={index} variant="secondary" className="text-xs py-1 px-2">
                                    {tag}
                                    <button
                                      type="button"
                                      onClick={() => {
                                        field.onChange(field.value.filter((_, i) => i !== index))
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

                    {/* Assigned To */}
                    <div>
                      <h3 className="text-sm font-medium mb-2">Assigned To</h3>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="/placeholder.svg?height=30&width=30" alt={issue.assignedTo} />
                          <AvatarFallback>{issue.assignedTo.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{issue.assignedTo}</span>
                      </div>
                    </div>

                    {/* Confidential */}
                    <FormField
                      control={form.control}
                      name="isConfidential"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 border p-3 rounded-md">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Mark as Confidential</FormLabel>
                            <FormDescription className="text-xs">
                              Only authorized personnel will be able to view this issue
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Progress indicator */}
                {uploadProgress > 0 && loading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Saving changes...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}
              </form>
            </Form>
          ) : (
            // View mode content
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-lg font-medium mb-2">Description</h3>
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-md whitespace-pre-wrap">
                    {issue.description}
                  </div>
                </div>

                {/* Attachments */}
                <div>
                  <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                    <Paperclip className="h-4 w-4" />
                    Attachments
                  </h3>

                  {files.length > 0 ? (
                    <div className="space-y-2">
                      {files.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-3 rounded-md"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                              <FileText className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            </div>
                            <div>
                              <p className="font-medium">{file.name}</p>
                              <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center p-6 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-md">
                      <p className="text-gray-500 dark:text-gray-400">No attachments</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                {/* Status */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Status</h3>
                  <Badge className={`${statusColors[issue.status]} text-sm px-3 py-1`}>{issue.status}</Badge>
                </div>

                {/* Priority */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Priority</h3>
                  <Badge className={`${priorityColors[issue.priority]} text-sm px-3 py-1`}>{issue.priority}</Badge>
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

                {/* Assigned To */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Assigned To</h3>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder.svg?height=30&width=30" alt={issue.assignedTo} />
                      <AvatarFallback>{issue.assignedTo.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{issue.assignedTo}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Comments Section - Outside of Form context */}
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Comments & Activity
            </h3>

            <div className="space-y-4">
              {issue.comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar>
                    <AvatarImage src={comment.avatar} alt={comment.user} />
                    <AvatarFallback>{comment.user.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-md">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{comment.user}</span>
                        <span className="text-xs text-gray-500">{formatDate(comment.timestamp)}</span>
                      </div>
                      <p className="text-sm">{comment.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Comment - Using regular HTML elements */}
            <div className="mt-4 flex gap-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="You" />
                <AvatarFallback>Y</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <Textarea
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Add a comment..."
                      className="min-h-[80px]"
                    />
                  </div>
                  <Button type="button" onClick={addComment} disabled={!commentText.trim()} className="mb-1">
                    <Send className="h-4 w-4 mr-1" />
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between border-t pt-6">
          <Button variant="outline">Back to Issues</Button>
          <div className="flex gap-2">
            {issue.status !== "Closed" && (
              <Button
                variant="outline"
                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                onClick={() => {
                  if (editMode) {
                    form.setValue("status", "Closed")
                  } else {
                    setIssue((prev) => ({
                      ...prev,
                      status: "Closed",
                      updatedAt: new Date().toISOString(),
                    }))
                  }
                }}
              >
                Close Issue
              </Button>
            )}
            {issue.status !== "Resolved" && issue.status !== "Closed" && (
              <Button
                variant="default"
                onClick={() => {
                  if (editMode) {
                    form.setValue("status", "Resolved")
                  } else {
                    setIssue((prev) => ({
                      ...prev,
                      status: "Resolved",
                      updatedAt: new Date().toISOString(),
                    }))
                  }
                }}
              >
                Mark as Resolved
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

