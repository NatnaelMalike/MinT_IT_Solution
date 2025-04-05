import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

import axios from "axios";
import { Textarea } from "@/components/ui/textarea";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useRequestContext } from "@/hooks/useRequestContext";
import { useState } from "react";
import { issueSchema } from "@/schemas/issue-schema.js";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";

export default function RequestForm() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useAuthContext();
  const { dispatch } = useRequestContext();

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
    },
  });

  function onSubmit(data) {
    setLoading(true);
    axios
      .post("http://localhost:4000/api/request", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setLoading(false);
        // window.location.reload();
        dispatch({ type: "ADD_REQUEST", payload: res.data });
        navigate("/user/requests");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
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
                <Input placeholder="title" {...field} />
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
              <FormLabel>Prioirity</FormLabel>
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
        <Button disabled={loading} type="submit" className="w-full">
          {loading ? (
            <TailSpin color="#fff" height={30} width={30} />
          ) : (
            "Report"
          )}
        </Button>
      </form>
    </Form>
  );
}
