"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 uppercase tracking-wider",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25",
        destructive:
          "bg-error text-white hover:bg-error/90",
        outline:
          "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground",
        secondary:
          "bg-muted text-foreground hover:bg-muted/80",
        ghost:
          "text-foreground hover:bg-muted hover:text-foreground",
        link:
          "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-10 w-10",
      },
      skewed: {
        true: "skew-button",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      skewed: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, skewed, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, skewed, className }))}
        ref={ref}
        {...props}
      >
        {skewed ? <span>{children}</span> : children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
