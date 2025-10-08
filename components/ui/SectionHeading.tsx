import { ReactNode } from "react";
import AnimatedSection from "./AnimatedSection";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  children?: ReactNode;
}

export default function SectionHeading({ 
  title, 
  subtitle, 
  className = "",
  children 
}: SectionHeadingProps) {
  return (
    <AnimatedSection className={`text-center mb-12 ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      {children}
    </AnimatedSection>
  );
}