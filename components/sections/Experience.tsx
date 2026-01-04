// Experience.tsx
"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  GitCommit,
  GitBranch,
  Terminal,
  Clock,
  Calendar,
  ChevronRight,
  Hash
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { experiences } from "@/lib/data/experience";

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Background Matrix/Grid Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={containerRef}>
        <SectionHeading
          title="Execution History"
          subtitle="System process logs and runtime environments"
        />

        <div className="mt-16 sm:mt-24 relative">
          {/* Main Thread Line */}
          <div className="absolute left-4 sm:left-12 top-0 bottom-0 w-px bg-border/50">
            <motion.div
              className="absolute top-0 left-0 right-0 w-full bg-primary/50 origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-16">
            {experiences.map((experience, index) => {
              const isLast = index === experiences.length - 1;
              return (
                <motion.div
                  key={experience.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative pl-12 sm:pl-24 group"
                >
                  {/* Connector Node */}
                  <div className="absolute left-[11px] sm:left-[43px] top-0 w-1.5 h-1.5 rounded-full bg-border group-hover:bg-primary transition-colors duration-300 ring-4 ring-background" />

                  {/* Branch Logic Visual */}
                  <div className="absolute left-[14px] sm:left-[46px] top-[3px] w-6 sm:w-12 h-6 border-l border-b border-border/50 rounded-bl-xl group-hover:border-primary/50 transition-colors duration-300" />

                  {/* Log Card */}
                  <div className="relative bg-card border border-border/60 rounded-lg overflow-hidden hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">

                    {/* Log Header */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 bg-secondary/30 border-b border-border/40 text-xs font-mono">
                      <div className="flex items-center gap-1.5 text-primary">
                        <Terminal size={14} />
                        <span className="font-bold">PID:{8192 + (index * 128)}</span>
                      </div>
                      <div className="hidden sm:block w-px h-3 bg-border" />
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Clock size={14} />
                        <span>{experience.period}</span>
                      </div>
                      <div className="hidden sm:block w-px h-3 bg-border" />
                      <div className="flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-500'}`} />
                        <span className={`font-bold ${index === 0 ? 'text-emerald-500' : 'text-zinc-500'}`}>
                          {index === 0 ? 'RUNNING' : 'COMPLETED'}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 sm:p-6">
                      {/* Title & Organization */}
                      <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-4">
                        <h3 className="text-lg sm:text-xl font-bold font-heading text-foreground">
                          {experience.title}
                        </h3>
                        <span className="text-primary font-mono text-sm before:content-['@'] before:mr-1 before:text-muted-foreground">
                          {experience.company}
                        </span>
                      </div>

                      {/* Description Log */}
                      <div className="space-y-2 mb-6 font-mono text-sm text-muted-foreground">
                        {experience.description.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="text-zinc-700 mt-1">
                              <ChevronRight size={14} />
                            </span>
                            <span className="leading-relaxed">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-border/40">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mr-2">
                          Dependencies:
                        </span>
                        {experience.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="bg-secondary/50 text-secondary-foreground text-[10px] px-2 py-1 rounded border border-border/50 font-mono hover:border-primary/30 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* End of Log Indicator */}
          <div className="relative pl-12 sm:pl-24 mt-12 pb-12">
            <div className="absolute left-[11px] sm:left-[43px] top-0 bottom-0 w-px bg-border/50 opacity-50" />
            <div className="flex items-center gap-3 text-muted-foreground opacity-50">
              <GitCommit size={16} />
              <span className="text-xs font-mono">End of execution log</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}