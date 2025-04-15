import { z } from "zod";
// Regex for phone number (validates international formats)
const phoneRegex = /^\+?[1-9]\d{1,14}$/;
// Regex for strong password: Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Schema
export const userSchema = z
  .object({
    name: z
      .string()
      .min(1, "Your Name is required")
      .max(100, "Your Name must be at most 100 characters")
      .regex(/^[A-Za-z\s]+$/, "Your Name must only contain letters"),
    department: z
      .string()
      .min(1, "Department is required")
      .max(100, "Department must be at most 100 characters"),
    profession: z
      .string()
      .min(1, "profession is required")
      .max(100, "profession must be at most 100 characters"),
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        passwordRegex,
        "Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character"
      ),
    confirmPassword: z
      .string()
      .nonempty({ message: "Confirm password is required" })
      .refine((val) => val !== "", { message: "Confirm password is required" }),
    phone: z
      .string()
      .min(1, "Phone Number is required")
      .regex(phoneRegex, "Invalid phone number format"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
