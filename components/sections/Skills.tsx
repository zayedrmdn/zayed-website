// Skills.tsx
"use client";
import { Code, Database, Cpu, Globe, Wrench, Users } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Card from "@/components/ui/Card";
import { skills } from "@/lib/data/skills";

const categoryIcons = {
  "Programming Languages": Code,
  "AI & Machine Learning": Cpu,
  "Frameworks & Tools": Wrench,
  "Development Practices": Database,
  "Languages": Globe,
  "Certifications & Achievements": Users,
};

export default function Skills() {
  return (
    <section id="skills" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="Technical Arsenal"
          subtitle="Core competencies and technologies I work with"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {skills.map((skillCategory, categoryIndex) => (
            <AnimatedSection key={skillCategory.category} delay={categoryIndex * 0.05}>
              <Card className="h-full p-6 hover:border-primary/50 transition-colors duration-300 flex flex-col border border-border shadow-sm">
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-border">
                  <span className="p-2.5 rounded-lg bg-secondary text-primary ring-1 ring-inset ring-border">
                    {(() => {
                      const Icon = categoryIcons[skillCategory.category as keyof typeof categoryIcons] || Code;
                      return <Icon size={20} />;
                    })()}
                  </span>
                  <h3 className="font-bold text-foreground text-sm lg:text-base">
                    {skillCategory.category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto content-start">
                  {skillCategory.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1.5 text-xs font-bold bg-secondary text-foreground rounded-md border border-border hover:border-primary hover:text-primary transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}