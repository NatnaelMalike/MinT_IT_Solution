import { z } from "zod";

export const inviteSchema = z.object({
     name: z
        .string()
        .min(1, "Your Name is required")
        .max(100, "Your Name must be at most 100 characters")
        .regex(/^[A-Za-z\s]+$/, "Your Name must only contain letters"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  role: z.enum(["HelperAdmin", "TechnicianUser"]),
})