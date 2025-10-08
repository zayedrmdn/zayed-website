import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border shadow-sm bg-gradient-to-br from-card via-card to-card/95 backdrop-blur-sm transition-all duration-300",
        hover && "hover:shadow-xl hover:-translate-y-2 hover:border-accent/60 hover:shadow-accent/20 hover:from-card hover:to-accent/5 hover:scale-[1.02]",
        className
      )}
    >
      {children}
    </div>
  );
}