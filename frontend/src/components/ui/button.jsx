import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-teal-950 dark:focus-visible:ring-teal-300",
  {
    variants: {
      variant: {
        default: "bg-teal-800 text-teal-50 hover:bg-teal-900/90 dark:bg-teal-50 dark:text-teal-900 dark:hover:bg-teal-50/90",
        destructive:
          "bg-red-500 text-teal-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-teal-50 dark:hover:bg-red-900/90",
        outline:
          "border border-teal-200 bg-white hover:bg-teal-100 hover:text-teal-900 dark:border-teal-800 dark:bg-teal-950 dark:hover:bg-teal-800 dark:hover:text-teal-50",
        secondary:
          "bg-teal-100 text-teal-900 hover:bg-teal-100/80 dark:bg-teal-800 dark:text-teal-50 dark:hover:bg-teal-800/80",
        ghost: "hover:bg-teal-100 hover:text-teal-900 dark:hover:bg-teal-800 dark:hover:text-teal-50",
        link: "text-teal-900 underline-offset-4 hover:underline dark:text-teal-50",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />)
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
