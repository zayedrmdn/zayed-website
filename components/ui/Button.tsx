// components/ui/Button.tsx
import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  isLoading?: boolean;
}

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  isLoading = false,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    primary: "bg-primary text-primary-foreground shadow-sm hover:opacity-90 transition-opacity duration-200",
    secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 transition-colors duration-200",
    outline: "border border-border bg-background shadow-sm hover:bg-primary/10 hover:text-primary transition-colors duration-200",
    ghost: "hover:bg-primary/10 hover:text-primary transition-colors duration-200",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : null}
      {children}
    </button>
  );
}