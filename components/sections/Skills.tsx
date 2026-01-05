// Skills.tsx
"use client";
import { Code, Database, Cpu, Globe, Wrench, Users } from "lucide-react";

import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";

import { skills } from "@/lib/data/skills";

const categoryIcons = {
  "Programming Languages": Code,
  "AI & Machine Learning": Cpu,
  "Frameworks & Tools": Wrench,
  "Development Practices": Database,
  "Languages": Globe,
  "Certifications & Achievements": Users,
};

const categoryPaths = {
  "Programming Languages": "~/src/languages",
  "AI & Machine Learning": "/usr/lib/neural-nets",
  "Frameworks & Tools": "~/bin/tools",
  "Development Practices": "/etc/protocols",
  "Languages": "/usr/share/locale",
  "Certifications & Achievements": "/var/log/achievements",
};

export default function Skills() {
  return (
    <section id="skills" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background Decor - Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="Technical Arsenal"
          subtitle="cat /proc/cpuinfo | grep 'flags'"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skillCategory, index) => {
            const Icon = categoryIcons[skillCategory.category as keyof typeof categoryIcons] || Code;
            const path = categoryPaths[skillCategory.category as keyof typeof categoryPaths] || "~/unknown";

            return (
              <AnimatedSection key={skillCategory.category} delay={index * 0.05}>
                <div className="relative group h-full border border-border/60 bg-card/60 backdrop-blur-sm rounded-xl overflow-hidden hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500 flex flex-col">

                  {/* Decorative Corners */}
                  <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary/20 rounded-tr-lg group-hover:border-primary/60 transition-colors" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary/20 rounded-bl-lg group-hover:border-primary/60 transition-colors" />

                  {/* Header Bar */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-border/40 bg-secondary/30">
                    <div className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                      <span className="font-mono text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                        MOD_0{index + 1}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-muted-foreground/80 group-hover:text-primary/70 transition-colors truncate max-w-[120px]">
                      {path}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-base font-bold text-foreground mb-5 flex items-center gap-2.5">
                      <div className="p-1.5 rounded-md bg-primary/10 text-primary border border-primary/20">
                        <Icon size={16} />
                      </div>
                      {skillCategory.category}
                    </h3>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {skillCategory.items.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 text-[11px] font-mono font-medium text-foreground/80 bg-secondary/40 rounded-md border border-border/60 hover:border-primary/30 hover:bg-primary/5 hover:text-primary transition-all duration-300 cursor-default select-none group/badge"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}