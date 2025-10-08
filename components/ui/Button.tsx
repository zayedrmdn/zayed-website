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
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-accent to-blue-600 text-white hover:from-blue-600 hover:to-accent shadow-lg hover:shadow-xl hover:shadow-accent/30 transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-105",
    secondary: "bg-gradient-to-r from-secondary to-muted text-secondary-foreground hover:from-muted hover:to-secondary shadow-md hover:shadow-lg hover:shadow-muted/20 transition-all duration-300 transform hover:-translate-y-0.5",
    outline: "border-2 border-primary/60 text-foreground bg-gradient-to-r from-transparent to-accent/5 hover:from-accent/10 hover:to-accent/20 hover:border-accent hover:shadow-md hover:shadow-accent/25 hover:text-accent transition-all duration-300 transform hover:-translate-y-0.5",
    ghost: "text-muted-foreground hover:bg-gradient-to-r hover:from-accent/20 hover:to-accent/30 hover:text-accent-foreground transition-all duration-300 transform hover:-translate-y-0.5",
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