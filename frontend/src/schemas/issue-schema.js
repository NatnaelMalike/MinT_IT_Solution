import { z } from "zod";
export const issueSchema = z.object({
  title: z.string().min(1, "Title is required").trim(),
  description: z.string().min(1, "Description is required").trim(),
  status: z.enum(["Pending", "In Progress", "Resolved", "Unresolved", "Closed"]).default("Pending"),
  priority: z.enum(["Low", "Medium", "High", "Critical"]).default("Low"),
  attachments: z
    .array(
      z.object({
        filePath: z.string().url("Invalid file URL").optional(),
      })
    )
    .optional(),
  tags: z.array(z.string()).optional(),
  isConfidential: z.boolean().default(false),

});